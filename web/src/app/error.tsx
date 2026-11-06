"use client";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center">
      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-stone-400">
        Error
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900">
        No se pudo cargar la página
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-500">
        Revisa que la API esté disponible y vuelve a intentarlo.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-stone-900 px-5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-stone-700"
        >
          Reintentar
        </button>
        <Link
          href="/"
          className="rounded-full border border-stone-300 bg-white px-5 py-2.5 text-xs font-medium text-stone-700 transition-colors hover:border-stone-400"
        >
          Inicio
        </Link>
      </div>
    </div>
  );
}
