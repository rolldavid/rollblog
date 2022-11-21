"use client"
import { SyntheticEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

import styles from "./AddBookmark.module.css"
import BookmarkDetails from "./BookmarkDetails"

const queryClient = new QueryClient();

export default function AddBookmark({postId} : {postId: number}) {
    const router = useRouter();

    // This session strategy is used here due to conflict w
    // headers and generateStaticParams in the parent page.
    // Move to the parent page and pass session down to client
    // component when this is addressed by Next team 
    const [session, setSession] = useState<string>()

    useEffect(() => {
        const getSession = async () => {
            const res = await fetch("/api/get-session")
            const data = await res.json();
            setSession(data.email)
            return;
        }
        getSession()
    }, [])


    const handleSignin = (e: SyntheticEvent) => {
        e.preventDefault();
        router.push("/posts/lib");
    }

    if (typeof session !== "string") {
        return (
            <div onClick={handleSignin}>
               <p className={styles.bookmarkUnchecked}>Save to Library</p>
            </div>
        )
    }
    return (
        <QueryClientProvider client={queryClient}>
            <BookmarkDetails userEmail={session} postId={postId}/>
        </QueryClientProvider>
    )
}
