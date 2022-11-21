import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "@/api/auth/[...nextauth]";
import styles from "@/styles/Admin.module.css"

import AuthButton from "./components/AuthButton";
import Link from "next/link";

export default async function Page() {
  const session = await unstable_getServerSession(authOptions);

  if (!session) {
    return (
      <div className={styles.container}>
        <p>Please log in</p>
        <AuthButton isSignedIn={false}/>
      </div>
    )
  }
  return (
    <div className={styles.container}>
      <h2>Hey there, {session.user?.name}</h2>
      <div className={styles.center}>
        <Link className={styles.addPost} href={"/admin/add-post"}>
          Do you want to <span className={styles.addPostLink}>add a post?</span> 
        </Link></div>
      <div className={styles.center}><AuthButton isSignedIn={true}/></div>
    </div>
  );
}
