import { Root_Movies_DB } from "@/app/layout";
export async function GET() {
    const data = await Root_Movies_DB(`
        SELECT poster_url, movie_id, title, created_at FROM movie ORDER BY created_at DESC LIMIT 20 OFFSET 0
    `);
    return Response.json(data)
}