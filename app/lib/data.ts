import { sql } from '@vercel/postgres';

const ITEMS_PER_PAGE = 6;

export async function getUsers(query: string, currentPage: number) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const data = await sql`
        SELECT 
            "User".id,
            "User".email,
            "User".name,
            COUNT("Post".id) AS "postsCount"
        FROM "User"
        LEFT JOIN "Post" ON "Post"."authorId" = "User".id
        WHERE "User".email ILIKE ${'%' + query + '%'}
        GROUP BY "User".id, "User".email, "User".name
        ORDER BY "User".id
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;

        return data.rows;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch users');
    }
}


export async function getUsersPages(query: string) {
    try {
        const count = await sql`
        SELECT COUNT("id") 
        FROM "User"
        WHERE "email" ILIKE ${'%' + query + '%'}
        `;

        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch users count pages');
    }
}


