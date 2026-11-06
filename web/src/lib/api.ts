import type {
  Categoria,
  Item,
  ItemInput,
  Menu,
  Paginated,
  Resource,
} from "./types";

const API_URL = (
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://127.0.0.1:8000/api"
).replace(/\/+$/, "");

type ValidationErrors = Record<string, string[]>;

type ErrorPayload = {
  message?: string;
  errors?: ValidationErrors;
};

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly errors?: ValidationErrors,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    let payload: ErrorPayload | null = null;

    try {
      payload = (await response.json()) as ErrorPayload;
    } catch {
      // La respuesta de error no era JSON.
    }

    throw new ApiError(
      response.status,
      payload?.message ?? `La API respondió con estado ${response.status}.`,
      payload?.errors,
    );
  }

  return response.json() as Promise<T>;
}

export function getItems(page = 1): Promise<Paginated<Item>> {
  return request<Paginated<Item>>(`/items?page=${page}`);
}

export function getItem(id: string): Promise<Resource<Item>> {
  return request<Resource<Item>>(`/items/${id}`);
}

export function getMenus(page = 1): Promise<Paginated<Menu>> {
  return request<Paginated<Menu>>(`/menu-items?page=${page}`);
}

export function getCategorias(): Promise<Resource<Categoria[]>> {
  return request<Resource<Categoria[]>>("/categorias");
}

export function createItem(payload: ItemInput): Promise<Resource<Item>> {
  return request<Resource<Item>>("/items", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateItem(
  id: string,
  payload: ItemInput,
): Promise<Resource<Item>> {
  return request<Resource<Item>>(`/items/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}
