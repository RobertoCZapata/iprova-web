import type { Metadata } from "next";
import { blogCategories } from "@/lib/data/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { BookOpen } from "lucide-react";
import type { PublicBlogPostListItem } from "@/lib/types/blog";

export const metadata: Metadata = {
  title: "Blog | iPROVA - Conocimiento Legal y Estratégico",
  description:
    "Artículos sobre derecho penal, laboral, investigación privada y más. Conocimiento legal práctico de expertos con más de 20 años de experiencia.",
};

async function getBlogPosts(): Promise<PublicBlogPostListItem[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://iprova-web.vercel.app";
    console.log("[Blog] Fetching posts from:", `${baseUrl}/api/blog/public`);

    const response = await fetch(`${baseUrl}/api/blog/public`, {
      next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
      cache: 'no-store', // Temporalmente deshabilitar cache para debug
    });

    if (!response.ok) {
      console.error("[Blog] Error fetching blog posts, status:", response.status);
      const text = await response.text();
      console.error("[Blog] Response:", text);
      return [];
    }

    const posts = await response.json();
    console.log("[Blog] Posts fetched:", posts.length);
    return posts;
  } catch (error) {
    console.error("[Blog] Error fetching blog posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const featuredPosts = posts.filter((p) => p.featured);
  const regularPosts = posts.filter((p) => !p.featured);

  const categories = [
    { id: "penal", name: "Derecho Penal" },
    { id: "laboral", name: "Derecho Laboral" },
    { id: "corporativo", name: "Derecho Corporativo" },
    { id: "investigacion", name: "Investigación" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-primary text-white py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-sm mb-6">
              <BookOpen size={20} />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Blog iPROVA
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Conocimiento Legal y Estratégico
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Artículos prácticos sobre derecho penal, laboral, corporativo e
              investigación. Escritos por expertos con más de 20 años de
              experiencia.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-3 justify-center">
            <button className="px-4 py-2 bg-primary text-white rounded-sm font-semibold text-sm">
              Todos
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-sm font-semibold text-sm transition-colors"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <span className="text-red-500">🔥</span> Posts Destacados
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} featured />
            ))}
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-primary mb-6">
          Últimos Artículos
        </h2>

        {regularPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">
              No hay artículos publicados en este momento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Recibe Artículos Legales en tu Email
          </h2>
          <p className="text-white/90 mb-8">
            Suscríbete y recibe análisis legal, casos prácticos y consejos
            estratégicos cada semana.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-4 py-3 rounded-sm text-gray-900"
              required
            />
            <button
              type="submit"
              className="bg-white text-primary px-6 py-3 rounded-sm font-semibold hover:bg-gray-100 transition-colors"
            >
              Suscribirse
            </button>
          </form>
          <p className="text-xs text-white/70 mt-4">
            Sin spam. Cancela cuando quieras.
          </p>
        </div>
      </section>
    </div>
  );
}
