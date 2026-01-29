// actions/user.ts
"use server";

import { cookies } from "next/headers";

export async function getUserAction() {
  const cookie = await cookies();
  const authCookie = cookie.get("session")?.value;

  const response = await fetch("http://localhost:3001/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: authCookie || "",
    },
  });

  const data = await response.json();
  return data.data;
}
