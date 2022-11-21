"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { checkBookmark, removeBookmark } from "@/lib/db/db-utils";
import styles from "./BookmarkDetails.module.css"

export default function({userEmail, postId}: {userEmail: string, postId: number}){
    const queryClient = useQueryClient()

    const { data, status } = useQuery(["checkBookmark"], () => {
        return checkBookmark(userEmail, postId);
      });

      const save = useMutation(
        async ({
            userEmail: userEmail,
            postId: postId,
        }: {
            userEmail: string
            postId: number,
        }) => {
          return fetch("/api/add-bookmark", {
            method: "POST",
            body: JSON.stringify({
                userEmail: userEmail,
                postId: postId,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        },
        {
            onSettled: () => queryClient.invalidateQueries(["checkBookmark"]),
          }
      )

      const remove = useMutation(
        async ({
            userEmail: userEmail,
            postId: postId,
        }: {
            userEmail: string
            postId: number,
        }) => {
          return fetch("/api/remove-bookmark", {
            method: "POST",
            body: JSON.stringify({
              email: userEmail,
              postId: postId
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
        },
        {
            onSettled: () => queryClient.invalidateQueries(["checkBookmark"]),
          }
      )

    if (status == "loading") {
        <p className={styles.bookmarkChecked}>Checking...</p>
    }

    if (status === "success" && data.isBookmarked ) {
        return (
            <>
            {remove.isLoading ? (
                <p className={styles.bookmarkUnchecked}>Removing...</p>
            ) : (
                <p 
                className={styles.bookmarkChecked}
                onClick={() => {
                    remove.mutate({ userEmail: userEmail, postId: postId })
                }}
                >
                {`\u2713`} Saved to Library</p>
            )}
        </>
            
        )
    }

    return (
        <>
            {save.isLoading ? (
                <p className={styles.bookmarkUnchecked}>Saving...</p>
            ) : (
                <p 
                className={styles.bookmarkChecked}
                onClick={() => {
                    save.mutate({ userEmail: userEmail, postId: postId })
                }}
                >
                Save to Library
                </p>
            )}
        </>
    )
}