interface JikanAnime {
  mal_id: number;
  title: string;
  title_english: string | null;
  title_japanese: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  synopsis: string;
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  genres: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  year: number;
}

export async function searchAnime(query: string, limit: number = 10): Promise<JikanAnime[]> {
  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=${limit}`,
      {
        headers: {
          'User-Agent': 'ZingAnime',
        },
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      throw new Error('Jikan API request failed');
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error searching anime:', error);
    return [];
  }
}

export async function getAnimeById(id: number): Promise<JikanAnime | null> {
  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime/${id}`,
      {
        headers: {
          'User-Agent': 'ZingAnime',
        },
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      throw new Error('Jikan API request failed');
    }

    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error('Error getting anime by ID:', error);
    return null;
  }
}

export async function getTopAnime(limit: number = 10): Promise<JikanAnime[]> {
  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/top/anime?limit=${limit}`,
      {
        headers: {
          'User-Agent': 'ZingAnime',
        },
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      throw new Error('Jikan API request failed');
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error getting top anime:', error);
    return [];
  }
}