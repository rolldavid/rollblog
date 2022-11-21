import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = await unstable_getServerSession(req, res, authOptions)
        res.status(201).json({email: session?.user?.email})
    } catch (err) {
        res.status(401).json({message: "Did not manage to connect"})
    }
}