import { CollectionProps } from "@/lib/types"
import PostCard from "./PostCard"
import styles from './PostCollection.module.css'

export default function PostCollection ({posts, category}: CollectionProps) {
    return (
       <div className={styles.container}>
            {posts.map(post => {
                return <PostCard post={post} category={category} key={post.postId}/>
            })}
        </div>
    )
}
