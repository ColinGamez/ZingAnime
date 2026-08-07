const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

// Content type constants
const ContentType = {
  ANIME: 'ANIME',
  KANIME: 'KANIME',
  CANIME: 'CANIME',
  JDRAMA: 'JDRAMA',
  CDRAMA: 'CDRAMA',
  KDRAMA: 'KDRAMA',
};

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

  const descendantsOfTheSun = await prisma.content.upsert({
    where: { id: 'kdrama-2' },
    update: {},
    create: {
      id: 'kdrama-2',
      title: 'Descendants of the Sun',
      titleAlt: 'Taeyang-ui Huujae',
      description: 'A love story between a captain of a special forces team and a surgeon who fall in love while on a mission in war-torn country.',
      type: ContentType.KDRAMA,
      year: 2016,
      rating: 8.9,
      status: 'Completed',
      studio: 'KBS',
      network: 'KBS2',
    },
  });

  const crashLandingOnYou = await prisma.content.upsert({
    where: { id: 'kdrama-3' },
    update: {},
    create: {
      id: 'kdrama-3',
      title: 'Crash Landing on You',
      titleAlt: 'Saenggwagoi Chak-hang',
      description: 'A successful entrepreneur crash-lands in North Korea and falls in love with a North Korean army officer.',
      type: ContentType.KDRAMA,
      year: 2019,
      rating: 8.7,
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

  const itaewonClass = await prisma.content.upsert({
    where: { id: 'jdrama-2' },
    update: {},
    create: {
      id: 'jdrama-2',
      title: 'Itaewon Class',
      titleAlt: 'Itaewon Keurasseu',
      description: 'An ex-convict opens a bar in Itaewon and seeks revenge on the family responsible for his imprisonment.',
      type: ContentType.JDRAMA,
      year: 2020,
      rating: 8.5,
      status: 'Completed',
      studio: 'JTBC',
      network: 'JTBC',
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
  const genreConnections = [
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
    { contentId: descendantsOfTheSun.id, genreId: genres[3].id }, // Drama
    { contentId: descendantsOfTheSun.id, genreId: genres[7].id }, // Romance
    { contentId: crashLandingOnYou.id, genreId: genres[3].id }, // Drama
    { contentId: crashLandingOnYou.id, genreId: genres[7].id }, // Romance
    { contentId: hanaYoriDango.id, genreId: genres[3].id }, // Drama
    { contentId: hanaYoriDango.id, genreId: genres[7].id }, // Romance
    { contentId: itaewonClass.id, genreId: genres[3].id }, // Drama
    { contentId: itaewonClass.id, genreId: genres[10].id }, // Thriller
    { contentId: untamed.id, genreId: genres[4].id }, // Fantasy
    { contentId: untamed.id, genreId: genres[3].id }, // Drama
  ];

  for (const connection of genreConnections) {
    try {
      await prisma.contentGenre.create({
        data: connection,
      });
    } catch (error) {
      // Ignore duplicate errors
      if (!error.message.includes('Unique constraint')) {
        throw error;
      }
    }
  }

  console.log('Content and genres connected');

  // Create sample episodes
  const episodes = [
    { contentId: evangelion.id, episodeNumber: 1, title: 'Angel Attack', duration: 24 },
    { contentId: evangelion.id, episodeNumber: 2, title: 'The Beast', duration: 24 },
    { contentId: cowboyBebop.id, episodeNumber: 1, title: 'Asteroid Blues', duration: 24 },
    { contentId: cowboyBebop.id, episodeNumber: 2, title: 'Stray Dog Strut', duration: 24 },
    { contentId: fma.id, episodeNumber: 1, title: 'Fullmetal Alchemist', duration: 24 },
    { contentId: deathNote.id, episodeNumber: 1, title: 'Rebirth', duration: 23 },
    { contentId: attackOnTitan.id, episodeNumber: 1, title: 'To You, in 2000 Years', duration: 24 },
    { contentId: goblin.id, episodeNumber: 1, title: 'Episode 1', duration: 60 },
    { contentId: descendantsOfTheSun.id, episodeNumber: 1, title: 'Episode 1', duration: 60 },
    { contentId: crashLandingOnYou.id, episodeNumber: 1, title: 'Episode 1', duration: 60 },
    { contentId: hanaYoriDango.id, episodeNumber: 1, title: 'Episode 1', duration: 45 },
    { contentId: itaewonClass.id, episodeNumber: 1, title: 'Episode 1', duration: 60 },
    { contentId: untamed.id, episodeNumber: 1, title: 'Episode 1', duration: 45 },
  ];

  for (const episode of episodes) {
    try {
      await prisma.episode.create({
        data: episode,
      });
    } catch (error) {
      // Ignore duplicate errors
      if (!error.message.includes('Unique constraint')) {
        throw error;
      }
    }
  }

  console.log('Episodes created');

  // Get created episodes for video sources
  const evangelionEp1 = await prisma.episode.findFirst({
    where: { contentId: evangelion.id, episodeNumber: 1 },
  });
  const cowboyBebopEp1 = await prisma.episode.findFirst({
    where: { contentId: cowboyBebop.id, episodeNumber: 1 },
  });
  const fmaEp1 = await prisma.episode.findFirst({
    where: { contentId: fma.id, episodeNumber: 1 },
  });
  const deathNoteEp1 = await prisma.episode.findFirst({
    where: { contentId: deathNote.id, episodeNumber: 1 },
  });
  const attackOnTitanEp1 = await prisma.episode.findFirst({
    where: { contentId: attackOnTitan.id, episodeNumber: 1 },
  });
  const goblinEp1 = await prisma.episode.findFirst({
    where: { contentId: goblin.id, episodeNumber: 1 },
  });
  const descendantsOfTheSunEp1 = await prisma.episode.findFirst({
    where: { contentId: descendantsOfTheSun.id, episodeNumber: 1 },
  });
  const crashLandingOnYouEp1 = await prisma.episode.findFirst({
    where: { contentId: crashLandingOnYou.id, episodeNumber: 1 },
  });
  const hanaYoriDangoEp1 = await prisma.episode.findFirst({
    where: { contentId: hanaYoriDango.id, episodeNumber: 1 },
  });
  const itaewonClassEp1 = await prisma.episode.findFirst({
    where: { contentId: itaewonClass.id, episodeNumber: 1 },
  });
  const untamedEp1 = await prisma.episode.findFirst({
    where: { contentId: untamed.id, episodeNumber: 1 },
  });

  console.log('Retrieved episodes for video sources');

  // Create sample video sources
  const videoSources = [
    // Evangelion episodes - Multiple sources for backup
    { contentId: evangelion.id, episodeId: evangelionEp1?.id, sourceType: 'youtube', sourceUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', language: 'sub', quality: '480p', isActive: true, priority: 3 },
    { contentId: evangelion.id, episodeId: null, sourceType: 'embed', sourceUrl: 'https://example.com/embed/evangelion-1', language: 'sub', quality: '720p', isActive: true, priority: 2 },
    { contentId: evangelion.id, episodeId: null, sourceType: 'dailymotion', sourceUrl: 'https://www.dailymotion.com/video/x8example', language: 'sub', quality: '1080p', isActive: true, priority: 1 },
    // Cowboy Bebop episodes
    { contentId: cowboyBebop.id, episodeId: cowboyBebopEp1?.id, sourceType: 'youtube', sourceUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', language: 'sub', quality: '480p', isActive: true, priority: 2 },
    { contentId: cowboyBebop.id, episodeId: null, sourceType: 'vimeo', sourceUrl: 'https://vimeo.com/example', language: 'sub', quality: '720p', isActive: true, priority: 1 },
    // FMA episodes
    { contentId: fma.id, episodeId: fmaEp1?.id, sourceType: 'youtube', sourceUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', language: 'sub', quality: '480p', isActive: true, priority: 2 },
    { contentId: fma.id, episodeId: null, sourceType: 'gdrive', sourceUrl: 'https://drive.google.com/file/d/example', language: 'sub', quality: '1080p', isActive: true, priority: 1 },
    // Death Note episodes
    { contentId: deathNote.id, episodeId: deathNoteEp1?.id, sourceType: 'youtube', sourceUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', language: 'sub', quality: '480p', isActive: true, priority: 1 },
    // Attack on Titan episodes
    { contentId: attackOnTitan.id, episodeId: attackOnTitanEp1?.id, sourceType: 'youtube', sourceUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', language: 'sub', quality: '480p', isActive: true, priority: 2 },
    { contentId: attackOnTitan.id, episodeId: null, sourceType: 'embed', sourceUrl: 'https://example.com/embed/aot-1', language: 'sub', quality: '720p', isActive: true, priority: 1 },
    // K-Drama episodes
    { contentId: goblin.id, episodeId: goblinEp1?.id, sourceType: 'embed', sourceUrl: 'https://example.com/embed/goblin-1', language: 'sub', quality: '720p', isActive: true, priority: 1 },
    { contentId: descendantsOfTheSun.id, episodeId: descendantsOfTheSunEp1?.id, sourceType: 'embed', sourceUrl: 'https://example.com/embed/dots-1', language: 'sub', quality: '720p', isActive: true, priority: 1 },
    { contentId: crashLandingOnYou.id, episodeId: crashLandingOnYouEp1?.id, sourceType: 'embed', sourceUrl: 'https://example.com/embed/cloy-1', language: 'sub', quality: '720p', isActive: true, priority: 1 },
    // J-Drama episodes
    { contentId: hanaYoriDango.id, episodeId: hanaYoriDangoEp1?.id, sourceType: 'embed', sourceUrl: 'https://example.com/embed/hana-yori-dango-1', language: 'sub', quality: '720p', isActive: true, priority: 1 },
    { contentId: itaewonClass.id, episodeId: itaewonClassEp1?.id, sourceType: 'embed', sourceUrl: 'https://example.com/embed/itaewon-class-1', language: 'sub', quality: '720p', isActive: true, priority: 1 },
    // C-Drama episodes
    { contentId: untamed.id, episodeId: untamedEp1?.id, sourceType: 'embed', sourceUrl: 'https://example.com/embed/untamed-1', language: 'sub', quality: '720p', isActive: true, priority: 1 },
  ];

  for (const source of videoSources) {
    try {
      await prisma.videoSource.create({
        data: source,
      });
    } catch (error) {
      // Ignore duplicate errors
      if (!error.message.includes('Unique constraint')) {
        throw error;
      }
    }
  }

  console.log('Video sources created');

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
  const blogPosts = [
    {
      title: 'Top 10 Hidden Gem Anime from the 2000s You Missed',
      slug: 'hidden-gems-2000s',
      excerpt: 'From cult classics to underground masterpieces, discover the overlooked anime that defined the golden era but never got the mainstream recognition they deserved.',
      content: 'Full article content here...',
      author: 'AnimeHunter',
      category: 'Recommendations',
      published: true,
      publishedAt: new Date('2024-01-15'),
    },
    {
      title: 'Why 2000s Anime Was the Golden Era',
      slug: 'golden-era-2000s',
      excerpt: 'The 2000s produced some of the most influential and beloved anime of all time. From Neon Genesis Evangelion to Fullmetal Alchemist, explore what made this decade so special.',
      content: 'Full article content here...',
      author: 'RetroAnimeFan',
      category: 'Analysis',
      published: true,
      publishedAt: new Date('2024-01-10'),
    },
    {
      title: 'Underground Anime: Where to Find the Weirdest Stuff',
      slug: 'underground-anime-guide',
      excerpt: 'Beyond the mainstream hits lies a world of experimental, avant-garde, and just plain weird anime. Here\'s your guide to the underground scene.',
      content: 'Full article content here...',
      author: 'CultClassicCollector',
      category: 'Guides',
      published: true,
      publishedAt: new Date('2024-01-05'),
    },
    {
      title: 'K-Drama vs J-Drama: What\'s the Difference?',
      slug: 'kdrama-vs-jdrama',
      excerpt: 'Both Asian dramas have their unique charm. From storytelling styles to production values, here\'s everything you need to know about choosing between K-dramas and J-dramas.',
      content: 'Full article content here...',
      author: 'DramaExpert',
      category: 'Comparison',
      published: true,
      publishedAt: new Date('2024-01-01'),
    },
    {
      title: 'The Rise of Chinese Anime (Donghua)',
      slug: 'rise-of-donghua',
      excerpt: 'Chinese animation has exploded in quality and popularity. From traditional tales to modern sci-fi, discover the best donghua you should be watching.',
      content: 'Full article content here...',
      author: 'AsianMediaWatcher',
      category: 'Industry',
      published: true,
      publishedAt: new Date('2023-12-28'),
    },
    {
      title: 'Mecha Anime: More Than Just Giant Robots',
      slug: 'mecha-anime-deep-dive',
      excerpt: 'From Gundam to Evangelion, mecha anime has explored profound themes about war, humanity, and technology. Here\'s why the genre is deeper than you think.',
      content: 'Full article content here...',
      author: 'MechaEnthusiast',
      category: 'Analysis',
      published: true,
      publishedAt: new Date('2023-12-20'),
    },
    {
      title: 'Asian Drama Culture: More Than Just Romance',
      slug: 'asian-drama-culture',
      excerpt: 'From historical epics to modern rom-coms, Asian dramas offer a unique window into different cultures. Explore the cultural significance and global impact.',
      content: 'Full article content here...',
      author: 'CultureExplorer',
      category: 'Culture',
      published: true,
      publishedAt: new Date('2023-12-15'),
    },
  ];

  for (const post of blogPosts) {
    try {
      await prisma.blogPost.create({
        data: post,
      });
    } catch (error) {
      // Ignore duplicate errors
      if (!error.message.includes('Unique constraint')) {
        throw error;
      }
    }
  }

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