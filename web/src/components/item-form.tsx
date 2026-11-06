"use client";

import Link from "next/link";
import { useActionState } from "react";

import { saveItemAction, type ItemFormState } from "@/app/items/actions";
import type { Categoria, Item } from "@/lib/types";

const initialState: ItemFormState = {};

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 outline-none transition-colors placeholder:text-stone-400 focus:border-stone-500 focus:ring-2 focus:ring-stone-200";

function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) {
    return null;
  }

  return <p className="mt-1.5 text-xs text-red-600">{messages[0]}</p>;
}

export function ItemForm({
  categorias,
  item,
}: {
  categorias: Categoria[];
  item?: Item;
}) {
  const [state, formAction, pending] = useActionState(
    saveItemAction,
    initialState,
  );
  const errors = state.errors ?? {};

  return (
    <form
      action={formAction}
      className="mt-8 rounded-3xl border border-stone-200 bg-white p-6 sm:p-8"
    >
      {item ? <input type="hidden" name="id" value={item.id} /> : null}

      {state.message ? (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {state.message}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="nombre"
            className="text-xs font-medium text-stone-700"
          >
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            maxLength={100}
            defaultValue={item?.nombre ?? ""}
            placeholder="Ej. Tacos al pastor"
            className={fieldClass}
          />
          <FieldError messages={errors.nombre} />
        </div>

        <div>
          <label
            htmlFor="categoria_id"
            className="text-xs font-medium text-stone-700"
          >
            Categoría
          </label>
          <select
            id="categoria_id"
            name="categoria_id"
            required
            defaultValue={item?.categoria_id ?? categorias[0]?.id ?? ""}
            className={fieldClass}
          >
            <option value="" disabled>
              Selecciona una categoría
            </option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
          <FieldError messages={errors.categoria_id} />
        </div>

        <div>
          <label
            htmlFor="precio"
            className="text-xs font-medium text-stone-700"
          >
            Precio
          </label>
          <input
            id="precio"
            name="precio"
            type="number"
            required
            min="0"
            step="0.01"
            inputMode="decimal"
            defaultValue={item ? String(item.precio) : ""}
            placeholder="0.00"
            className={fieldClass}
          />
          <FieldError messages={errors.precio} />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="descripcion"
            className="text-xs font-medium text-stone-700"
          >
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            required
            maxLength={200}
            rows={3}
            defaultValue={item?.descripcion ?? ""}
            placeholder="Ingredientes o notas del platillo"
            className={`${fieldClass} resize-none`}
          />
          <FieldError messages={errors.descripcion} />
        </div>

        <label className="flex items-center gap-3 sm:col-span-2">
          <input
            type="checkbox"
            name="activo"
            defaultChecked={item ? Boolean(item.activo) : true}
            className="size-4 rounded border-stone-300 accent-stone-900"
          />
          <span className="text-sm text-stone-600">
            Disponible en el menú
          </span>
        </label>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-stone-100 pt-6">
        <Link
          href="/items"
          className="rounded-full border border-stone-300 bg-white px-5 py-2.5 text-xs font-medium text-stone-700 transition-colors hover:border-stone-400"
        >
          Cancelar
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-stone-900 px-5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending
            ? "Guardando…"
            : item
              ? "Guardar cambios"
              : "Crear platillo"}
        </button>
      </div>
    </form>
  );
}
