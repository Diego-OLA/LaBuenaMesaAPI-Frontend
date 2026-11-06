import { formatPrice } from "@/lib/format";
import type { Menu } from "@/lib/types";

export function MenuCard({ menu }: { menu: Menu }) {
  const items = menu.items ?? [];

  return (
    <article className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-stone-400">
            {menu.sucursal?.nombre ?? "Sucursal"}
          </p>
          <h3 className="mt-2 text-[15px] font-medium tracking-tight text-stone-900">
            {menu.nombre}
          </h3>
        </div>
        <span className="shrink-0 rounded-full border border-stone-200 px-2.5 py-1 text-[11px] text-stone-500">
          {items.length} platillos
        </span>
      </div>

      {items.length > 0 ? (
        <details className="group mt-5">
          <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-medium text-stone-600 [&::-webkit-details-marker]:hidden">
            Ver platillos
            <span className="transition-transform group-open:rotate-180">↓</span>
          </summary>
          <ul className="mt-4 space-y-2.5 border-t border-stone-100 pt-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-start justify-between gap-3 text-sm"
              >
                <span className="text-stone-600">{item.nombre}</span>
                <span className="shrink-0 text-xs tabular-nums text-stone-400">
                  {formatPrice(item.precio)}
                </span>
              </li>
            ))}
          </ul>
        </details>
      ) : (
        <p className="mt-5 text-sm text-stone-400">
          Este menú aún no tiene platillos.
        </p>
      )}
    </article>
  );
}
