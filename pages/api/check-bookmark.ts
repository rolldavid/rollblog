import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { userEmail, postId } = req.body;
    
        try {
          const user = await prisma.user.findUnique({
            where: {
                email: userEmail
            },
            include: {
                bookmarks: true
                }
          })
      
            const isBookmarked = user?.bookmarks.filter(bookmark => bookmark.postId === postId)

            if (isBookmarked) {
              const resBool = isBookmarked.length > 0 ? true : false
              res.status(201).json({isBookmarked: resBool})
            }
          
        } catch (err) {
          throw new Error("Did not manage to connect")
        }
      }
}