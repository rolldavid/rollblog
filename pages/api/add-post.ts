import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { email, title, excerpt, category, body, slug } = req.body;
    
        try {
          const post = await prisma.post.create({
            data: {
              title: title,
              excerpt: excerpt,
              body: body,
              slug: slug,
              author: {
                connectOrCreate: {
                  where: {
                    email: email,
                  },
                  create: {
                    email: email,
                  },
                },
              },
              categories: {
                connectOrCreate: {
                  where: {
                    name: category,
                  },
                  create: {
                    name: category,
                  },
                },
              },
            },
    
            include: {
              author: true,
            },
          });
          res.status(201).json({message: "ok"})
        } catch (err) {
          throw new Error("Did not manage to connect");
        }
      }
}