import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/types/blog";
import { CategoryBadge } from "./CategoryBadge";
import { Calendar, Clock, Eye } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article
      className={`group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-primary/30 flex flex-col h-full ${
        featured ? "md:col-span-2 md:flex-row" : ""
      }`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden bg-gray-200 ${
          featured ? "md:w-1/2" : "h-64"
        }`}
      >
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {post.featured && (
          <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm">
            Destacado
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`p-6 flex flex-col flex-1 ${featured ? "md:w-1/2" : ""}`}>
        {/* Category */}
        <div className="mb-3">
          <CategoryBadge category={post.category} />
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h3
            className={`font-bold text-primary mb-3 group-hover:text-primary/80 transition-colors ${
              featured ? "text-2xl md:text-3xl" : "text-xl"
            }`}
          >
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3 flex-1">{post.excerpt}</p>

        {/* Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-4">
            {/* Author */}
            <div className="flex items-center gap-2">
              <Image
                src={post.author.image}
                alt={post.author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="font-medium">{post.author.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Reading time */}
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{post.readingTime} min</span>
            </div>
            {/* Views */}
            {post.views && (
              <div className="flex items-center gap-1">
                <Eye size={14} />
                <span>{post.views.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
