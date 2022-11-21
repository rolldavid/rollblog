import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "@/api/auth/[...nextauth]";
import QueryProvider from "app/utils/QueryProvider";
import AuthButton from "app/admin/components/AuthButton";
import styles from "@/styles/Home.module.css"

import Bookmarks from "./components/Bookmarks";

export default async function Page() {
    const session = await unstable_getServerSession(authOptions);
    if (!session) {
        return (
          <div className={styles.libContainer}>
            <p>Sign in with GitHub or Google to save posts</p>
            <div>
              <AuthButton isSignedIn={false}/>
            </div>

          </div>
        )
      }
    if (typeof session.user?.email === "string") {
        return (
            <QueryProvider>
                <Bookmarks userEmail={session.user.email}/>
            </QueryProvider>
        )
    }
}