"use client";

import { createPost } from "../actions/actions";
import { useQuery } from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
  body: string;
}

// interface PostListProps {
//   postsPromise?: Promise<Post[]>;
//   posts?: Post[];
// }

function PostList() {
  // use 훅으로 데이터 조회
  // const posts = use(postsPromise);

  /**
   * 실험 1
   * 1. staleTime 이후 curl로 데이터 추가
   * 2. 탭 포커스
   * 3. refetch되면서 RCC만 반영됨
   * => RSC/RCC 간 데이터 불일치 발생
   */
  const { data: posts = [] } = useQuery<Post[]>({
    queryKey: ["posts2"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3001/posts", {
        next: { tags: ["posts2"] }, // 오류는 안나는데 revalidation 동작이 일어나진 않음
      });
      const data = await res.json();
      return data;
    },
    staleTime: 1000,
  });

  /**
   * 실험 2
   * 1. 사용자에 의해 데이터 추가
   * 2. revalidateTag 호출
   * 3. RSC와 RCC 모두 반영됨 (revalidateTag 호출하면 tanstack cache가 업데이트 되면서 RCC도 반영됨)
   * => 데이터 불일치 해소 가능
   * (fetch랑 tanstack query를 같이 쓰게되면 데이터 불일치 이슈가 발생할 수 있어 캐시 관리에 신경써야함)
   */
  const handleClick = async () => {
    await createPost();
  };

  return (
    <>
      <p>클라이언트 컴포넌트 글 갯수: {posts.length}</p>

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
