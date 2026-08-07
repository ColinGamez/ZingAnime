interface MDLDrama {
  id: number;
  title: string;
  title_english: string | null;
  title_native: string | null;
  poster_url: string;
  synopsis: string;
  type: string;
  year: number;
  rating: number;
  episodes: number;
  duration: string;
  status: string;
  genres: Array<{
    id: number;
    name: string;
  }>;
  country: string;
  network: string;
}

export async function searchDrama(query: string, limit: number = 10): Promise<MDLDrama[]> {
  try {
    const response = await fetch(
      `https://api.mydramalist.com/v1/search?q=${encodeURIComponent(query)}&limit=${limit}`,
      {
        headers: {
          'User-Agent': 'ZingAnime',
        },
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      throw new Error('MyDramaList API request failed');
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching drama:', error);
    return [];
  }
}

export async function getDramaById(id: number): Promise<MDLDrama | null> {
  try {
    const response = await fetch(
      `https://api.mydramalist.com/v1/details/${id}`,
      {
        headers: {
          'User-Agent': 'ZingAnime',
        },
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      throw new Error('MyDramaList API request failed');
    }

    const data = await response.json();
    return data || null;
  } catch (error) {
    console.error('Error getting drama by ID:', error);
    return null;
  }
}

export async function getTopDramas(limit: number = 10): Promise<MDLDrama[]> {
  try {
    const response = await fetch(
      `https://api.mydramalist.com/v1/search?q=&limit=${limit}&sort=rating&order=desc`,
      {
        headers: {
          'User-Agent': 'ZingAnime',
        },
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      throw new Error('MyDramaList API request failed');
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error getting top dramas:', error);
    return [];
  }
}