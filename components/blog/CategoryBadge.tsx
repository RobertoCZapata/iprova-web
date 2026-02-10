import { BlogCategory } from "@/lib/types/blog";

const colorClasses = {
  red: "bg-red-100 text-red-700 border-red-200",
  blue: "bg-blue-100 text-blue-700 border-red-200",
  green: "bg-green-100 text-green-700 border-green-200",
  yellow: "bg-yellow-100 text-yellow-700 border-yellow-200",
};

export function CategoryBadge({ category }: { category: BlogCategory }) {
  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm border ${
        colorClasses[category.color]
      }`}
    >
      {category.name}
    </span>
  );
}
