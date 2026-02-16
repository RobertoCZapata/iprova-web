import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase/server";

/**
 * API endpoint to create initial admin users
 * This should only be run once during initial setup
 *
 * POST /api/admin/setup-users
 * Body: { setupKey: string }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Simple protection - require a setup key
    // In production, you might want to disable this endpoint after first run
    if (body.setupKey !== process.env.NEXTAUTH_SECRET) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Define the initial admin users
    const adminUsers = [
      {
        email: "henry.zapata@iprova.com.co",
        name: "Henry Zapata",
        password: "iPROVA2024Henry!", // Change this to a secure password
        role: "admin",
      },
      {
        email: "javier.pedraza@iprova.com.co",
        name: "Javier Pedraza",
        password: "iPROVA2024Javier!", // Change this to a secure password
        role: "admin",
      },
      {
        email: "hernan.zapata@iprova.com.co",
        name: "Hernán Darío Zapata",
        password: "iPROVA2024Hernan!", // Change this to a secure password
        role: "admin",
      },
    ];

    const results = [];

    for (const user of adminUsers) {
      // Check if user already exists
      const { data: existingUser } = await supabaseAdmin
        .from("users")
        .select("id, email")
        .eq("email", user.email)
        .single();

      if (existingUser) {
        results.push({
          email: user.email,
          status: "skipped",
          message: "User already exists",
        });
        continue;
      }

      // Hash the password
      const passwordHash = await hash(user.password, 12);

      // Insert the user
      const { data: newUser, error } = await supabaseAdmin
        .from("users")
        .insert({
          email: user.email,
          name: user.name,
          password_hash: passwordHash,
          role: user.role,
        })
        .select()
        .single();

      if (error) {
        results.push({
          email: user.email,
          status: "error",
          message: error.message,
        });
      } else {
        results.push({
          email: user.email,
          status: "created",
          message: "User created successfully",
          userId: newUser.id,
        });
      }
    }

    return NextResponse.json({
      success: true,
      results,
    });
  } catch (error) {
    console.error("Error setting up users:", error);
    return NextResponse.json(
      { error: "Failed to setup users" },
      { status: 500 }
    );
  }
}
