import React from 'react';
import { getUsers } from '@/app/lib/data';

export default async function UserTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const users = await getUsers(query, currentPage);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">User Table</h2>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full border border-gray-200 text-left">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="px-4 py-3 border">ID</th>
                            <th className="px-4 py-3 border">Email</th>
                            <th className="px-4 py-3 border">Name</th>
                            <th className="px-4 py-3 border">Posts Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={user.id}
                                className={`${
                                    index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                                } hover:bg-blue-50`}
                            >
                                <td className="px-4 py-2 border">{user.id}</td>
                                <td className="px-4 py-2 border">{user.email}</td>
                                <td className="px-4 py-2 border">{user.name || 'N/A'}</td>
                                <td className="px-4 py-2 border">{user.postsCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
