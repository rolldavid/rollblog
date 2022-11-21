import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { email } = req.body;
    
        try {
          const user = await prisma.user.findUnique({
            where: {
                email: email
            },
            include: {
                bookmarks: {
                    orderBy: {
                        assignedAt: "desc"
                    }
                }
            }
          })

        const postIds = user?.bookmarks.map((bookmark) => bookmark.postId)

        const bookmarksBuild = await prisma.post.findMany({
            where: {
              AND: [
                {
                  id: {
                    in: postIds,
                  },
                },
                {
                  categories: {
                    some: {
                      name: "build",
                    },
                  },
                },
              ],
            },
          });
    
          const mappedBuild = bookmarksBuild.map((bookmark) => {
            return {
              post: {
                title: bookmark.title,
                excerpt: bookmark.excerpt,
                postId: bookmark.slug
              },
              category: "build",
              id: bookmark.id
            };
          });
    
          const bookmarksStack = await prisma.post.findMany({
            where: {
              AND: [
                {
                  id: {
                    in: postIds,
                  },
                },
                {
                  categories: {
                    some: {
                      name: "stack",
                    },
                  },
                },
              ],
            },
          });
    
          const mappedStack = bookmarksStack.map((bookmark) => {
            return {
                post: {
                    title: bookmark.title,
                    excerpt: bookmark.excerpt,
                    postId: bookmark.slug
                  },
                category: "stack",
                id: bookmark.id
            };
          });
    
          const bookmarksPath = await prisma.post.findMany({
            where: {
              AND: [
                {
                  id: {
                    in: postIds,
                  },
                },
                {
                  categories: {
                    some: {
                      name: "path",
                    },
                  },
                },
              ],
            },
          });
    
          const mappedPath = bookmarksPath.map((bookmark) => {
            return {
                post: {
                    title: bookmark.title,
                    excerpt: bookmark.excerpt,
                    postId: bookmark.slug
                  },
                category: "path",
                id: bookmark.id
            };
          });
    
          const mappedBookmarks = [...mappedBuild, ...mappedStack, ...mappedPath];
    
          const orderedBookmarks = [];
          if (postIds) {
          for (let i = 0; i < postIds.length; i++) {
            for (let j = 0; j < mappedBookmarks.length; j++) {
              if (postIds[i] === mappedBookmarks[j].id) {
                orderedBookmarks.push(mappedBookmarks[j]);
              }
            }
          }
        }
        res.status(201).json({ bookmarks: orderedBookmarks });
        
        } catch (err) {
          throw new Error("Did not manage to connect")
        }
      }
}