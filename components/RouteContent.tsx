"use client";

import { usePathname } from "next/navigation";

export default function RouteContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return <div key={pathname} className="contents">{children}</div>;
}
