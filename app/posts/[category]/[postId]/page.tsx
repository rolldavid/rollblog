
import type { PageProps } from "@/lib/types"
import { prisma } from "@/lib/prisma"

import PostContent from "./components/PostContent"

async function getPosts(postId: string){
    return await prisma.post.findUnique({
        where: {
            slug: postId
        }
    })
}

export default async function Page({params: { category, postId }}: PageProps) {
    const post = await getPosts(postId)

    if (!post) {
        return <div>Something went wrong...</div>
    } 

    return <PostContent post={post} category={category}/>
}

export async function generateStaticParams() {
    const posts = await prisma.post.findMany({
        include: {
            categories: true
        }
    })

    return posts.map((post) => ({
      category: post.categories[0].name,
      postId: post.slug,
    }));
  }

  export const dynamicParams = false
