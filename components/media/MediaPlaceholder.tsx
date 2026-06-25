/**
 * Labeled slot for a real asset. Shows what to shoot/supply and at what ratio,
 * so the site is demoable now and each placeholder is a visible work item.
 */
type Props = {
  kind: "photo" | "video" | "screenshot" | "logo";
  note: string;
  ratio?: string;
  dark?: boolean;
  className?: string;
};

const KIND_LABEL: Record<Props["kind"], string> = {
  photo: "Photo",
  video: "Video",
  screenshot: "Screenshot",
  logo: "Logo",
};

export default function MediaPlaceholder({
  kind,
  note,
  ratio = "16/9",
  dark = false,
  className = "",
}: Props) {
  return (
    <div
      className={`relative overflow-hidden ${
        dark ? "bg-ink-soft text-paper" : "bg-paper-deep text-ink"
      } ${className}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={`Placeholder for ${KIND_LABEL[kind].toLowerCase()}: ${note}`}
    >
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.08]"
        aria-hidden="true"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.3" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.3" />
        <rect x="0.15" y="0.15" width="99.7" height="99.7" fill="none" stroke="currentColor" strokeWidth="0.3" />
      </svg>
      <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-5">
        <span className="label opacity-50">{KIND_LABEL[kind]} — to supply</span>
        <p className="text-xs md:text-[13px] leading-relaxed opacity-70 max-w-[36ch]">{note}</p>
      </div>
    </div>
  );
}
