import { NextResponse } from 'next/server';
import { searchDrama } from '@/lib/mdl';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const limit = searchParams.get('limit') || '10';

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const results = await searchDrama(query, parseInt(limit as string));
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error searching drama:', error);
    return NextResponse.json({ error: 'Failed to search drama' }, { status: 500 });
  }
}