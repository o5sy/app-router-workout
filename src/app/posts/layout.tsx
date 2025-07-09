export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <nav className="w-40 p-4 border-r border-gray-300">
        <h3>게시물 메뉴 (Posts Layout)</h3>
        <ul>
          <li>게시물1</li>
          <li>게시물2</li>
        </ul>
      </nav>
      <section className="flex-grow p-4 border border-gray-300 rounded-md">
        {children}
      </section>
    </div>
  );
}
