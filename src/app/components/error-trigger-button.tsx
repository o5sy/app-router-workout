"use client";

import { useEffect, useState } from "react";

export default function ErrorTriggerButton() {
  const [shouldThrow, setShouldThrow] = useState(false);

  const handleClick = () => {
    // 실제로는 여기에서 API 호출 실패 등의 로직이 있을 수 있습니다.
    // 예를 들어, API 호출 실패 시 setShouldThrow(true);
    setShouldThrow(true); // 버튼 클릭 시 에러 발생 플래그 설정
  };

  // shouldThrow 값이 변경되면 (렌더링 단계에서) 에러를 throw
  useEffect(() => {
    if (shouldThrow) {
      throw new Error(
        "클라이언트 컴포넌트 이벤트 핸들러에서 의도적으로 발생시킨 에러"
      );
    }
  }, [shouldThrow]);

  return (
    <div>
      <button onClick={handleClick}>
        클릭해서 에러 발생 (error.tsx로 전달)
      </button>
    </div>
  );
}
