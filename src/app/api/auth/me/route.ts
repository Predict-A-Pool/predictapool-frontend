import { NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/api";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  const upstreamResponse = await fetch(`${getApiBaseUrl()}/auth/me`, {
    method: "GET",
    headers: authHeader ? { Authorization: authHeader } : {},
    cache: "no-store",
  });

  const responseText = await upstreamResponse.text();

  return new NextResponse(responseText, {
    status: upstreamResponse.status,
    headers: {
      "Content-Type":
        upstreamResponse.headers.get("content-type") ?? "application/json",
    },
  });
}
