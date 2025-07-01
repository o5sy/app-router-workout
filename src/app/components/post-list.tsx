import { use } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostListProps {
  postsPromise: Promise<Post[]>;
}

function PostList({ postsPromise }: PostListProps) {
  // use 훅으로 데이터 조회
  const posts = use(postsPromise);

  return (
    <ol>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ol>
  );
}

export default PostList;
