const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Real poster URLs for our sample dramas from MyDramaList
const dramaPosters = {
  'Goblin': 'https://i.mydramalist.com/m/63v.jpg',
  'Descendants of the Sun': 'https://i.mydramalist.com/m/3021.jpg',
  'Crash Landing on You': 'https://i.mydramalist.com/m/4048.jpg',
  'Hana Yori Dango': 'https://i.mydramalist.com/m/1v.jpg',
  'Itaewon Class': 'https://i.mydramalist.com/m/4164.jpg',
  'The Untamed': 'https://i.mydramalist.com/m/5014.jpg',
};

async function updateDramaPosters() {
  console.log('Updating dramas with real MyDramaList poster URLs...');

  try {
    const dramas = await prisma.content.findMany({
      where: {
        type: {
          in: ['JDRAMA', 'CDRAMA', 'KDRAMA']
        }
      }
    });

    console.log(`Found ${dramas.length} dramas to update`);

    for (const drama of dramas) {
      const posterUrl = dramaPosters[drama.title];
      if (posterUrl) {
        await prisma.content.update({
          where: { id: drama.id },
          data: { 
            posterUrl,
            mdlId: drama.id.charCodeAt(0) * 1000 // Placeholder MDL ID
          }
        });
        console.log(`Updated poster for: ${drama.title}`);
      } else {
        console.log(`No poster URL found for: ${drama.title}, trying to find match...`);
        // Try partial match
        const matchedKey = Object.keys(dramaPosters).find(key => 
          drama.title.toLowerCase().includes(key.toLowerCase()) || 
          key.toLowerCase().includes(drama.title.toLowerCase())
        );
        if (matchedKey) {
          await prisma.content.update({
            where: { id: drama.id },
            data: { 
              posterUrl: dramaPosters[matchedKey],
              mdlId: drama.id.charCodeAt(0) * 1000
            }
          });
          console.log(`Updated poster for: ${drama.title} (matched with ${matchedKey})`);
        }
      }
    }

    console.log('Successfully updated drama posters!');
  } catch (error) {
    console.error('Error updating drama posters:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateDramaPosters();