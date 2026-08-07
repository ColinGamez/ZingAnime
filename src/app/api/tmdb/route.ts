import { NextResponse } from 'next/server';
import { searchTMDB, getTrendingAnime, getTrendingKDramas, getTrendingCDramas } from '@/lib/tmdb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const type = searchParams.get('type') || 'all';

  try {
    if (query) {
      const results = await searchTMDB(query);
      return NextResponse.json(results);
    } else {
      // Return trending content if no search query
      const [anime, kdramas, cdramas] = await Promise.all([
        getTrendingAnime(5),
        getTrendingKDramas(5),
        getTrendingCDramas(5)
      ]);

      return NextResponse.json({
        anime,
        kdramas,
        cdramas
      });
    }
  } catch (error) {
    console.error('Error fetching from TMDB:', error);
    return NextResponse.json({ error: 'Failed to fetch from TMDB API' }, { status: 500 });
  }
}