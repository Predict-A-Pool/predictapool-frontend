export type SignupPayload = {
    email: string;
    password: string;
}

export type UserPublic = {
    id: string;
    email: string;
    is_active: boolean;
    is_verified: boolean;
}

async function authFetch<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const res = await fetch(path, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
        cache: "no-store"
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.detail || "API error");
    }

    return res.json();
}

export async function signup(payload: SignupPayload): Promise<UserPublic> {
    return authFetch<UserPublic>("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(payload)
    });
}

export type LoginPayload = {
    email: string;
    password: string;
}

export type LoginResponse = {
    access_token: string;
    token_type: string;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
    return authFetch<LoginResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(payload)
    });
}

export async function getMe(): Promise<UserPublic> {
    const accessToken = getAccessToken();

    return authFetch<UserPublic>("/api/auth/me", {
        headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : undefined
    });
}

export function setAccessToken(token: string) {
    localStorage.setItem("access_token", token);
}

export function getAccessToken(): string | null {
    return localStorage.getItem("access_token");
}

export function clearAccessToken() {
    localStorage.removeItem("access_token");
}
