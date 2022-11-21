import { prisma } from "@/lib/prisma"

async function getPost(postId: string){
    return await prisma.post.findUnique({
        where: {
            slug: postId
        }
    })
}
  
  export default async function Head({ params }: {params: {postId: string}}) {
    const post = await getPost(params.postId);
    if (!post) return;
    return (
      <>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </>
    )
  }