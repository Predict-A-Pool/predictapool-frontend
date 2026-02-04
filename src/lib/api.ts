import { getAccessToken } from "./auth";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

export async function apiFetch<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        },
        cache: "no-store"
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.detail || "API error");
    }

    return res.json();
}