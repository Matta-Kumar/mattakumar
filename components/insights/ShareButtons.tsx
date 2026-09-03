type Props = { url: string; title: string };

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
      <path d="M18.24 2.75h3.05l-6.66 7.62 7.84 10.88h-6.14l-4.8-6.5-5.5 6.5H2.98l7.12-8.15L2.6 2.75h6.3l4.34 5.94 5-5.94Zm-1.07 16.6h1.69L7.9 4.53H6.09l11.08 14.82Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-8h2.68l.4-3.11h-3.08V7.94c0-.9.25-1.51 1.54-1.51h1.64V3.65C15.9 3.55 14.94 3.5 13.82 3.5c-2.33 0-3.93 1.42-3.93 4.03v2.36H7.2v3.11h2.69v8h3.61Z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 6.5 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M12.02 2.5a9.5 9.5 0 0 0-8.2 14.28L2.5 21.5l4.85-1.27a9.5 9.5 0 1 0 4.67-17.73Zm0 1.8a7.7 7.7 0 0 1 6.53 11.77 7.7 7.7 0 0 1-9.13 3.28l-.35-.13-2.9.76.77-2.82-.15-.36A7.7 7.7 0 0 1 12.02 4.3Zm-2.9 3.98c-.18 0-.47.07-.71.34-.25.27-.94.92-.94 2.24s.96 2.6 1.1 2.78c.13.18 1.87 2.95 4.6 4.03 2.28.9 2.75.72 3.24.68.5-.05 1.6-.65 1.83-1.28.22-.63.22-1.17.16-1.28-.07-.11-.25-.18-.52-.32-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.61.13-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.13-1.13-.42-2.16-1.34-.8-.71-1.34-1.6-1.5-1.86-.15-.27-.02-.42.12-.55.12-.12.27-.32.4-.48.13-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.13-.6-1.51-.85-2.06-.21-.48-.43-.48-.61-.49h-.4Z" />
    </svg>
  );
}

export default function ShareButtons({ url, title }: Props) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, icon: LinkedInIcon },
    { label: "Share on X", href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, icon: XIcon },
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, icon: FacebookIcon },
    { label: "Share by email", href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`, icon: EmailIcon },
    { label: "Share on WhatsApp", href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, icon: WhatsAppIcon },
  ];

  return (
    <div>
      <p className="label text-ink mb-4">Share post</p>
      <div className="flex items-center gap-2">
        {links.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-fog text-smoke hover:text-signal hover:border-signal transition-colors duration-200"
          >
            <Icon />
          </a>
        ))}
      </div>
    </div>
  );
}
