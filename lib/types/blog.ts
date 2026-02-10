/**
 * Tipos TypeScript para el Blog iPROVA
 */

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
