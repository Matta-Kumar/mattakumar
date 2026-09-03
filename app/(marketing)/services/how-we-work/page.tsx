import type { Metadata } from "next";
import Link from "next/link";
import EngagementModels from "@/components/home/EngagementModels";
import { getEngagementModels, getInHouseCapabilities } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "How we'd work together — Matta Kumar",
  description:
    "Five ways to work together — from fully done-for-you to a one-time consultation — plus support if you'd rather build the capability in-house.",
};

export default async function HowWeWorkPage() {
  const [models, teamBuilding] = await Promise.all([getEngagementModels(), getInHouseCapabilities()]);

  return (
    <>
      <section className="px-6 md:px-12 pt-44 pb-6">
        <h1 className="sr-only">How we&apos;d work together</h1>
        <nav className="label text-smoke" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-ink transition-colors duration-300">Home</Link>
          <span className="mx-2 text-smoke-light">/</span>
          <Link href="/services" className="hover:text-ink transition-colors duration-300">Services</Link>
          <span className="mx-2 text-smoke-light">/</span>
          <span>How we&apos;d work together</span>
        </nav>
      </section>
      <EngagementModels models={models} teamBuilding={teamBuilding} />
    </>
  );
}
