import { AddPostProps } from "../types";

export async function addPost({
    title,
    category,
    excerpt,
    body,
    adminEmail,
    slug
    }: AddPostProps
  ) {
    const response = await fetch(`/api/add-post`, {
      method: "POST",
      body: JSON.stringify({
        title: title,
        category: category,
        excerpt: excerpt,
        body: body,
        email: adminEmail,
        slug: slug,
    
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const data = await response.json();
    return data.createdPost;
  }

  export async function getBookmarks(email: string) {
    const response = await fetch("/api/get-bookmarks", {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.bookmarks;
  }

  export async function checkBookmark(email: string, postId: number){
    const response = await fetch("/api/check-bookmark", {
      method: "POST",
      body: JSON.stringify({
        email,
        postId
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  }

  export async function removeBookmark(email: string, postId: number){
    const response = await fetch("/api/remove-bookmark", {
      method: "POST",
      body: JSON.stringify({
        email,
        postId
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.message;
  }
  