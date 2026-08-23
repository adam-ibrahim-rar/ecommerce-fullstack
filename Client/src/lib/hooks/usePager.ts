import { useMemo, useState } from "react";

/**
 * Slices a list into fixed-size pages and exposes prev/next controls.
 * Used to drive the arrow buttons (Swapers) on the home sections.
 */
export function usePager<T>(items: T[] | undefined, pageSize: number) {
  const [page, setPage] = useState(0);

  const safeItems = items ?? [];
  const pageCount = Math.max(1, Math.ceil(safeItems.length / pageSize));

  // لو الداتا اتغيرت وبقى الصفحة الحالية خارج النطاق، رجّعها لآخر صفحة متاحة
  const currentPage = Math.min(page, pageCount - 1);

  const pageItems = useMemo(
    () => safeItems.slice(currentPage * pageSize, currentPage * pageSize + pageSize),
    [safeItems, currentPage, pageSize],
  );

  const canPrev = currentPage > 0;
  const canNext = currentPage < pageCount - 1;

  return {
    pageItems,
    canPrev,
    canNext,
    prev: () => setPage((p) => Math.max(0, p - 1)),
    next: () => setPage((p) => Math.min(pageCount - 1, p + 1)),
  };
}
