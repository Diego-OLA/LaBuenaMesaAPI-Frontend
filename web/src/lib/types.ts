export type Categoria = {
  id: number;
  nombre: string;
};

export type Sucursal = {
  id: number;
  nombre: string;
};

export type MenuSummary = {
  id: number;
  nombre: string;
  sucursal_id: number;
};

export type Item = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string | number;
  activo: boolean | number;
  categoria_id: number;
  categoria?: Categoria;
  menus?: MenuSummary[];
};

export type Menu = {
  id: number;
  nombre: string;
  sucursal_id: number;
  sucursal?: Sucursal;
  items?: Item[];
};

export type Paginated<T> = {
  current_page: number;
  data: T[];
  last_page: number;
  per_page: number;
  total: number;
};

export type Resource<T> = {
  message: string;
  data: T;
};

export type ItemInput = {
  nombre: string;
  descripcion: string;
  precio: string;
  categoria_id: number;
  activo: boolean;
};
