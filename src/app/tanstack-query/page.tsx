import { Metadata } from "next";
import MoveHomeButton from "./components/move-home-button";
import PostList from "./components/post-list";

export const metadata: Metadata = {
  title: "Tanstack Query Test",
};

export default function TanstackQueryTestPage() {
  return (
    <div>
      <h1>Tanstack Query Test</h1>
      <PostList />
      <MoveHomeButton />
    </div>
  );
}
