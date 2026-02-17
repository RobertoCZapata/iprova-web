import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase/server";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Buscar usuario en Supabase
        const { data: user, error } = await supabaseAdmin
          .from("users")
          .select("*")
          .eq("email", credentials.email as string)
          .single();

        if (error || !user) {
          return null;
        }

        // Verificar contraseña
        const isPasswordValid = await compare(
          credentials.password as string,
          user.password_hash
        );

        if (!isPasswordValid) {
          return null;
        }

        // Retornar datos del usuario
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.avatar_url || null,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
