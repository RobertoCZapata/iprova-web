"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, HelpCircle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = (await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })) as { error?: string; ok: boolean; status: number; url?: string | null } | undefined;

      if (result?.error) {
        toast.error("Email o contraseña incorrectos");
        return;
      }

      // Mostrar mensaje de éxito y navegar
      // NextAuth ya actualizó la sesión en este punto
      toast.success("¡Bienvenido! Iniciando sesión...");

      // Pequeño delay para asegurar que la sesión se sincronizó
      await new Promise(resolve => setTimeout(resolve, 100));

      // Navegar al admin
      router.push("/admin");
      router.refresh();
    } catch (error) {
      toast.error("Error al iniciar sesión. Intenta nuevamente.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      {/* Left Side: Brand Panel */}
      <div
        className="relative lg:w-1/2 w-full flex flex-col justify-center items-center overflow-hidden"
        style={{
          backgroundImage: `url('/images/logo-login.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-[#00184A]/30"></div>
      </div>

      {/* Right Side: Login Panel */}
      <div className="lg:w-1/2 w-full bg-white flex flex-col px-6 lg:px-24 py-16">
        {/* Back to Home Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#8E9093] hover:text-[#00184A] font-semibold mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Volver al inicio
        </Link>

        <div className="w-full max-w-md mx-auto flex-1 flex flex-col justify-center">
          {/* Portal Header */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold leading-tight text-[#00184A] mb-3">Portal Administrativo</h2>
            <div className="h-1 w-16 bg-primary mx-auto rounded-full mb-3"></div>
            <p className="text-[#8E9093] text-base font-medium">Seguridad y Confianza en cada proceso.</p>
          </div>

          {/* Welcome Section */}
          <div className="mb-10">
            <h3 className="text-[#00184A] text-3xl font-extrabold mb-2">Bienvenido de nuevo</h3>
            <p className="text-[#8E9093] text-base">Por favor, ingrese sus credenciales para acceder al portal.</p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#00184A] uppercase tracking-wider" htmlFor="email">
                Correo Electrónico
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#8E9093] group-focus-within:text-[#00184A]">
                  <Mail size={20} />
                </div>
                <input
                  {...register("email")}
                  className={`block w-full pl-11 pr-4 py-4 bg-gray-50 border rounded-lg text-[#00184A] placeholder:text-gray-400 focus:ring-1 focus:ring-[#00184A] focus:border-[#00184A] transition-all ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  }`}
                  id="email"
                  placeholder="ejemplo@iprova.com"
                  type="email"
                  autoComplete="email"
                  disabled={isSubmitting}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 font-medium">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-[#00184A] uppercase tracking-wider" htmlFor="password">
                  Contraseña
                </label>
                <a className="text-sm font-semibold text-[#8E9093] hover:text-[#00184A] transition-colors" href="#">
                  ¿Olvidó su contraseña?
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#8E9093] group-focus-within:text-[#00184A]">
                  <Lock size={20} />
                </div>
                <input
                  {...register("password")}
                  className={`block w-full pl-11 pr-12 py-4 bg-gray-50 border rounded-lg text-[#00184A] placeholder:text-gray-400 focus:ring-1 focus:ring-[#00184A] focus:border-[#00184A] transition-all ${
                    errors.password ? "border-red-500" : "border-gray-200"
                  }`}
                  id="password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  disabled={isSubmitting}
                />
                <button
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#8E9093] hover:text-[#00184A] disabled:opacity-50 disabled:cursor-not-allowed"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 font-medium">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                {...register("rememberMe")}
                className="w-4 h-4 text-[#00184A] border-gray-300 rounded focus:ring-[#00184A] disabled:opacity-50 disabled:cursor-not-allowed"
                id="remember"
                type="checkbox"
                disabled={isSubmitting}
              />
              <label className="ml-2 block text-sm text-[#8E9093]" htmlFor="remember">
                Recordar sesión
              </label>
            </div>

            {/* Submit Button */}
            <button
              className="w-full bg-[#00184A] hover:bg-[#00184A]/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-[#00184A]/20 transition-all transform active:scale-[0.98] uppercase tracking-widest text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Iniciando Sesión..." : "Iniciar Sesión"}
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Footer Support */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#8E9093] text-sm">¿Necesita asistencia técnica?</p>
            <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary/10 text-primary font-semibold text-sm tracking-wide hover:bg-primary/20 transition-all duration-200 hover:scale-105">
              <HelpCircle size={18} />
              <span>Contactar Soporte</span>
            </button>
          </div>

          {/* Copyright */}
          <div className="mt-8 text-center">
            <p className="text-[#8E9093] text-sm font-medium">© 2026 iPROVA. Abogados e Investigadores.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
