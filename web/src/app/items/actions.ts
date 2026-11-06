"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { ApiError, createItem, updateItem } from "@/lib/api";

export type ItemFormState = {
  message?: string;
  errors?: Record<string, string[]>;
};

export async function saveItemAction(
  _previousState: ItemFormState,
  formData: FormData,
): Promise<ItemFormState> {
  const id = String(formData.get("id") ?? "").trim();

  const payload = {
    nombre: String(formData.get("nombre") ?? "").trim(),
    descripcion: String(formData.get("descripcion") ?? "").trim(),
    precio: String(formData.get("precio") ?? "").trim(),
    categoria_id: Number(formData.get("categoria_id")),
    activo: formData.get("activo") === "on",
  };

  try {
    if (id) {
      await updateItem(id, payload);
    } else {
      await createItem(payload);
    }
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        message: error.message,
        errors: error.errors,
      };
    }

    return {
      message: "No se pudo guardar el platillo. Intenta de nuevo.",
    };
  }

  revalidatePath("/");
  revalidatePath("/items");

  if (id) {
    revalidatePath(`/items/${id}`);
  }

  redirect("/items");
}
