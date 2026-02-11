import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/data/blog";
import { CategoryBadge } from "@/components/blog/CategoryBadge";
import { BlogCard } from "@/components/blog/BlogCard";
import { Calendar, Clock, Eye, ArrowLeft, Mail, Linkedin } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post no encontrado | Blog iPROVA",
    };
  }

  return {
    title: post.seo?.metaTitle || `${post.title} | Blog iPROVA`,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.keywords || post.tags,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Posts relacionados (mismo autor o categoría)
  const relatedPosts = getAllBlogPosts()
    .filter(
      (p) =>
        p.id !== post.id &&
        (p.author.id === post.author.id || p.category.id === post.category.id)
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back button */}
      <div className="bg-white border-b border-gray-200 mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold"
          >
            <ArrowLeft size={20} />
            Volver al blog
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category & Meta */}
        <div className="mb-6 flex flex-wrap items-center gap-4 text-sm">
          <CategoryBadge category={post.category} />
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{post.readingTime} min lectura</span>
            </div>
            {post.views && (
              <div className="flex items-center gap-1">
                <Eye size={16} />
                <span>{post.views.toLocaleString()} vistas</span>
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-8 leading-tight">
          {post.title}
        </h1>

        {/* Author info */}
        <div className="flex items-center gap-4 pb-8 border-b border-gray-200 mb-8">
          <Image
            src={post.author.image}
            alt={post.author.name}
            width={64}
            height={64}
            className="rounded-full"
          />
          <div>
            <div className="font-bold text-lg">{post.author.name}</div>
            <div className="text-gray-600 text-sm">{post.author.role}</div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-96 rounded-lg overflow-hidden mb-12">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12">
          {/* Aquí se renderizaría el contenido markdown con un renderer */}
          <div className="whitespace-pre-wrap">{post.content}</div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-sm"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Feedback */}
        <div className="bg-gray-100 rounded-lg p-6 text-center mb-12">
          <p className="text-lg font-semibold text-gray-900 mb-4">
            ¿Te fue útil este artículo?
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-sm font-semibold">
              👍 Sí (234)
            </button>
            <button className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-sm font-semibold">
              👎 No (12)
            </button>
          </div>
        </div>

        {/* Author Card */}
        <div className="bg-white rounded-lg p-8 border border-gray-200 mb-12">
          <div className="flex items-start gap-6">
            <Image
              src={post.author.image}
              alt={post.author.name}
              width={120}
              height={120}
              className="rounded-full"
            />
            <div>
              <h3 className="text-2xl font-bold text-primary mb-2">
                Sobre el autor
              </h3>
              <p className="text-xl font-semibold mb-2">{post.author.name}</p>
              <p className="text-gray-600 mb-4">{post.author.bio}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.author.specialties.map((spec) => (
                  <span
                    key={spec}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-sm"
                  >
                    {spec}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <a
                  href={`mailto:${post.author.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-sm font-semibold hover:bg-primary/90"
                >
                  <Mail size={16} />
                  Contactar
                </a>
                {post.author.linkedin && (
                  <a
                    href={post.author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-sm font-semibold hover:bg-blue-700"
                  >
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Artículos Relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        )}

        {/* Comments (Giscus placeholder) */}
        <div className="bg-white rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-primary mb-6">Comentarios</h2>
          <div className="bg-gray-50 rounded p-6 text-center text-gray-600">
            <p className="mb-2">💬 Sistema de comentarios próximamente</p>
            <p className="text-sm">
              Integración con Giscus - Comentarios moderados
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
