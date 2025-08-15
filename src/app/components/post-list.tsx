"use client";

import { createPost } from "../actions/actions";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostListProps {
  postsPromise?: Promise<Post[]>;
  posts?: Post[];
}

function PostList({ posts = [] }: PostListProps) {
  // use 훅으로 데이터 조회
  // const posts = use(postsPromise);

  // const { data: posts, isPending } = useQuery<Post[]>({
  //   queryKey: ["posts"],
  //   queryFn: async () => {
  //     const res = await fetch("http://localhost:3001/posts");
  //     const data = await res.json();
  //     return data;
  //   },
  // });

  const handleClick = async () => {
    await createPost();
  };

  return (
    <>
      <button className="border border-amber-300" onClick={handleClick}>
        게시물 추가
      </button>

      <ol>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </>
  );
}

export default PostList;
