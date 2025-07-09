import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts",
};

export default async function PostsPage() {
  const data = await getPosts();
  const { posts, timestamp } = data;

  return (
    <div>
      <h1>Posts</h1>
      <p>Last updated: {timestamp}</p>
      <ul>
        {posts.map((post: { id: number; title: string }) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            {/* <p>{post.body}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

async function getPosts() {
  // 프로덕션에서만 동작함
  // 개발 환경에서는 fetch 요청이 캐시되지 않는다고 함
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: {
      revalidate: 10,
    },
  });
  const posts = await response.json();

  return {
    posts: posts.slice(0, 5),
    timestamp: new Date().toLocaleString(),
  };
}
