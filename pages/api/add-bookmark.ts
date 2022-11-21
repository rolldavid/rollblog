import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { postId, userEmail } = req.body;

    try {
      await prisma.user.update({
        where: {
          email: userEmail,
        },
        data: {
          bookmarks: {
            create: {
              post: {
                connect: {
                  id: postId,
                },
              },
            },
          },
        },
      });
      res.status(201).json({message: "success"})
    } catch (err) {
      throw new Error("Did not manage to connect");
    }
  }
}
