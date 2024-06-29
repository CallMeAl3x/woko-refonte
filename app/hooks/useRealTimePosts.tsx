// hooks/useRealTimePosts.ts
"use client";

import { useEffect, useState } from "react";
import { IPost, isIPost } from "../types/IPosts";
import { client } from "@/sanity/lib/client";

const query =
  '*[_type == "post"] { _id, _type, _rev, _createdAt, _updatedAt, title, slug, publishedAt, excerpt }';

const useRealTimePosts = (): IPost[] => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchInitialPosts = async () => {
      const initialPosts = await client.fetch(query);
      setPosts(initialPosts);
    };

    fetchInitialPosts();

    const subscription = client.listen(query).subscribe((update) => {
      const result = update.result;
      if (result && isIPost(result)) {
        setPosts((prevPosts) => {
          const postExists = prevPosts.some((post) => post._id === result._id);
          if (postExists) {
            return prevPosts.map((post) =>
              post._id === result._id ? result : post
            );
          } else {
            return [...prevPosts, result];
          }
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return posts;
};

export default useRealTimePosts;
