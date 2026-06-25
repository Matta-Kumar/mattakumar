import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Matta Kumar",
  description: "Book a strategy call or send us a brief.",
};

export default function ContactPage() {
  return (
    <section className="px-6 md:px-12 pt-44 pb-32 min-h-svh">
      <p className="label text-signal mb-8">Contact</p>
      <h1 className="display text-5xl md:text-7xl max-w-[14ch] mb-10">
        Let’s talk growth.
      </h1>
      <p className="text-[15px] leading-[1.7] text-smoke max-w-[50ch] mb-10">
        Full contact-page build coming next — booking embed and project brief
        form. For now, grab a slot directly:
      </p>
      <a
        href="https://calendly.com/mattakumar"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-sweep inline-block bg-ink text-paper text-sm font-medium px-9 py-4 rounded-full"
      >
        <span>Book a strategy call</span>
      </a>
    </section>
  );
}
