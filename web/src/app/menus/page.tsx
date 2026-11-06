import { ApiError } from "@/components/api-error";
import { MenuCard } from "@/components/menu-card";
import { PageHeader } from "@/components/page-header";
import { Pagination } from "@/components/pagination";
import { getMenus } from "@/lib/api";
import type { Menu, Paginated } from "@/lib/types";

export const metadata = {
  title: "Menús",
};

export default async function MenusPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  let result: Paginated<Menu>;

  try {
    result = await getMenus(page);
  } catch {
    return (
      <div className="mx-auto max-w-6xl px-5 py-14 sm:py-16">
        <PageHeader
          eyebrow="Selección de la casa"
          title="Menús"
          description="Los menús disponibles por sucursal."
        />
        <div className="mt-10">
          <ApiError />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:py-16">
      <PageHeader
        eyebrow="Selección de la casa"
        title="Menús"
        description={`${result.total} menús disponibles por sucursal.`}
      />

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {result.data.map((menu) => (
          <MenuCard key={menu.id} menu={menu} />
        ))}
      </div>

      {result.data.length === 0 ? (
        <p className="mt-10 text-sm text-stone-400">
          No hay menús disponibles en este momento.
        </p>
      ) : null}

      <Pagination
        currentPage={result.current_page}
        lastPage={result.last_page}
        basePath="/menus"
      />
    </div>
  );
}
