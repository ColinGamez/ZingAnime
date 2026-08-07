const { PrismaClient } = require('@prisma/client');
const { searchAnime, getTopAnime } = require('../src/lib/jikan');

const prisma = new PrismaClient();

async function updateWithRealData() {
  console.log('Fetching real anime data from Jikan API...');

  try {
    // Get top anime from 2000s era
    const topAnime = await getTopAnime(20);
    
    console.log(`Found ${topAnime.length} anime from Jikan API`);

    for (const anime of topAnime) {
      // Check if content already exists by MAL ID
      const existing = await prisma.content.findFirst({
        where: { malId: anime.mal_id }
      });

      if (existing) {
        console.log(`Skipping ${anime.title} - already exists`);
        continue;
      }

      // Create new content with real data
      const content = await prisma.content.create({
        data: {
          title: anime.title,
          titleAlt: anime.title_english,
          description: anime.synopsis,
          type: 'ANIME',
          year: anime.year || 2000,
          rating: anime.score || 8.0,
          posterUrl: anime.images.jpg.large_image_url,
          backdropUrl: anime.images.jpg.image_url,
          status: anime.status === 'Finished Airing' ? 'Completed' : 'Ongoing',
          studio: anime.source,
          malId: anime.mal_id,
        },
      });

      console.log(`Created: ${anime.title}`);

      // Add genres
      for (const genre of anime.genres) {
        const existingGenre = await prisma.genre.findFirst({
          where: { name: genre.name }
        });

        let genreId;
        if (existingGenre) {
          genreId = existingGenre.id;
        } else {
          const newGenre = await prisma.genre.create({
            data: {
              name: genre.name,
              slug: genre.name.toLowerCase().replace(/\s+/g, '-'),
            }
          });
          genreId = newGenre.id;
        }

        await prisma.contentGenre.create({
          data: {
            contentId: content.id,
            genreId: genreId,
          }
        });
      }

      // Add some sample episodes
      const episodeCount = anime.episodes || 12;
      for (let i = 1; i <= Math.min(episodeCount, 3); i++) {
        await prisma.episode.create({
          data: {
            contentId: content.id,
            episodeNumber: i,
            title: `Episode ${i}`,
            duration: 24,
          }
        });
      }
    }

    console.log('Successfully updated database with real anime data!');
  } catch (error) {
    console.error('Error updating with real data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateWithRealData();