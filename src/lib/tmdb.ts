interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  original_language: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  genres: Array<{
    id: number;
    name: string;
  }>;
  adult: boolean;
  video: boolean;
  popularity: number;
}

interface TMDBTV {
  id: number;
  name: string;
  original_name: string;
  original_language: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  genres: Array<{
    id: number;
    name: string;
  }>;
  origin_country: string[];
  original_language: string;
  popularity: number;
}

const TMDB_API_KEY = process.env.TMDB_API_KEY || ''; // User will need to add this
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

async function tmdbFetch(endpoint: string, params: Record<string, string> = {}) {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  
  if (TMDB_API_KEY) {
    url.searchParams.append('api_key', TMDB_API_KEY);
  }

  const response = await fetch(url.toString(), {
    next: { revalidate: 3600 } // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }

  return response.json();
}

export async function searchTMDB(query: string, includeAdult: boolean = false): Promise<{ movies: TMDBMovie[], tv: TMDBTV[] }> {
  try {
    const [movieResults, tvResults] = await Promise.all([
      tmdbFetch('/search/movie', { query: query, include_adult: includeAdult.toString() }),
      tmdbFetch('/search/tv', { query: query, include_adult: includeAdult.toString() })
    ]);

    return {
      movies: movieResults.results || [],
      tv: tvResults.results || []
    };
  } catch (error) {
    console.error('Error searching TMDB:', error);
    return { movies: [], tv: [] };
  }
}

export async function getTrendingAnime(limit: number = 10): Promise<TMDBTV[]> {
  try {
    const response = await tmdbFetch('/discover/tv', {
      with_genres: '16', // Animation genre
      with_original_language: 'ja', // Japanese
      sort_by: 'popularity.desc',
      'vote_count.gte': '100',
      page: '1'
    });

    return response.results?.slice(0, limit) || [];
  } catch (error) {
    console.error('Error getting trending anime:', error);
    return [];
  }
}

export async function getTrendingKDramas(limit: number = 10): Promise<TMDBTV[]> {
  try {
    const response = await tmdbFetch('/discover/tv', {
      with_genres: '18', // Drama genre
      with_original_language: 'ko', // Korean
      sort_by: 'popularity.desc',
      'vote_count.gte': '50',
      page: '1'
    });

    return response.results?.slice(0, limit) || [];
  } catch (error) {
    console.error('Error getting trending K-dramas:', error);
    return [];
  }
}

export async function getTrendingCDramas(limit: number = 10): Promise<TMDBTV[]> {
  try {
    const response = await tmdbFetch('/discover/tv', {
      with_genres: '18', // Drama genre
      with_original_language: 'zh', // Chinese
      sort_by: 'popularity.desc',
      'vote_count.gte': '50',
      page: '1'
    });

    return response.results?.slice(0, limit) || [];
  } catch (error) {
    console.error('Error getting trending C-dramas:', error);
    return [];
  }
}

export async function getTMDBImageURL(path: string, size: string = 'original'): string {
  if (!path) return '';
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export async function getGenreList(): Promise<Array<{ id: number; name: string }>> {
  try {
    const response = await tmdbFetch('/genre/tv/list');
    return response.genres || [];
  } catch (error) {
    console.error('Error getting genre list:', error);
    return [];
  }
}