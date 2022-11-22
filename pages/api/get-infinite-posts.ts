import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;
  const rawCursor = query.cursor

  if (typeof rawCursor === "string") {
    const myCursor = parseInt(rawCursor)
    try {
        const queryResults = await prisma.post.findMany({
          take: -8,
          skip: 1,
          cursor: {
            id: myCursor,
          },
          orderBy: {
            id: "asc",
          },
          include: {
            categories: true,
          },
        });

        const posts = queryResults.map(result => {
            return {
                post: result,
                category: result.categories[0].name
            }
        })
        res.status(201).json({
          posts: posts,
          nextCursor: queryResults[0].id,
        });
     
    } catch (err) {
        res.status(422).json({ message: "Did not manage to connect" });
        throw new Error("Did not manage to connect");
      }
  }

}
