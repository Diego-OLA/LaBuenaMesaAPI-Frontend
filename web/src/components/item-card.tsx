import Link from "next/link";

import { CategoryPill } from "@/components/category-pill";
import { formatPrice } from "@/lib/format";
import type { Item } from "@/lib/types";

export function ItemCard({ item }: { item: Item }) {
  const active = Boolean(item.activo);

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-5 transition-colors hover:border-stone-300">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <CategoryPill>{item.categoria?.nombre ?? "Sin categoría"}</CategoryPill>
          <h3 className="mt-3 truncate text-[15px] font-medium tracking-tight text-stone-900">
            {item.nombre}
          </h3>
        </div>
        <span className="shrink-0 text-sm font-semibold tabular-nums text-stone-900">
          {formatPrice(item.precio)}
        </span>
      </div>

      <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-500">
        {item.descripcion}
      </p>

      <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-xs">
        <span className={active ? "text-emerald-600" : "text-stone-400"}>
          {active ? "Disponible" : "No disponible"}
        </span>
        <Link
          href={`/items/${item.id}`}
          className="font-medium text-stone-900 underline-offset-4 transition-colors hover:underline"
        >
          Ver detalle
        </Link>
      </div>
    </article>
  );
}
