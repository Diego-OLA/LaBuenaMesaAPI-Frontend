import Link from "next/link";

export function SectionHeading({
  eyebrow,
  title,
  href,
  linkLabel = "Ver todo",
}: {
  eyebrow: string;
  title: string;
  href: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-stone-400">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900">
          {title}
        </h2>
      </div>
      <Link
        href={href}
        className="shrink-0 text-xs font-medium text-stone-600 underline-offset-4 transition-colors hover:text-stone-900 hover:underline"
      >
        {linkLabel} →
      </Link>
    </div>
  );
}
