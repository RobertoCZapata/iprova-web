import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import { CategoryBadge } from "@/components/blog/CategoryBadge";
import { BlogCard } from "@/components/blog/BlogCard";
import { Calendar, Clock, Eye, ArrowLeft, Mail, ThumbsUp, ThumbsDown } from "lucide-react";
import type { PublicBlogPostListItem } from "@/lib/types/blog";

interface PublicBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  author_name: string;
  author_email: string | null;
  category: string;
  reading_time: number;
  views: number;
  published_at: string;
  featured: boolean;
  meta_title: string | null;
  meta_description: string | null;
  tags: string[];
}

async function getBlogPost(slug: string): Promise<PublicBlogPost | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://iprova-web.vercel.app";
    const response = await fetch(`${baseUrl}/api/blog/public/${slug}`, {
      next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

async function getRelatedPosts(
  currentPostId: string,
  category: string
): Promise<PublicBlogPostListItem[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://iprova-web.vercel.app";
    const response = await fetch(
      `${baseUrl}/api/blog/public?category=${encodeURIComponent(category)}&limit=4`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      return [];
    }

    const posts: PublicBlogPostListItem[] = await response.json();
    // Filter out current post and limit to 3
    return posts.filter((p) => p.id !== currentPostId).slice(0, 3);
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post no encontrado | Blog iPROVA",
    };
  }

  return {
    title: post.meta_title || `${post.title} | Blog iPROVA`,
    description: post.meta_description || post.excerpt,
    keywords: post.tags,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.published_at).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Posts relacionados (misma categoría)
  const relatedPosts = await getRelatedPosts(post.id, post.category);

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
              <span>{post.reading_time} min lectura</span>
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
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">
              {post.author_name.charAt(0)}
            </span>
          </div>
          <div>
            <div className="font-bold text-lg">{post.author_name}</div>
            <div className="text-gray-600 text-sm">iPROVA</div>
          </div>
        </div>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="relative w-full h-96 rounded-lg overflow-hidden mb-12">
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <ReactMarkdown>{post.content}</ReactMarkdown>
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
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center mb-12">
          <p className="text-xl font-bold text-primary mb-2">
            ¿Te fue útil este artículo?
          </p>
          <p className="text-sm text-gray-600 mb-6">
            Tu opinión nos ayuda a mejorar el contenido
          </p>
          <div className="flex gap-3 justify-center">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary hover:text-white text-primary rounded-sm font-semibold transition-all duration-200 border-2 border-primary/20 hover:border-primary">
              <ThumbsUp size={20} />
              Sí, me fue útil
            </button>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-sm font-semibold transition-all duration-200 border-2 border-gray-200 hover:border-gray-300">
              <ThumbsDown size={20} />
              No me ayudó
            </button>
          </div>
        </div>

        {/* Author Card */}
        <div className="bg-white rounded-lg p-8 border border-gray-200 mb-12">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-4xl font-bold text-primary">
                {post.author_name.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-primary mb-2">
                Sobre el autor
              </h3>
              <p className="text-xl font-semibold mb-2">{post.author_name}</p>
              <p className="text-gray-600 mb-4">
                Abogado del equipo iPROVA con más de 20 años de experiencia en
                derecho penal, laboral y corporativo.
              </p>
              {post.author_email && (
                <a
                  href={`mailto:${post.author_email}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-sm font-semibold hover:bg-primary/90"
                >
                  <Mail size={16} />
                  Contactar
                </a>
              )}
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
