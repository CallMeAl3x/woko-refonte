import { client } from "@/sanity/lib/client";
import { IPost } from "../types/IPosts";

async function getPosts() {
  const query = `
  *[_type == "post"] {
    title,
    slug,
    publishedAt,
    excerpt,
  }
  `;
  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const posts = await getPosts();
  console.log(posts, "posts");

  return (
    <div>
      <div>
        {posts?.length > 0 &&
          posts?.map((post: IPost) => <p key={post._id}>{post.title}</p>)}
      </div>
    </div>
  );
}
