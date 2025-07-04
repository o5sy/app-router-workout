import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center font-sans bg-gray-100 min-h-screen">
      <h2 className="text-2xl text-gray-800 mb-3">
        페이지를 찾을 수 없습니다 (404) 😢
      </h2>
      <p className="text-gray-600 mb-6">
        요청하신 페이지가 존재하지 않거나, 더 이상 제공되지 않는 페이지입니다.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-md font-bold transition-colors hover:bg-blue-700"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
