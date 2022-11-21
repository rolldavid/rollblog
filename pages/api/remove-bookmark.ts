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
        try {
        await prisma.bookmarksByUser.delete({
            where: {
                postId_userId: {
                    postId: postId,
                    userId: user?.id
                }
            }
        });
        res.status(201).json({message: "success"})
        } catch (err) {
        throw new Error("Did not manage to connect");
        }
    }
  }
}
