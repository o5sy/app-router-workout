"use client"; // Error Boundaries는 클라이언트 컴포넌트여야 합니다.

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 에러 로깅 서비스 등에 에러를 기록할 수 있습니다.
    console.error(error);
  }, [error]);

  return (
    <div className="p-4 text-center font-sans">
      <h2>🚨 뭔가 잘못되었어요!</h2>
      <p>{error.message}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer "
        onClick={
          // Segment를 다시 렌더링하여 복구를 시도합니다.
          () => reset()
        }
      >
        다시 시도
      </button>
    </div>
  );
}
