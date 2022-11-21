import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "@/api/auth/[...nextauth]";
import { prisma } from "@/lib/prisma";

import AuthButton from "../components/AuthButton"
import { AddPost } from "./components/AddPost";

export default async function Page() {
  const session = await unstable_getServerSession(authOptions);
  
  if (!session) {
    return (
      <div>
        <p>Please log in</p>
        <AuthButton isSignedIn={false}/>
      </div>
    )
  }

  if (session.user?.email) {
    const user = await prisma.user.findUnique({
        where: {
          email: session?.user?.email
        }
    })

    if (user?.role === "ADMIN") {
      return <AddPost adminEmail={session.user.email}/>
    }

  return <div>You do not have access</div>
  }
  
}
