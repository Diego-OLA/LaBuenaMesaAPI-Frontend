import Link from "next/link";

export function Pagination({
  currentPage,
  lastPage,
  basePath,
}: {
  currentPage: number;
  lastPage: number;
  basePath: string;
}) {
  if (lastPage <= 1) {
    return null;
  }

  const previous = Math.max(1, currentPage - 1);
  const next = Math.min(lastPage, currentPage + 1);
  const linkClass =
    "rounded-full border border-stone-200 px-4 py-2 text-xs font-medium text-stone-700 transition-colors hover:border-stone-300 hover:bg-stone-50";
  const disabledClass = `${linkClass} pointer-events-none opacity-40`;

  return (
    <nav
      aria-label="Paginación"
      className="mt-10 flex items-center justify-between border-t border-stone-200 pt-6 text-xs text-stone-500"
    >
      <span>
        Página {currentPage} de {lastPage}
      </span>
      <div className="flex gap-2">
        {currentPage > 1 ? (
          <Link href={`${basePath}?page=${previous}`} className={linkClass}>
            Anterior
          </Link>
        ) : (
          <span className={disabledClass}>Anterior</span>
        )}
        {currentPage < lastPage ? (
          <Link href={`${basePath}?page=${next}`} className={linkClass}>
            Siguiente
          </Link>
        ) : (
          <span className={disabledClass}>Siguiente</span>
        )}
      </div>
    </nav>
  );
}
