import Link from "next/link";
import { useContext } from "react";
import ToggleTheme from "./ToggleTheme"
import styles from "./NavLinks.module.css"

export default function NavLinks() {

    return (
        <nav className={styles.container}>
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
            <div className={styles.toggle}>
                <ToggleTheme />
            </div>
            
        </nav>
    )
}