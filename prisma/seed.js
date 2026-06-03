const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  const books = [
    {
      title: 'The History of Mithila',
      author: 'Upendra Thakur',
      isbn: '978-0000000001',
      description: 'A comprehensive history of the Mithila region.',
      category: 'History',
      totalCount: 5,
      shelfLocation: 'A01-S01',
    },
    {
      title: 'Madhubani Art',
      author: 'Anand Krishna',
      isbn: '978-0000000002',
      description: 'Exploring the intricate patterns and cultural significance of Madhubani paintings.',
      category: 'Art & Culture',
      totalCount: 3,
      shelfLocation: 'A01-S02',
    },
    {
      title: 'Vidyapati: Songs of Love',
      author: 'Vidyapati',
      isbn: '978-0000000003',
      description: 'Collection of poems by the famous Maithili poet Vidyapati.',
      category: 'Literature',
      totalCount: 10,
      shelfLocation: 'A02-S01',
    },
    {
      title: 'Bihar General Knowledge',
      author: 'Dr. Manish Rannjan',
      isbn: '978-0000000004',
      description: 'Important general knowledge regarding Bihar state.',
      category: 'Reference',
      totalCount: 15,
      shelfLocation: 'A03-S04',
    }
  ];

  for (const book of books) {
    await prisma.book.create({
      data: book
    });
  }

  console.log('Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
