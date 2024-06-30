// hooks/useRealTimePosts.ts
"use client";

import { useEffect, useState } from "react";
import { IPost } from "../types/IPosts";
import { client } from "@/sanity/lib/client";

const query =
  '*[_type == "post"] { _id, _type, _rev, _createdAt, _updatedAt, title, slug, publishedAt, excerpt }';

const useRealTimePosts = (): IPost[] => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchInitialPosts = async () => {
      const initialPosts: IPost[] = await client.fetch(query);
      setPosts(initialPosts);
    };

    fetchInitialPosts();

    const subscription = client.listen(query).subscribe((update) => {
      const result = update.result;
      if (result) {
        window.location.reload();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return posts;
};

export default useRealTimePosts;
