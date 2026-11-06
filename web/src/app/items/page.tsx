import Link from "next/link";

import { ApiError } from "@/components/api-error";
import { ItemCard } from "@/components/item-card";
import { PageHeader } from "@/components/page-header";
import { Pagination } from "@/components/pagination";
import { getItems } from "@/lib/api";
import type { Item, Paginated } from "@/lib/types";

export const metadata = {
  title: "Platillos",
};

export default async function ItemsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  let result: Paginated<Item>;

  try {
    result = await getItems(page);
  } catch {
    return (
      <div className="mx-auto max-w-6xl px-5 py-14 sm:py-16">
        <PageHeader
          eyebrow="Carta"
          title="Platillos"
          description="Todos los platillos activos de la casa."
        />
        <div className="mt-10">
          <ApiError />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <PageHeader
          eyebrow="Carta"
          title="Platillos"
          description={`${result.total} platillos activos, listos para pedir.`}
        />
        <Link
          href="/items/new"
          className="rounded-full bg-stone-900 px-5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-stone-700"
        >
          + Nuevo platillo
        </Link>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {result.data.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      {result.data.length === 0 ? (
        <p className="mt-10 text-sm text-stone-400">
          No hay platillos activos en este momento.
        </p>
      ) : null}

      <Pagination
        currentPage={result.current_page}
        lastPage={result.last_page}
        basePath="/items"
      />
    </div>
  );
}
