"use client"
import { signIn, signOut } from "next-auth/react"
import styles from "@/styles/Home.module.css"

export default function AuthButton({ isSignedIn } : {isSignedIn: boolean}) {
    if (isSignedIn) {
        return (
            <button className={styles.buttonBasic} onClick={() => signOut()}>
                Sign Out
            </button>
        ) 
    } else {
        return (
            <button className={styles.buttonBasic} onClick={() => signIn()}>
                Sign In
            </button>
        )
    }
}