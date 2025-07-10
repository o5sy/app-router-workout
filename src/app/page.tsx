import ErrorBoundary from "./components/error-boundary";
import ErrorTriggerButton from "./components/error-trigger-button";
import Link from "next/link";
import PostList from "./components/post-list";
import { Suspense } from "react";
import UserProfile from "./components/user-profile";
import { notFound } from "next/navigation";

// 서버 컴포넌트
export default async function Home() {
  const userData = await fetchUserData();

  // 덜 중요하고 오래 걸리는 작업
  const postsData = fetchSlowPosts();

  return (
    <div>
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

      <div className="pt-4">
        <h2>데이터 조회 테스트</h2>
        <UserProfile name={userData.name} email={userData.email} />
        {/* Suspense 없으면 로딩될 때까지 멈춤 */}
        <Suspense fallback={<div>Loading...</div>}>
          <PostList postsPromise={postsData} />
        </Suspense>
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

async function fetchSlowPosts() {
  // 의도적 지연 시간
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );
  const data = await response.json();
  if (!response.ok) {
    // throw new Error("Failed to fetch posts");
    notFound();
  }
  return data;
}
