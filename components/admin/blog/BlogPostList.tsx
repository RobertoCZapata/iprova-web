"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Edit, Trash2, Eye, CheckCircle2, XCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { BlogPostWithRelations } from "@/lib/types/blog";

interface BlogPostListProps {
  initialPosts?: BlogPostWithRelations[];
}

export function BlogPostList({ initialPosts = [] }: BlogPostListProps) {
  const [posts, setPosts] = useState<BlogPostWithRelations[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: "all",
    category: "all",
    search: "",
  });

  useEffect(() => {
    fetchPosts();
  }, [filters]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      if (filters.status !== "all") {
        params.append("status", filters.status);
      }

      if (filters.category !== "all") {
        params.append("category", filters.category);
      }

      if (filters.search) {
        params.append("search", filters.search);
      }

      const response = await fetch(`/api/blog?${params.toString()}`);

      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (
      !confirm(
        `¿Estás seguro de que deseas eliminar el artículo "${title}"? Esta acción no se puede deshacer.`
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Artículo eliminado exitosamente");
        fetchPosts();
      } else {
        toast.error("Error al eliminar artículo");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Error al eliminar artículo");
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      draft: (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
          Borrador
        </span>
      ),
      published: (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
          Publicado
        </span>
      ),
      archived: (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
          Archivado
        </span>
      ),
    };

    return badges[status as keyof typeof badges] || badges.draft;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";

    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <input
              type="text"
              placeholder="Buscar por título..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Status filter */}
          <div>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">Todos los estados</option>
              <option value="draft">Borradores</option>
              <option value="published">Publicados</option>
              <option value="archived">Archivados</option>
            </select>
          </div>

          {/* Category filter */}
          <div>
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">Todas las categorías</option>
              <option value="Derecho Penal">Derecho Penal</option>
              <option value="Derecho Laboral">Derecho Laboral</option>
              <option value="Derecho Corporativo">Derecho Corporativo</option>
              <option value="Investigación">Investigación</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando artículos...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-600">No se encontraron artículos</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Autor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vistas
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {post.featured && (
                          <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {post.title}
                          </p>
                          <p className="text-xs text-gray-500">{post.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {post.author_name || "Desconocido"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {post.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(post.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatDate(post.published_at || post.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {post.views.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex justify-end gap-2">
                        {/* View public */}
                        {post.status === "published" && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="p-1 text-gray-600 hover:text-primary hover:bg-gray-100 rounded transition-colors"
                            title="Ver artículo público"
                          >
                            <Eye size={16} />
                          </Link>
                        )}

                        {/* Edit */}
                        <Link
                          href={`/admin/blog/${post.id}`}
                          className="p-1 text-gray-600 hover:text-primary hover:bg-gray-100 rounded transition-colors"
                          title="Editar"
                        >
                          <Edit size={16} />
                        </Link>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="text-sm text-gray-600">
        Mostrando {posts.length} artículo{posts.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
