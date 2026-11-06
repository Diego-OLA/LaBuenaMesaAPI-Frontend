import Link from "next/link";

import { ApiError } from "@/components/api-error";
import { ItemForm } from "@/components/item-form";
import { PageHeader } from "@/components/page-header";
import { getCategorias } from "@/lib/api";
import type { Categoria } from "@/lib/types";

export const metadata = {
  title: "Nuevo platillo",
};

export default async function NewItemPage() {
  let categorias: Categoria[];

  try {
    categorias = (await getCategorias()).data;
  } catch {
    return (
      <div className="mx-auto max-w-2xl px-5 py-14 sm:py-16">
        <PageHeader
          eyebrow="Carta"
          title="Nuevo platillo"
          description="Registra un platillo para la carta."
        />
        <div className="mt-10">
          <ApiError />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-14 sm:py-16">
      <Link
        href="/items"
        className="text-xs font-medium text-stone-500 underline-offset-4 transition-colors hover:text-stone-900 hover:underline"
      >
        ← Volver a platillos
      </Link>

      <div className="mt-6">
        <PageHeader
          eyebrow="Carta"
          title="Nuevo platillo"
          description="Completa los datos para agregarlo a la carta."
        />
      </div>

      <ItemForm categorias={categorias} />
    </div>
  );
}
