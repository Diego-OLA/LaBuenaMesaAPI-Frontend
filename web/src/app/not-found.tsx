import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center">
      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-stone-400">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900">
        Página no encontrada
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-500">
        Lo que buscas no existe o ya no está disponible.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-stone-900 px-5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-stone-700"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
