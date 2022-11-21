import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { email, postId } = req.body;
    
        try {
          const user = await prisma.user.findUnique({
            where: {
                email: email
            },
            include: {
                bookmarks: true
                }
          })
          

            const isBookmarked = user?.bookmarks.filter(bookmark => bookmark.postId === postId)
         
            res.status(201).json({isBookmarked: isBookmarked !== undefined && isBookmarked.length > 0 ? true : false})
    
          
        } catch (err) {
          throw new Error("Did not manage to connect")
        }
      }
}