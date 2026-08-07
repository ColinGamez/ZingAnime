import { PrismaClient, ContentType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create genres
  const genres = await Promise.all([
    prisma.genre.upsert({
      where: { slug: 'action' },
      update: {},
      create: { name: 'Action', slug: 'action' },
    }),
    prisma.genre.upsert({
      where: { slug: 'adventure' },
      update: {},
      create: { name: 'Adventure', slug: 'adventure' },
    }),
    prisma.genre.upsert({
      where: { slug: 'comedy' },
      update: {},
      create: { name: 'Comedy', slug: 'comedy' },
    }),
    prisma.genre.upsert({
      where: { slug: 'drama' },
      update: {},
      create: { name: 'Drama', slug: 'drama' },
    }),
    prisma.genre.upsert({
      where: { slug: 'fantasy' },
      update: {},
      create: { name: 'Fantasy', slug: 'fantasy' },
    }),
    prisma.genre.upsert({
      where: { slug: 'horror' },
      update: {},
      create: { name: 'Horror', slug: 'horror' },
    }),
    prisma.genre.upsert({
      where: { slug: 'mecha' },
      update: {},
      create: { name: 'Mecha', slug: 'mecha' },
    }),
    prisma.genre.upsert({
      where: { slug: 'romance' },
      update: {},
      create: { name: 'Romance', slug: 'romance' },
    }),
    prisma.genre.upsert({
      where: { slug: 'sci-fi' },
      update: {},
      create: { name: 'Sci-Fi', slug: 'sci-fi' },
    }),
    prisma.genre.upsert({
      where: { slug: 'slice-of-life' },
      update: {},
      create: { name: 'Slice of Life', slug: 'slice-of-life' },
    }),
    prisma.genre.upsert({
      where: { slug: 'thriller' },
      update: {},
      create: { name: 'Thriller', slug: 'thriller' },
    }),
  ]);

  console.log('Genres created');

  // Create sample content (Anime)
  const evangelion = await prisma.content.upsert({
    where: { id: 'anime-1' },
    update: {},
    create: {
      id: 'anime-1',
      title: 'Neon Genesis Evangelion',
      titleAlt: 'Shin Seiki Evangelion',
      description: 'In the year 2015, the world stands on the brink of destruction. Humanity\'s last hope lies in the hands of NERV, a special agency under the United Nations, and their gigantic bio-mechanical mecha called "Evangelions".',
      type: ContentType.ANIME,
      year: 1995,
      rating: 8.5,
      status: 'Completed',
      studio: 'Gainax',
      network: 'TV Tokyo',
    },
  });

  const cowboyBebop = await prisma.content.upsert({
    where: { id: 'anime-2' },
    update: {},
    create: {
      id: 'anime-2',
      title: 'Cowboy Bebop',
      titleAlt: 'Kaubōi Bibappu',
      description: 'Follow the adventures of Spike Spiegel and his crew as they travel through the galaxy, hunting down bounties and confronting their pasts.',
      type: ContentType.ANIME,
      year: 1998,
      rating: 8.9,
      status: 'Completed',
      studio: 'Sunrise',
      network: 'TV Tokyo',
    },
  });

  const fma = await prisma.content.upsert({
    where: { id: 'anime-3' },
    update: {},
    create: {
      id: 'anime-3',
      title: 'Fullmetal Alchemist: Brotherhood',
      titleAlt: 'Hagane no Renkinjutsushi',
      description: 'Two brothers search for the Philosopher\'s Stone after an attempt to revive their dead mother goes wrong.',
      type: ContentType.ANIME,
      year: 2009,
      rating: 9.0,
      status: 'Completed',
      studio: 'Bones',
      network: 'MBS',
    },
  });

  const deathNote = await prisma.content.upsert({
    where: { id: 'anime-4' },
    update: {},
    create: {
      id: 'anime-4',
      title: 'Death Note',
      titleAlt: 'Desu Nōto',
      description: 'A high school student discovers a supernatural notebook that allows him to kill anyone by writing their name in it.',
      type: ContentType.ANIME,
      year: 2006,
      rating: 8.6,
      status: 'Completed',
      studio: 'Madhouse',
      network: 'NNS',
    },
  });

  const attackOnTitan = await prisma.content.upsert({
    where: { id: 'anime-5' },
    update: {},
    create: {
      id: 'anime-5',
      title: 'Attack on Titan',
      titleAlt: 'Shingeki no Kyojin',
      description: 'Humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures.',
      type: ContentType.ANIME,
      year: 2013,
      rating: 8.5,
      status: 'Completed',
      studio: 'Wit Studio',
      network: 'MBS',
    },
  });

  // Create K-Drama
  const goblin = await prisma.content.upsert({
    where: { id: 'kdrama-1' },
    update: {},
    create: {
      id: 'kdrama-1',
      title: 'Goblin',
      titleAlt: 'Guardian: The Lonely and Great God',
      description: 'A 939-year-old goblin seeks to end his immortal life by finding a human bride who can remove the sword stuck in his chest.',
      type: ContentType.KDRAMA,
      year: 2016,
      rating: 8.8,
      status: 'Completed',
      studio: 'Studio Dragon',
      network: 'tvN',
    },
  });

  // Create J-Drama
  const hanaYoriDango = await prisma.content.upsert({
    where: { id: 'jdrama-1' },
    update: {},
    create: {
      id: 'jdrama-1',
      title: 'Hana Yori Dango',
      titleAlt: 'Boys Over Flowers',
      description: 'A poor girl attends an elite school and becomes entangled with the wealthy and popular F4 group.',
      type: ContentType.JDRAMA,
      year: 2005,
      rating: 8.2,
      status: 'Completed',
      studio: 'TBS',
      network: 'TBS',
    },
  });

  // Create C-Drama
  const untamed = await prisma.content.upsert({
    where: { id: 'cdrama-1' },
    update: {},
    create: {
      id: 'cdrama-1',
      title: 'The Untamed',
      titleAlt: 'Chen Qing Ling',
      description: 'Two cultivators embark on a journey to solve a series of mysteries in the cultivation world.',
      type: ContentType.CDRAMA,
      year: 2019,
      rating: 8.7,
      status: 'Completed',
      studio: 'Tencent Pictures',
      network: 'Tencent',
    },
  });

  // Connect genres to content
  await prisma.contentGenre.createMany({
    data: [
      { contentId: evangelion.id, genreId: genres[6].id }, // Mecha
      { contentId: evangelion.id, genreId: genres[3].id }, // Drama
      { contentId: cowboyBebop.id, genreId: genres[8].id }, // Sci-Fi
      { contentId: cowboyBebop.id, genreId: genres[0].id }, // Action
      { contentId: fma.id, genreId: genres[0].id }, // Action
      { contentId: fma.id, genreId: genres[4].id }, // Fantasy
      { contentId: deathNote.id, genreId: genres[5].id }, // Horror
      { contentId: deathNote.id, genreId: genres[10].id }, // Thriller
      { contentId: attackOnTitan.id, genreId: genres[0].id }, // Action
      { contentId: attackOnTitan.id, genreId: genres[5].id }, // Horror
      { contentId: goblin.id, genreId: genres[3].id }, // Drama
      { contentId: goblin.id, genreId: genres[7].id }, // Romance
      { contentId: hanaYoriDango.id, genreId: genres[3].id }, // Drama
      { contentId: hanaYoriDango.id, genreId: genres[7].id }, // Romance
      { contentId: untamed.id, genreId: genres[4].id }, // Fantasy
      { contentId: untamed.id, genreId: genres[3].id }, // Drama
    ],
    skipDuplicates: true,
  });

  console.log('Content and genres connected');

  // Create sample episodes
  await prisma.episode.createMany({
    data: [
      { contentId: evangelion.id, episodeNumber: 1, title: 'Angel Attack', duration: 24 },
      { contentId: evangelion.id, episodeNumber: 2, title: 'The Beast', duration: 24 },
      { contentId: cowboyBebop.id, episodeNumber: 1, title: 'Asteroid Blues', duration: 24 },
      { contentId: cowboyBebop.id, episodeNumber: 2, title: 'Stray Dog Strut', duration: 24 },
      { contentId: fma.id, episodeNumber: 1, title: 'Fullmetal Alchemist', duration: 24 },
      { contentId: deathNote.id, episodeNumber: 1, title: 'Rebirth', duration: 23 },
      { contentId: attackOnTitan.id, episodeNumber: 1, title: 'To You, in 2000 Years', duration: 24 },
      { contentId: goblin.id, episodeNumber: 1, title: 'Episode 1', duration: 60 },
      { contentId: hanaYoriDango.id, episodeNumber: 1, title: 'Episode 1', duration: 45 },
      { contentId: untamed.id, episodeNumber: 1, title: 'Episode 1', duration: 45 },
    ],
    skipDuplicates: true,
  });

  console.log('Episodes created');

  // Create sample user
  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'demo@zinganime.com' },
    update: {},
    create: {
      email: 'demo@zinganime.com',
      name: 'Demo User',
      password: hashedPassword,
    },
  });

  console.log('User created');

  // Create sample blog posts
  await prisma.blogPost.createMany({
    data: [
      {
        title: 'Top 10 Hidden Gems from the 2000s',
        slug: 'top-10-hidden-gems-2000s',
        excerpt: 'Discover overlooked anime classics that deserve more attention from the golden era of anime.',
        content: 'Full article content here...',
        author: 'AnimeFan2024',
        category: 'Recommendations',
        published: true,
        publishedAt: new Date('2024-01-15'),
      },
      {
        title: 'The Evolution of Mecha Anime: From Gundam to Evangelion',
        slug: 'evolution-mecha-anime',
        excerpt: 'A deep dive into how mecha anime has evolved over the decades and shaped the industry.',
        content: 'Full article content here...',
        author: 'MechaExpert',
        category: 'Analysis',
        published: true,
        publishedAt: new Date('2024-01-10'),
      },
      {
        title: 'Why Underground Anime is Making a Comeback',
        slug: 'underground-anime-comeback',
        excerpt: 'Exploring the resurgence of experimental and independent anime in the modern landscape.',
        content: 'Full article content here...',
        author: 'IndieAnimeLover',
        category: 'Culture',
        published: true,
        publishedAt: new Date('2024-01-01'),
      },
    ],
    skipDuplicates: true,
  });

  console.log('Blog posts created');

  console.log('Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });