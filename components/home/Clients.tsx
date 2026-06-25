const SLOTS = Array.from({ length: 8 }, (_, i) => `Client ${String(i + 1).padStart(2, "0")}`);

export default function Clients() {
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === "b"}>
      {SLOTS.map((name) => (
        <div
          key={name}
          className="mx-6 md:mx-10 h-10 w-32 shrink-0 border border-fog rounded-md flex items-center justify-center"
        >
          <span className="label text-smoke-light">{name} logo</span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-14 border-b border-fog">
      <p className="label text-smoke text-center mb-8">
        Trusted by brands across B2B and B2C
      </p>
      <div className="overflow-hidden">
        <div className="marquee-track">
          {row("a")}
          {row("b")}
        </div>
      </div>
    </section>
  );
}
