import Link from "next/link";

import { ItemCard } from "@/components/item-card";
import { MenuCard } from "@/components/menu-card";
import { SectionHeading } from "@/components/section-heading";
import { getItems, getMenus } from "@/lib/api";
import type { Item, Menu, Paginated } from "@/lib/types";

export default async function Home() {
  let items: Paginated<Item> | null = null;
  let menus: Paginated<Menu> | null = null;

  try {
    [items, menus] = await Promise.all([getItems(1), getMenus(1)]);
  } catch {
    // La portada se muestra igualmente si la API no está disponible.
  }

  const categoryCount = items
    ? new Set(items.data.map((item) => item.categoria_id)).size
    : null;

  return (
    <div className="mx-auto max-w-6xl px-5">
      <section className="py-16 sm:py-24">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-stone-400">
          Cocina honesta · API REST
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-stone-900 sm:text-6xl">
          La Buena Mesa
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
          Una selección sencilla de menús y platillos, servida por una API
          Laravel y presentada con Next.js.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/menus"
            className="rounded-full bg-stone-900 px-5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-stone-700"
          >
            Ver menús
          </Link>
          <Link
            href="/items"
            className="rounded-full border border-stone-300 bg-white px-5 py-2.5 text-xs font-medium text-stone-700 transition-colors hover:border-stone-400"
          >
            Explorar platillos
          </Link>
        </div>

        <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-stone-200 pt-6">
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-stone-400">
              Platillos
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums text-stone-900">
              {items?.total ?? "—"}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-stone-400">
              Menús
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums text-stone-900">
              {menus?.total ?? "—"}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-stone-400">
              Categorías
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums text-stone-900">
              {categoryCount ?? "—"}
            </dd>
          </div>
        </dl>
      </section>

      {!items || !menus ? (
        <div className="mb-14 rounded-2xl border border-dashed border-stone-300 bg-white p-6 text-sm text-stone-500">
          La API no está disponible en este momento. Inicia el backend y recarga
          la página.
        </div>
      ) : null}

      <section className="border-t border-stone-200 py-14">
        <SectionHeading
          eyebrow="Selección de la casa"
          title="Menús"
          href="/menus"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {menus?.data.length ? (
            menus.data
              .slice(0, 3)
              .map((menu) => <MenuCard key={menu.id} menu={menu} />)
          ) : (
            <p className="text-sm text-stone-400">No hay menús disponibles.</p>
          )}
        </div>
      </section>

      <section className="border-t border-stone-200 py-14">
        <SectionHeading eyebrow="Para compartir" title="Platillos" href="/items" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items?.data.length ? (
            items.data
              .slice(0, 6)
              .map((item) => <ItemCard key={item.id} item={item} />)
          ) : (
            <p className="text-sm text-stone-400">
              No hay platillos disponibles.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
