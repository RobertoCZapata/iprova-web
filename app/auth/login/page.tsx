import { LoginForm } from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sesión | iPROVA",
  description: "Panel de administración iPROVA - Acceso para administradores",
};

export default function LoginPage() {
  return <LoginForm />;
}
