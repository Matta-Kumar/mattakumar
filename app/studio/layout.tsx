import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sanity Studio — Matta Kumar",
  robots: { index: false, follow: false },
};

// This is a separate root layout (Next.js "multiple root layouts" via route
// groups) — deliberately bare. The Sanity Studio is a full-screen app with
// its own theming; the marketing site's Nav/Footer/SmoothScroll/globals.css
// belong only to app/(marketing)/layout.tsx and must not wrap this route.
export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
