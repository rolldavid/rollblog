import { PostProps } from "@/lib/types";
import Link from "next/link";
import styles from "./PostCard.module.css";

export default function PostCard({ post, category }: PostProps) {

  const readableDate = new Date(post.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (category === "build") {
    return (
            <Link className={styles.buildContainer} href={`/posts/${category}/${post.postId}`}>
                <h2 className={styles.cardTitle}>{post.title}</h2>
                <p className={styles.cardExcerpt}> {post.excerpt}</p>
                <p className={styles.cardDate}>{readableDate}</p>
            </Link>
      )
  }

  if (category === "path") {
    return (
        <Link className={styles.pathContainer} href={`/posts/${category}/${post.postId}`}>
                <h2 className={styles.cardTitle}>{post.title}</h2>
                <p className={styles.cardExcerpt}> {post.excerpt}</p>
                <p className={styles.cardDate}>{readableDate}</p>
            </Link>
      )
  }

return (
    <Link className={styles.stackContainer} href={`/posts/${category}/${post.postId}`}>
            <h2 className={styles.cardTitle}>{post.title}</h2>
            <p className={styles.cardExcerpt}> {post.excerpt}</p>
            <p className={styles.cardDate}>{readableDate}</p>
        </Link>
    )

}
