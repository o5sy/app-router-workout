"use client"; // Error Boundary는 클라이언트 컴포넌트여야 합니다.

import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode; // 에러 발생 시 보여줄 UI
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null; // 발생한 에러 객체를 저장
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    // 초기 상태는 에러가 없는 것으로 설정
    this.state = { hasError: false, error: null };
  }

  // 자식 컴포넌트에서 에러가 발생했을 때 호출됩니다.
  // 다음 렌더링에서 fallback UI를 보여주도록 상태를 업데이트합니다.
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error("ErrorBoundary: getDerivedStateFromError ->", error.message);
    return { hasError: true, error: error };
  }

  // 컴포넌트 트리의 에러를 로깅하는 데 사용됩니다.
  // componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
  //   console.error("ErrorBoundary: componentDidCatch ->", error, errorInfo);
  // }

  render() {
    if (this.state.hasError) {
      // 에러가 발생하면 props로 받은 fallback UI를 렌더링합니다.
      return this.props.fallback;
    }

    // 에러가 없으면 자식 컴포넌트를 그대로 렌더링합니다.
    return this.props.children;
  }
}

export default ErrorBoundary;
