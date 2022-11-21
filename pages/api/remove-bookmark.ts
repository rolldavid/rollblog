import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
  if (req.method === "POST") {
    const { postId, userEmail } = req.body;

    const user = await prisma.user.update({
        where: {
            email: userEmail
        },
        data: {
            bookmarks: {
                deleteMany: {
                    postId: postId
                }
            }
        }, 
    })

    res.status(201).json({message: "success"})
  }

}