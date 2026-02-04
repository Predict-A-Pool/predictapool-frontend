"use client";

import { useState } from "react";
import { login } from "@/lib/auth";
import { setAccessToken } from "@/lib/auth";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: React.SubmitEvent) {
        event.preventDefault();
        setError(null);

        try {
            const response = await login({ email, password });
            setAccessToken(response.access_token);
            alert("Login successful!");
            // Redirect or update UI after successful login
        } catch (err: any) {
            setError(err.message || "Login failed");
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex w-full max-w-md flex-col items-center justify-between py-16 px-8 bg-white dark:bg-black rounded-lg shadow-md">
                <h1 className="text-2xl mb-6">Login</h1>
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    {error && <div className="mb-4 text-red-500">{error}</div>}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Login
                    </button>
                </form>
            </main>
        </div>
    );
}