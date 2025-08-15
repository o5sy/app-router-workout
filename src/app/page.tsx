import ErrorBoundary from "./components/error-boundary";
import ErrorTriggerButton from "./components/error-trigger-button";
import Link from "next/link";
import PostList from "./components/post-list";
import { Suspense } from "react";
import UserProfile from "./components/user-profile";
import { notFound } from "next/navigation";

// 서버 컴포넌트
export default async function Home() {
  // prefetch (await는 서버 컴포넌트의 렌더링을 차단하므로, 덜 중요하고 오래 걸리는 작업이라면 클라이언트 컴포넌트에서 use() 훅으로 리졸브해서 사용)
  const userData = await fetchUserData();
  const posts = await fetchPosts();

  return (
    <div>
      {/* navigation */}
      <nav className="flex gap-4">
        <Link href="/posts" className="text-blue-500 underline">
          게시물 목록
        </Link>
        <Link href="/notes" className="text-blue-500 underline">
          메모
        </Link>
        <Link href="/tanstack-query" className="text-blue-500 underline">
          Tanstack Query 테스트
        </Link>
      </nav>

      {/* test contents */}
      <div className="pt-4 flex flex-col gap-2">
        {/* user information */}
        <UserProfile name={userData.name} email={userData.email} />

        {/* posts */}
        <div>
          <h2 className="text-2xl">게시물</h2>

          {/* prefetched data 서버 컴포넌트에 렌더링 */}
          <div>글 갯수: {posts.length}</div>

          {/* Suspense 없으면 로딩될 때까지 멈춤 */}
          <Suspense fallback={<div>Loading...</div>}>
            <PostList posts={posts} />
          </Suspense>
        </div>

        {/* 컴포넌트 단위 에러 처리 */}
        <ErrorBoundary fallback={<div>Error</div>}>
          <ErrorTriggerButton />
        </ErrorBoundary>
      </div>
    </div>
  );
}

async function fetchUserData() {
  // userId 9999로 바꿔 NotFound 페이지 확인
  const userId = 1;

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  const data = await response.json();
  if (!response.ok) {
    // throw new Error("Failed to fetch user data");
    console.error(`사용자 id ${userId} 조회 실패`);
    notFound();
  }
  return data;
}

async function fetchPosts() {
  // 의도적 지연 시간
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  // 태그 추가
  const res = await fetch("http://localhost:3001/posts", {
    next: { tags: ["posts"] },
  });
  const data = await res.json();
  if (!res.ok) {
    notFound();
  }
  return data;
}
