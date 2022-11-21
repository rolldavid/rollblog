"use client"

import { useQuery } from "@tanstack/react-query";
import { getBookmarks } from "@/lib/db/db-utils";
import AuthButton from "app/admin/components/AuthButton";
import { BookmarkProps } from "@/lib/types";
import PostCard from "app/posts/[category]/components/PostCard";
import Spinner from "app/utils/Spinner";
import styles from "./Bookmarks.module.css"

export default function Bookamrks({userEmail} : {userEmail: string}) {

  if (userEmail) {
    const { data, status } = useQuery(["bookmarks"], () => {
        const bookmarks = getBookmarks(userEmail);
    
        return bookmarks;
      });

      if (status === "loading") {
        return <div className={styles.container}><Spinner /></div>;
      }
    
      if (status === "error") {
        return <div className={styles.container}>Something went wrong...</div>;
      }
    
      return (
        <>
            <div className={styles.postHeader}>
              <div className={styles.titleContainer}>
                <h1 className={styles.bookmarksTitle}>Library</h1>
              </div>
              <div className={styles.authContainer}><AuthButton isSignedIn={true}/></div>
          </div>
            <div className={styles.container}>
                {data.map((post: BookmarkProps) => {
                    return <PostCard post={post.post} category={post.category} key={post.post.postId}/>
                })}
            </div>
         </>
     )
  
  }
  return null;

}
