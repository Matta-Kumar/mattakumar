"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Magnetic from "@/components/anim/Magnetic";
import Image from "next/image";
import ServicesMegaMenu from "@/components/nav/ServicesMegaMenu";
import type { Service, EngagementModel } from "@/sanity/lib/queries";

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/insights", label: "Insights" },
  { href: "https://community.mattakumar.com/communities", label: "Community", external: true },
  { href: "/contact", label: "Contact" },
];

export default function Nav({
  services,
  engagementModels,
}: {
  services: Service[];
  engagementModels: EngagementModel[];
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-paper/70 backdrop-blur-xl text-ink">
      <nav className="flex items-center justify-between px-6 md:px-12 py-5">
        <Link
          href="/"
          className="text-[15px] font-medium tracking-tight"
          aria-label="Matta Kumar — home"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src="/mattakumar_satish_logo.png"
            alt="Matta Kumar logo"
            width={120}
            height={24}
            className="w-auto h-12"
            loading="eager"
          />
        </Link>
        <ul className="hidden md:flex items-center gap-10">
          <ServicesMegaMenu services={services} engagementModels={engagementModels} />
          {LINKS.slice(1).map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                className="link-line label text-smoke hover:text-ink transition-colors duration-300"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <Magnetic>
            <a
              href="https://calendly.com/mattakumar"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sweep hidden sm:inline-block bg-ink text-paper label px-5 py-3 rounded-full"
            >
              <span>Book a call</span>
            </a>
          </Magnetic>
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden relative w-9 h-9 shrink-0 flex items-center justify-center"
          >
            <span
              aria-hidden="true"
              className={`absolute w-5 h-[1.5px] bg-ink transition-transform duration-300 ${
                mobileOpen ? "rotate-45" : "-translate-y-[5px]"
              }`}
            />
            <span
              aria-hidden="true"
              className={`absolute w-5 h-[1.5px] bg-ink transition-transform duration-300 ${
                mobileOpen ? "-rotate-45" : "translate-y-[5px]"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <div
        className={`md:hidden overflow-hidden transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] grid ${
          mobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden border-t border-fog">
          <ul className="flex flex-col px-6 py-6 gap-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  target={l.external ? "_blank" : undefined}
                  rel={l.external ? "noopener noreferrer" : undefined}
                  onClick={() => setMobileOpen(false)}
                  className="display text-2xl py-3 block text-ink hover:text-signal transition-colors duration-300"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-6 pb-8 sm:hidden">
            <Magnetic>
              <a
                href="https://calendly.com/mattakumar"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="btn-sweep inline-block bg-ink text-paper label px-5 py-3 rounded-full"
              >
                <span>Book a call</span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </header>
  );
}
