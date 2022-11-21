import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { BookmarkProps } from "@/lib/types";

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


        const getBookmarks = await prisma.post.findMany({
          where: {
            id: {
              in: postIds,
            },
          },
          include: {
            categories: true
          }
        })

        const bookmarks = getBookmarks.map(bookmark => {
          return {
              post: {
                title: bookmark.title,
                excerpt: bookmark.excerpt,
                postId: bookmark.slug,
                date: bookmark.createdAt
              },
              category: bookmark.categories[0].name,
              id: bookmark.id
          }
        })

        const sortBookmarks = (array: { post: { title: string; excerpt: string; postId: string; date: Date; }; category: string; id: number; }[], sortArray: number[]) => {
          return [...array].sort(
            (a, b) => sortArray.indexOf(a.id) - sortArray.indexOf(b.id)
          )
        }

        if (postIds) {
          const sortedBookmarks = sortBookmarks(bookmarks, postIds)
          res.status(201).json({ bookmarks: sortedBookmarks })
        } 
        
        } catch (err) {
          throw new Error("Did not manage to connect")
        }
      }
}