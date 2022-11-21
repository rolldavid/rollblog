import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import PostCollection from './components/PostCollection'
import type { CategoryProps, PostDetails } from '@/lib/types'


export default async function Page({params: { category }}: CategoryProps) {
    const posts = await getPosts(category);
    return <PostCollection posts={posts} category={category}/>
} 

async function getPosts(category: "build" | "stack" | "path") {
    const posts = await prisma.post.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          categories: {
            some: {
              name: category,
            },
          },
        },
      });
      return posts.map((post) => ({
        title: post.title,
        excerpt: post.excerpt,
        postId: post.slug,
        date: post.createdAt
      }));
}

export async function generateStaticParams() {
    const categories = await prisma.category.findMany();
    return categories.map((category) => ({
      category: category.name
    }));
  }

export const dynamicParams = false