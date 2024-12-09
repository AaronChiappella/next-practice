// seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create multiple users
  const users = await prisma.user.createMany({
    data: [
      { email: 'user1@example.com', name: 'User One' },
      { email: 'user2@example.com', name: 'User Two' },
      { email: 'user3@example.com', name: 'User Three' },
      { email: 'user4@example.com', name: 'User Four' },
      { email: 'user5@example.com', name: 'User Five' },
      { email: 'user6@example.com', name: 'User Six' },
      { email: 'user7@example.com', name: 'User Seven' },
      { email: 'user8@example.com', name: 'User Eight' },
      { email: 'user9@example.com', name: 'User Nine' },
      { email: 'user10@example.com', name: 'User Ten' },
    ],
  });

  console.log('Users created:', users);

  // Create multiple posts and associate them with users
  const posts = await prisma.post.createMany({
    data: [
      { title: 'Post 1', content: 'Content for post 1', authorId: 1, published: true },
      { title: 'Post 2', content: 'Content for post 2', authorId: 1, published: false },
      { title: 'Post 3', content: 'Content for post 3', authorId: 2, published: true },
      { title: 'Post 4', content: 'Content for post 4', authorId: 3, published: true },
      { title: 'Post 5', content: 'Content for post 5', authorId: 3, published: false },
      { title: 'Post 6', content: 'Content for post 6', authorId: 4, published: true },
      { title: 'Post 7', content: 'Content for post 7', authorId: 5, published: false },
      { title: 'Post 8', content: 'Content for post 8', authorId: 6, published: true },
      { title: 'Post 9', content: 'Content for post 9', authorId: 7, published: true },
      { title: 'Post 10', content: 'Content for post 10', authorId: 8, published: false },
      { title: 'Post 11', content: 'Content for post 11', authorId: 9, published: true },
      { title: 'Post 12', content: 'Content for post 12', authorId: 10, published: false },
    ],
  });

  console.log('Posts created:', posts);
}

// Run the main function and handle any potential errors
main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  });
