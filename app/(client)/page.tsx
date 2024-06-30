"use client";
import useRealTimePosts from "../hooks/useRealTimePosts";
import { IPost } from "../types/IPosts";

export default function Home() {
  const posts = useRealTimePosts();

  return (
    <div>
      <div>
        {posts.length > 0 &&
          posts.map((post: IPost) => <p key={post._id}>{post.title}</p>)}
      </div>
    </div>
  );
}
