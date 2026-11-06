import Link from "next/link";
import { notFound } from "next/navigation";

import { ItemForm } from "@/components/item-form";
import { PageHeader } from "@/components/page-header";
import { ApiError, getCategorias, getItem } from "@/lib/api";
import type { Categoria, Item } from "@/lib/types";

export const metadata = {
  title: "Editar platillo",
};

export default async function EditItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let item: Item;
  let categorias: Categoria[];

  try {
    [item, categorias] = await Promise.all([
      getItem(id).then((response) => response.data),
      getCategorias().then((response) => response.data),
    ]);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-14 sm:py-16">
      <Link
        href={`/items/${item.id}`}
        className="text-xs font-medium text-stone-500 underline-offset-4 transition-colors hover:text-stone-900 hover:underline"
      >
        ← Volver al detalle
      </Link>

      <div className="mt-6">
        <PageHeader
          eyebrow="Carta"
          title="Editar platillo"
          description={`Actualiza los datos de ${item.nombre}.`}
        />
      </div>

      <ItemForm categorias={categorias} item={item} />
    </div>
  );
}
