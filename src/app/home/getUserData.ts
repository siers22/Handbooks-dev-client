"use server";

import { cookies } from "next/headers";

export async function getUserData() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("session")?.value; // изменено на 'session'

  if (!authCookie) {
    console.log("No session cookie found");
    return null;
  }

  const response = await fetch("http://localhost:3001/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: authCookie,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.log("Error response:", errorText);
    throw new Error("Failed to fetch user data");
  }

  const data = await response.json();

  return data;
}
