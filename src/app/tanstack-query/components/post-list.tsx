"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

function PostList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
    staleTime: 3000,
  });

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Client-side Fetching Posts</h2>
      <ul>
        {data.slice(0, 3).map((post: { id: number; title: string }) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
