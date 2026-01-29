"use server";

import "server-only";
import { cookies } from "next/headers";

export async function createSession(token: string, expires_in: number) {
  const expiresAt = new Date(Date.now() + expires_in);
  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // ← вот это ключевой фикс
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}
