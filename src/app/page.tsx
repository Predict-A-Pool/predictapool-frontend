import Image from "next/image";
import { graphqlFetch } from "@/lib/graphql";

type HealthQuery = {
  health: {
    status: string;
  };
}

export default async function Home() {
  const data = await graphqlFetch<HealthQuery>(`
    query {
      health {
        status
      }
    }
  `);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="text-xl">
          Backend status: <strong>{data.health.status}</strong>
        </div>
      </main>
    </div>
  );
}
