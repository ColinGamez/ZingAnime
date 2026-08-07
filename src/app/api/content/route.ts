import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const genre = searchParams.get('genre') || '';
  const type = searchParams.get('type') || '';

  try {
    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { titleAlt: { contains: search } },
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

    const content = await prisma.content.findMany({
      where,
      include: {
        genres: {
          include: {
            genre: true,
          },
        },
      },
      orderBy: {
        rating: 'desc',
      },
    });

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}