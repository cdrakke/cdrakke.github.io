import { useState, useLayoutEffect, type RefObject } from "react";

export function useGridColumns(
  ref: RefObject<HTMLDivElement | null>
): number {
  const [columns, setColumns] = useState(1);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const style = getComputedStyle(el).gridTemplateColumns;
      const count = style.split(" ").filter(Boolean).length;
      setColumns(count || 1);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);

    return () => observer.disconnect();
  }, [ref]);

  return columns;
}
