import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface ContentResponse {
  data: any[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const genre = searchParams.get('genre') || '';
  const type = searchParams.get('type') || '';
  const sortBy = searchParams.get('sortBy') || 'rating';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '24');

  try {
    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { titleAlt: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (genre && genre !== 'All') {
      where.genres = {
        some: {
          genre: {
            slug: genre,
          },
        },
      };
    }

    if (type && type !== 'All') {
      where.type = type;
    }

    // Determine sort order
    const orderBy: any = {};
    switch (sortBy) {
      case 'popularity':
        orderBy.rating = 'desc';
        break;
      case 'rating':
        orderBy.rating = 'desc';
        break;
      case 'latest':
        orderBy.createdAt = 'desc';
        break;
      case 'title':
        orderBy.title = 'asc';
        break;
      case 'year':
        orderBy.year = 'desc';
        break;
      default:
        orderBy.rating = 'desc';
    }

    // Get total count for pagination
    const total = await prisma.content.count({ where });

    // Calculate pagination
    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;

    // Fetch paginated content
    const content = await prisma.content.findMany({
      where,
      include: {
        genres: {
          include: {
            genre: true,
          },
        },
      },
      orderBy,
      skip,
      take: limit,
    });

    const response: ContentResponse = {
      data: content,
      total,
      page,
      pageSize: limit,
      totalPages,
    };

    // Add caching headers
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
      },
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}