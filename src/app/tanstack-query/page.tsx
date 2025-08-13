import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { Metadata } from "next";
import MoveHomeButton from "./components/move-home-button";
import PostList from "./components/post-list";

export const metadata: Metadata = {
  title: "Tanstack Query Test",
};

export default async function TanstackQueryTestPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
    staleTime: 30000000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <h1>Tanstack Query Test</h1>
        <PostList />
        <MoveHomeButton />
      </div>
    </HydrationBoundary>
  );
}
