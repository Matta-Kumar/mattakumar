import Link from "next/link";

const SOCIALS = [
  { href: "https://www.linkedin.com/in/mattakumar/", label: "LinkedIn" },
  { href: "https://x.com/mattakumar", label: "X / Twitter" },
  { href: "https://www.youtube.com/@mattakumar", label: "YouTube" },
  { href: "https://www.instagram.com/mattakumar/", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper overflow-hidden border-t border-fog-light">
      <div className="px-6 md:px-12 pt-20 pb-8">
        <div className="grid md:grid-cols-12 gap-12 pb-20 border-b border-fog-light">
          <div className="md:col-span-5">
            <p className="display text-3xl max-w-[18ch]">
              Every era of search. Same result: found.
            </p>
          </div>
          <div className="md:col-span-3 md:col-start-7">
            <p className="label text-paper/40 mb-5">Pages</p>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="link-line">Home</Link></li>
              <li><Link href="/services" className="link-line">Services</Link></li>
              <li><Link href="/about" className="link-line">About</Link></li>
              <li><Link href="/contact" className="link-line">Contact</Link></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="label text-paper/40 mb-5">Elsewhere</p>
            <ul className="space-y-3 text-sm">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-line">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-10">
          <p
            aria-hidden="true"
            className="display text-[15vw] leading-[0.85] text-paper/[0.06] select-none whitespace-nowrap"
          >
            Matta Kumar
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-3 text-[12px] text-paper/40 pt-6 border-t border-fog-light">
          <p>© {new Date().getFullYear()} Satish Kumar Matta. All rights reserved.</p>
          <p>Digital growth partner — 18 years in search.</p>
        </div>
      </div>
    </footer>
  );
}
