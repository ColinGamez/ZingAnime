interface GogoanimeEpisode {
  episodeId: string;
  episodeNum: number;
  title: string;
  animeId: string;
  animeTitle: string;
  poster: string;
  category: string;
}

interface GogoanimeSearchResult {
  animeId: string;
  title: string;
  poster: string;
  type: string;
  category: string;
  rating: string;
  releaseDate: string;
}

export async function searchGogoanime(query: string): Promise<GogoanimeSearchResult[]> {
  try {
    const response = await fetch(`https://api.gogoanime.com/search?keyw=${encodeURIComponent(query)}`, {
      headers: {
        'User-Agent': 'ZingAnime',
      },
      next: { revalidate: 1800 } // Cache for 30 minutes
    });

    if (!response.ok) {
      throw new Error('Gogoanime API error');
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching Gogoanime:', error);
    return [];
  }
}

export async function getGogoanimeEpisodes(animeId: string): Promise<GogoanimeEpisode[]> {
  try {
    const response = await fetch(`https://api.gogoanime.com/anime-details/${animeId}`, {
      headers: {
        'User-Agent': 'ZingAnime',
      },
      next: { revalidate: 1800 }
    });

    if (!response.ok) {
      throw new Error('Gogoanime API error');
    }

    const data = await response.json();
    return data.episodes || [];
  } catch (error) {
    console.error('Error getting Gogoanime episodes:', error);
    return [];
  }
}

export async function getGogoanimeVideoServers(episodeId: string): Promise<string[]> {
  try {
    const response = await fetch(`https://api.gogoanime.com/vidcdn/download-server?episodeId=${episodeId}`, {
      headers: {
        'User-Agent': 'ZingAnime',
      },
      next: { revalidate: 600 } // Cache for 10 minutes
    });

    if (!response.ok) {
      throw new Error('Gogoanime API error');
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error getting Gogoanime video servers:', error);
    return [];
  }
}