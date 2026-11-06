import Link from "next/link";

export function ApiError() {
  return (
    <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center">
      <p className="text-sm font-medium text-stone-900">
        No se pudo conectar con la API
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-stone-500">
        Verifica que el backend Laravel esté ejecutándose en{" "}
        <code className="rounded bg-stone-100 px-1.5 py-0.5 text-xs">
          http://127.0.0.1:8000
        </code>
        .
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-full bg-stone-900 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-stone-700"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
