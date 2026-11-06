export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="max-w-2xl">
      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-stone-400">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-stone-900 sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-sm leading-6 text-stone-500">{description}</p>
    </header>
  );
}
