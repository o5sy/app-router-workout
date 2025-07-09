import ErrorBoundary from "./components/error-boundary";
import ErrorTriggerButton from "./components/error-trigger-button";
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
