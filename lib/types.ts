import { Category, Post } from "@prisma/client";

export type ContentParams = {
    title: string;
    content: string;
}

export type CategoryProps = {
    params: {
        category: "build" | "path" | "stack"
    }
}

export type PageProps = {
    params: {
        category: string;
        postId: string
    }
}

export interface PostDetails {
    title: string;
    excerpt: string;
    postId: string;
    date: Date;
}

export interface PostProps {
    post: PostDetails;
    category: string; 
}

export interface CollectionProps {
   posts: PostDetails[];
   category: "build" | "path" | "stack"
}

export interface BookmarkProps {
    post: PostDetails;
    category: "build" | "path" | "stack";
    id: number;
}

export interface AddPostProps {
    title: string;
    category: string;
    excerpt: string;
    body: string;
    adminEmail: string;
    slug: string;
}


// theme
export interface ReactChildren {
    children: React.ReactNode
}