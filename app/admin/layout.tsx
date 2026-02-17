"use client";

import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Users,
  FolderOpen,
  BarChart3,
  LogOut,
} from "lucide-react";
import { LogoiProva } from "@/components/ui/LogoiProva";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Casos", href: "/admin/casos", icon: Briefcase },
    { name: "Clientes", href: "/admin/clientes", icon: Users },
    { name: "Documentos", href: "/admin/documentos", icon: FolderOpen },
    { name: "Artículos", href: "/admin/blog", icon: FileText },
    { name: "Reportes", href: "/admin/reportes", icon: BarChart3 },
  ];

  const isActivePath = (href: string) => {
    if (href === "/admin") {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A1628] text-white flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link href="/admin" className="block">
            <LogoiProva
              width={180}
              height={60}
              className="w-full brightness-0 invert"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            NAVEGACIÓN
          </p>
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActivePath(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  active
                    ? "bg-primary text-white shadow-lg"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={20} className={active ? "text-white" : "text-gray-400"} />
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header Global */}
        <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-end px-8 sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm">
              {session?.user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-900">{session?.user?.name}</p>
              <p className="text-xs text-gray-500">{session?.user?.email}</p>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-green-50 border border-green-200 rounded">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-xs font-medium text-green-700">Conectado</span>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="ml-2 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:text-red-600 hover:bg-red-50 border border-gray-300 rounded transition-colors flex items-center gap-1.5"
              title="Cerrar sesión"
            >
              <LogOut size={14} />
              Cerrar Sesión
            </button>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
