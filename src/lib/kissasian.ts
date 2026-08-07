interface KissAsianDrama {
  id: string;
  title: string;
  poster: string;
  type: string;
  year: string;
  rating: string;
  country: string;
  episodes: number;
}

export async function searchKissAsian(query: string): Promise<KissAsianDrama[]> {
  try {
    const response = await fetch(`https://kissasian.li/api/v1/search?q=${encodeURIComponent(query)}`, {
      headers: {
        'User-Agent': 'ZingAnime',
      },
      next: { revalidate: 1800 } // Cache for 30 minutes
    });

    if (!response.ok) {
      throw new Error('KissAsian API error');
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching KissAsian:', error);
    return [];
  }
}

export async function getKissAsianEpisodes(dramaId: string): Promise<any[]> {
  try {
    const response = await fetch(`https://kissasian.li/api/v1/episodes/${dramaId}`, {
      headers: {
        'User-Agent': 'ZingAnime',
      },
      next: { revalidate: 1800 }
    });

    if (!response.ok) {
      throw new Error('KissAsian API error');
    }

    const data = await response.json();
    return data.episodes || [];
  } catch (error) {
    console.error('Error getting KissAsian episodes:', error);
    return [];
  }
}

export async function getKissAsianVideoServers(episodeId: string): Promise<string[]> {
  try {
    const response = await fetch(`https://kissasian.li/api/v1/servers/${episodeId}`, {
      headers: {
        'User-Agent': 'ZingAnime',
      },
      next: { revalidate: 600 } // Cache for 10 minutes
    });

    if (!response.ok) {
      throw new Error('KissAsian API error');
    }

    const data = await response.json();
    return data.servers || [];
  } catch (error) {
    console.error('Error getting KissAsian video servers:', error);
    return [];
  }
}