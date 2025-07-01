// 서버 컴포넌트
export default async function Home() {
  const userData = await fetchUserData();

  // 덜 중요한 데이터
  const postsData = await fetchPosts();

  return (
    <div>
      <div>프로필</div>
      <ol>게시물 목록</ol>
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

async function fetchPosts() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return data;
}
