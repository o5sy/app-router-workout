"use client";

import { useRouter } from "next/navigation";

function MoveHomeButton() {
  const router = useRouter();
  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
      onClick={() => router.push("/")}
    >
      홈으로 돌아가기
    </button>
  );
}

export default MoveHomeButton;
