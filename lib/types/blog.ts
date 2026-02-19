/**
 * Tipos TypeScript para el Blog iPROVA
 */

// ============================================
// TIPOS LEGACY (para datos estáticos)
// ============================================

export interface Author {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  image: string;
  specialties: string[];
  email: string;
  linkedin?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  color: "red" | "blue" | "green" | "yellow";
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: Author;
  category: BlogCategory;
  tags: string[];
  publishedAt: string;
  readingTime: number; // minutos
  views?: number;
  featured?: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export interface NewsletterSubscriber {
  email: string;
  subscribedAt: string;
  status: "active" | "unsubscribed";
}

// ============================================
// TIPOS PARA BASE DE DATOS
// ============================================

export type BlogPostStatus = 'draft' | 'published' | 'archived';
export type BlogPostCategory = 'Derecho Penal' | 'Derecho Laboral' | 'Derecho Corporativo' | 'Investigación';

// Interfaz principal de blog_posts en BD
export interface BlogPostDB {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown
  featured_image: string | null;
  author_id: string;
  category: BlogPostCategory;
  status: BlogPostStatus;
  featured: boolean;
  reading_time: number | null;
  views: number;
  meta_title: string | null;
  meta_description: string | null;
  keywords: string[] | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

// BlogPost con relaciones (author + tags)
export interface BlogPostWithRelations extends BlogPostDB {
  author?: {
    id: string;
    name: string;
    email: string;
  };
  tags?: BlogPostTag[];
  author_name?: string; // Versión flatten
}

// Interfaz para tags de blog
export interface BlogPostTag {
  id: string;
  post_id: string;
  tag: string;
  created_at: string;
}

// Input para crear un nuevo post
export interface CreateBlogPostInput {
  title: string;
  excerpt: string;
  content: string;
  featured_image?: string | null;
  category: BlogPostCategory;
  status?: BlogPostStatus;
  featured?: boolean;
  meta_title?: string | null;
  meta_description?: string | null;
  keywords?: string[] | null;
  tags?: string[];
}

// Input para actualizar un post existente
export interface UpdateBlogPostInput {
  title?: string;
  excerpt?: string;
  content?: string;
  featured_image?: string | null;
  category?: BlogPostCategory;
  status?: BlogPostStatus;
  featured?: boolean;
  meta_title?: string | null;
  meta_description?: string | null;
  keywords?: string[] | null;
  tags?: string[];
}

// Respuesta pública de un post (sin campos internos)
export interface PublicBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  author_name: string;
  category: BlogPostCategory;
  reading_time: number;
  views: number;
  tags: string[];
  published_at: string;
  featured: boolean;
  meta_title: string | null;
  meta_description: string | null;
}

// Respuesta de lista pública (sin contenido completo)
export interface PublicBlogPostListItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string | null;
  author_name: string;
  category: BlogPostCategory;
  reading_time: number;
  views: number;
  published_at: string;
  featured: boolean;
}
