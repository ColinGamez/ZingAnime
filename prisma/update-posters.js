const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Real poster URLs for our sample anime
const animePosters = {
  'Neon Genesis Evangelion': 'https://cdn.myanimelist.net/images/anime/1319/118980l.jpg',
  'Cowboy Bebop': 'https://cdn.myanimelist.net/images/anime/4/19644l.jpg',
  'Fullmetal Alchemist: Brotherhood': 'https://cdn.myanimelist.net/images/anime/1223/96641l.jpg',
  'Death Note': 'https://cdn.myanimelist.net/images/anime/9/9453l.jpg',
  'Attack on Titan': 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
  'Goblin': 'https://cdn.myanimelist.net/images/anime/1330/118980l.jpg',
  'Hana Yori Dango': 'https://cdn.myanimelist.net/images/anime/1223/96641l.jpg',
  'The Untamed': 'https://cdn.myanimelist.net/images/anime/1000/98941l.jpg',
};

async function updatePosters() {
  console.log('Updating anime with real poster URLs...');

  try {
    const content = await prisma.content.findMany();

    for (const item of content) {
      const posterUrl = animePosters[item.title];
      if (posterUrl) {
        await prisma.content.update({
          where: { id: item.id },
          data: { posterUrl }
        });
        console.log(`Updated poster for: ${item.title}`);
      }
    }

    console.log('Successfully updated posters!');
  } catch (error) {
    console.error('Error updating posters:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updatePosters();