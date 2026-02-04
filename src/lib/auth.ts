import { apiFetch } from "./api";

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

export async function signup(payload: SignupPayload): Promise<UserPublic> {
    return apiFetch<UserPublic>("/auth/signup", {
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
    return apiFetch<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload)
    });
}

export async function getMe(): Promise<UserPublic> {
    return apiFetch<UserPublic>("/auth/me");
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