import { BlogCategory } from "@/lib/types/blog";

const colorClasses = {
  red: "bg-red-100 text-red-700 border-red-200",
  blue: "bg-blue-100 text-blue-700 border-blue-200",
  green: "bg-green-100 text-green-700 border-green-200",
  yellow: "bg-yellow-100 text-yellow-700 border-yellow-200",
  purple: "bg-purple-100 text-purple-700 border-purple-200",
};

/**
 * Mapa de categorías de string a color
 */
const categoryColorMap: Record<string, "red" | "blue" | "green" | "yellow" | "purple"> = {
  "Derecho Penal": "red",
  "Derecho Laboral": "blue",
  "Derecho Corporativo": "green",
  "Investigación": "yellow",
  // Fallback para otras categorías
};

/**
 * Convierte un string de categoría a objeto BlogCategory
 */
function normalizeCategory(category: string | BlogCategory): BlogCategory {
  if (typeof category === "string") {
    const color = categoryColorMap[category] || "purple";
    return {
      id: category.toLowerCase().replace(/\s+/g, "-"),
      name: category,
      slug: category.toLowerCase().replace(/\s+/g, "-"),
      color,
      description: "",
    };
  }
  return category;
}

export function CategoryBadge({ category }: { category: string | BlogCategory }) {
  const normalizedCategory = normalizeCategory(category);

  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm border ${
        colorClasses[normalizedCategory.color]
      }`}
    >
      {normalizedCategory.name}
    </span>
  );
}
