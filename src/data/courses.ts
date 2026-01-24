export const coursesKey = {
  all: ["courses"] as const,
  detail: (id: string) => [...coursesKey.all, id] as const,
};

export async function fetchUsers() {
  const res = await fetch("/api/users", { next: { tags: ["users"] } });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function fetchUser(id: string) {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error("Failed");
  return res.json();
}
