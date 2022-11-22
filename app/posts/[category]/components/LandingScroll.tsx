"use client"

import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import LoadCard from "./LoadCard";
import PostCard from "./PostCard";
import Spinner from "app/utils/Spinner";
import styles from "./LandingScroll.module.css";
import Link from "next/link";
import { Post } from "@prisma/client";


export default function LandingScroll() {
  
  const getInfinitePosts = async ({ pageParam = 85}) => {
    const res = await fetch(
      "api/get-infinite-posts?cursor=" + pageParam
    );
    return res.json();
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(["infinitePosts"], getInfinitePosts, {
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor >= 25 ? lastPage.nextCursor : undefined;
    },
  });

    useEffect(() => {

    const handleScroll = async () => {
      if (
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight - 20
      ) {
        fetchNextPage();
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    
    <>

        {status === "loading" ? (
          <div className={styles.cardContainer}>
            <LoadCard />
            <LoadCard />
            <LoadCard />
            <LoadCard />
            <LoadCard />
            <LoadCard />
          </div>
        ) : status === "error" ? (
          <p>Error</p>
        ) : (
          <div className={styles.container}>
            {data.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.posts.map((post: {post: Post, category: string}) => (
                  <PostCard
                    post={(
                      {
                        title: post.post.title,
                        excerpt: post.post.excerpt,
                        postId: post.post.slug,
                        date: post.post.createdAt
                      }
                    )}
                    key={post.post.id}
                    category={post.category}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
        )}

      <div className={styles.loadingContainer}>
        {isFetchingNextPage && (
          <div>
            <Spinner />
          </div>
        )}
      </div>
    
    </>
  );
}
