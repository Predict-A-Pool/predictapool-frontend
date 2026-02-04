import { getAccessToken } from "./auth";

export function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL;

  if (!url) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  return url;
}

export async function apiFetch<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const res = await fetch(`${getApiBaseUrl()}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
            ...(getAccessToken() ? { "Authorization": `Bearer ${getAccessToken()}` } : {})
        },
        cache: "no-store"
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.detail || "API error");
    }

    return res.json();
}