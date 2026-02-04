type GraphQLResponse<T> = {
    data?: T;
    errors?: { message: string }[];
}

function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_GRAPHQL_URL;

  if (!url) {
    throw new Error("NEXT_PUBLIC_GRAPHQL_URL is not defined");
  }

  return url;
}

export async function graphqlFetch<T>(
    query: string,
    variables?: Record<string, unknown>
): Promise<T> {
    const res = await fetch(getApiBaseUrl(), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
            variables
        }),
        cache: "no-store"
    });

    const json: GraphQLResponse<T> = await res.json();

    if (json.errors && json.errors.length > 0) {
        throw new Error(json.errors.map(e => e.message).join(", "));
    }

    if (!json.data) {
        throw new Error("No data returned from GraphQL API");
    }

    return json.data;
}