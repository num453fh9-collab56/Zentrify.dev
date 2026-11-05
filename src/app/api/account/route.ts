import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
}

function getAnonClient(accessToken: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  const client = createClient(url, anonKey, {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return client;
}

export async function PATCH(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const accessToken = authHeader.slice(7);

    const body = await req.json();
    const { action } = body;

    if (action === "update-profile") {
      const { fullName } = body;
      if (typeof fullName !== "string" || fullName.trim().length === 0) {
        return Response.json({ error: "Name is required" }, { status: 400 });
      }
      const client = getAnonClient(accessToken);
      if (!client) return Response.json({ error: "Service unavailable" }, { status: 503 });

      const { data, error } = await client.auth.updateUser({
        data: { full_name: fullName.trim() },
      });
      if (error) return Response.json({ error: error.message }, { status: 400 });
      return Response.json({ user: data.user });
    }

    if (action === "change-password") {
      const { newPassword } = body;
      if (typeof newPassword !== "string" || newPassword.length < 6) {
        return Response.json({ error: "Password must be at least 6 characters" }, { status: 400 });
      }
      const client = getAnonClient(accessToken);
      if (!client) return Response.json({ error: "Service unavailable" }, { status: 503 });

      const { error } = await client.auth.updateUser({ password: newPassword });
      if (error) return Response.json({ error: error.message }, { status: 400 });
      return Response.json({ success: true });
    }

    if (action === "delete-account") {
      const admin = getAdminClient();
      if (!admin) return Response.json({ error: "Service unavailable" }, { status: 503 });

      const client = getAnonClient(accessToken);
      if (!client) return Response.json({ error: "Service unavailable" }, { status: 503 });
      const { data: { user } } = await client.auth.getUser();
      if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

      const { error } = await admin.auth.admin.deleteUser(user.id);
      if (error) return Response.json({ error: error.message }, { status: 400 });
      return Response.json({ success: true });
    }

    return Response.json({ error: "Invalid action" }, { status: 400 });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
