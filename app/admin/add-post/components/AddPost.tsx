"use client"
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { AddPostProps } from "@/lib/types";
import { addPost } from "@/lib/db/db-utils";
import styles from "./AddPost.module.css";



const schema = yup
.object({
  title: yup.string().required(),
  category: yup.string().required(),
  excerpt: yup.string().required(),
  body: yup.string().required(),
})
.required();

export function AddPost({ adminEmail }: {adminEmail: string}) {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddPostProps>({
    resolver: yupResolver(schema),

  });

  const submitPost= async (data: AddPostProps) => {
    const slug = data.title.trim().replaceAll(" ", "-").toLowerCase();
    const title = data.title
    const category = data.category
    const excerpt = data.excerpt
    const body = data.body
    
    const post = await addPost({
        title,
        category,
        excerpt,
        body,
        adminEmail,
        slug
    });
    return;
  };

  return (
    <form onSubmit={handleSubmit(submitPost)} className={styles.container}>
      <div className={styles.postHeader}>
        <input
          {...register("title")}
          className={styles.titleItem}
          placeholder="Post Title"
        />
        <p>{errors.title?.message}</p>
        <select {...register("category")} className={styles.selectItem}>
          <option value="build">Build</option>
          <option value="path">Path</option>
          <option value="stack">Stack</option>
        </select>
        <p>{errors.category?.message}</p>
      </div>

      <div className={styles.postExcerpt}>
        <textarea
          {...register("excerpt")}
          rows={2}
          className={styles.inputItem}
          placeholder="Post Excerpt goes here"
        />
        <p>{errors.excerpt?.message}</p>
      </div>
      <div className={styles.postExcerpt}>
        <textarea
          {...register("body")}
          rows={25}
          className={styles.inputItem}
          placeholder="Post Body"
        />
        <p>{errors.body?.message}</p>
      </div>
      <div>
        <button type="submit" className={styles.submitButton}>
          Add Post
        </button>
      </div>
    </form>
  );

}