import "./globals.css";

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Next.js App",
  description: "App Router의 다양한 기능을 실습해보는 데모 앱",
  keywords: ["Next.js", "App Router", "Demo App"],
  openGraph: {
    title: "App Router Demo",
    description: "App Router의 다양한 기능을 실습해보는 데모 앱",
    // url: "https://deploy-url.com",
    siteName: "My Next.js App",
    images: ["/file.svg"],
    locale: "ko-KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "App Router Demo",
    description: "App Router의 다양한 기능을 실습해보는 데모 앱",
    images: ["/file.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-background text-foreground">
        <header className="p-4 text-center border-b border-gray-300">
          <Link href="/">
            <h1>My Next.js App</h1>
          </Link>
        </header>

        <main className="p-4">{children}</main>

        <footer className="p-4 text-center border-t border-gray-300 mt-4">
          <p>&copy; Next.js App Router Demo</p>
        </footer>
      </body>
    </html>
  );
}
