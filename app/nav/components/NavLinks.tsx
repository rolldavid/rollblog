import Link from "next/link";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "@/api/auth/[...nextauth]";
import ToggleTheme from "./ToggleTheme"
import styles from "./NavLinks.module.css"
import AuthButton from "app/admin/components/AuthButton";

export default function NavLinks({isLoggedIn}: {isLoggedIn: string | undefined}) {
    
    return (
        <nav className={styles.container}>
            <nav className={styles.linkContainer}>
                <Link href={"/"}>
                    <h1 className={styles.logo}>ryo</h1>
                </Link>
                
                <Link href={"/posts/build"} className={styles.linkItemBuild}>
                    Build
                </Link>
                <Link href={"/posts/path"} className={styles.linkItemPath}>
                    Path
                </Link>
                <Link href={"/posts/stack"} className={styles.linkItemStack}>
                    Stack
                </Link>
                <Link href={"/posts/lib"} className={styles.linkItemLib}>
                    Lib
                </Link>
            </nav>
            <div className={styles.accountContainer}>
                <div className={styles.toggle}>
                    <ToggleTheme />
                </div>
                <div className={styles.authContainer}>
                    <AuthButton isSignedIn={isLoggedIn ? true : false}/>
                </div>
            </div>
        </nav>
    )
}