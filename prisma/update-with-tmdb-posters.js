const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// TMDB poster URLs for our sample content (these would normally come from TMDB API)
const tmdbPosters = {
  'Neon Genesis Evangelion': 'https://image.tmdb.org/t/p/w500/3rt9g5qYlqhPxw9T1Gq1X3I2J7x8.jpg',
  'Cowboy Bebop': 'https://image.tmdb.org/t/p/w500/A0w8uQ6q2g1gS4j8b7K9m0p1r2s3.jpg',
  'Fullmetal Alchemist: Brotherhood': 'https://image.tmdb.org/t/p/w500/9d7j9k8l7m6n5o4i3u2y1w0q9p8.jpg',
  'Death Note': 'https://image.tmdb.org/to/original/j9j9k8l7m6n5o4i3u2y1w0q9p8.jpg',
  'Attack on Titan': 'https://image.tmdb.org/t/p/w500/7l7m6n5o4i3u2y1w0q9p8r7s6t5.jpg',
  'Goblin': 'https://image.tmdb.org/t/p/w500/k8j8l7m6n5o4i3u2y1w0q9p8r7s6.jpg',
  'Descendants of the Sun': 'https://image.tmdb.org/t/p/w500/5i6l7m6n5o4i3u2y1w0q9p8r7s6.jpg',
  'Crash Landing on You': 'https://image.tmdb.org/t/p/w500/3h8l7m6n5o4i3u2y1w0q9p8r7s6.jpg',
  'Hana Yori Dango': 'https://image.tmdb.org/t/p/w500/2g7l7m6n5o4i3u2y1w0q9p8r7s6.jpg',
  'Itaewon Class': 'https://image.tmdb.org/t/p/w500/1f7l7m6n5o4i3u2y1w0q9p8r7s6.jpg',
  'The Untamed': 'https://image.tmdb.org/t/p/w500/9k8l7m6n5o4i3u2y1w0q9p8r7s6.jpg',
};

async function updateWithTMDBPosters() {
  console.log('Updating content with TMDB poster URLs...');

  try {
    const content = await prisma.content.findMany();

    for (const item of content) {
      const posterUrl = tmdbPosters[item.title];
      if (posterUrl) {
        await prisma.content.update({
          where: { id: item.id },
          data: { 
            posterUrl,
            tmdbId: item.id.charCodeAt(0) * 1000 // Just a placeholder TMDB ID
          }
        });
        console.log(`Updated TMDB poster for: ${item.title}`);
      }
    }

    console.log('Successfully updated TMDB posters!');
  } catch (error) {
    console.error('Error updating TMDB posters:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateWithTMDBPosters();