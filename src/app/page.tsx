import PostList from "./components/post-list";
import { Suspense } from "react";
import UserProfile from "./components/user-profile";

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
    </div>
  );
}

async function fetchUserData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
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
    throw new Error("Failed to fetch posts");
  }
  return data;
}
