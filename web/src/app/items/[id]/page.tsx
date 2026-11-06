import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryPill } from "@/components/category-pill";
import { ApiError, getItem } from "@/lib/api";
import { formatPrice } from "@/lib/format";
import type { Item } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const item = (await getItem(id)).data;

    return {
      title: item.nombre,
      description: item.descripcion,
    };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    return { title: "Platillo" };
  }
}

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let item: Item;

  try {
    item = (await getItem(id)).data;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }

  const menus = item.menus ?? [];

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/items"
          className="text-xs font-medium text-stone-500 underline-offset-4 transition-colors hover:text-stone-900 hover:underline"
        >
          ← Volver a platillos
        </Link>
        <Link
          href={`/items/${item.id}/edit`}
          className="rounded-full bg-stone-900 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-stone-700"
        >
          Editar platillo
        </Link>
      </div>

      <article className="mt-8 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <CategoryPill>
              {item.categoria?.nombre ?? "Sin categoría"}
            </CategoryPill>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900">
              {item.nombre}
            </h1>
          </div>
          <span className="text-2xl font-semibold tabular-nums tracking-tight text-stone-900">
            {formatPrice(item.precio)}
          </span>
        </div>

        <p className="mt-5 text-sm leading-7 text-stone-600">
          {item.descripcion}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-stone-100 pt-6 text-xs text-stone-500">
          <span className={item.activo ? "text-emerald-600" : "text-stone-400"}>
            {item.activo ? "Disponible" : "No disponible"}
          </span>
          <span aria-hidden>·</span>
          <span>
            {menus.length} {menus.length === 1 ? "menú incluye" : "menús incluyen"}{" "}
            este platillo
          </span>
        </div>
      </article>

      {menus.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-sm font-medium text-stone-900">Disponible en</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {menus.map((menu) => (
              <li
                key={menu.id}
                className="rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-600"
              >
                {menu.nombre}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
