import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { postId, userEmail } = req.body;

    const user = await prisma.user.findFirst({
        where: {
            email: userEmail
        }
    })


    if (user?.id) {
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                bookmarks: {
                    deleteMany: {
                        postId: postId
                    }
                }
            }
        })
    }
    

    
  }
}
