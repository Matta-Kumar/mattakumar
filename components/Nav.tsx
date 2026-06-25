"use client";

import Link from "next/link";
import Magnetic from "@/components/anim/Magnetic";
import Image from "next/image";

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-paper/70 backdrop-blur-xl text-ink">
      <nav className="flex items-center justify-between px-6 md:px-12 py-5">
        <Link
          href="/"
          className="text-[15px] font-medium tracking-tight"
          aria-label="Matta Kumar — home"
        >
          <Image src="/mattakumar_satish_logo.png" alt="Matta Kumar logo" width={120} height={24} />
        </Link>
        <ul className="hidden md:flex items-center gap-10">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="link-line label text-smoke hover:text-ink transition-colors duration-300">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Magnetic>
          <a
            href="https://calendly.com/mattakumar"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sweep inline-block bg-ink text-paper label px-5 py-3 rounded-full"
          >
            <span>Book a call</span>
          </a>
        </Magnetic>
      </nav>
    </header>
  );
}
