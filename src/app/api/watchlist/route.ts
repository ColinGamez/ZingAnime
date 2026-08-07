import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const watchlist = await prisma.watchlist.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        content: {
          include: {
            genres: {
              include: {
                genre: true,
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(watchlist);
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    return NextResponse.json({ error: 'Failed to fetch watchlist' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { contentId, status = 'Plan to Watch', progress = 0 } = body;

    const watchlistItem = await prisma.watchlist.upsert({
      where: {
        userId_contentId: {
          userId: session.user.id,
          contentId,
        },
      },
      update: {
        status,
        progress,
      },
      create: {
        userId: session.user.id,
        contentId,
        status,
        progress,
      },
      include: {
        content: true,
      },
    });

    return NextResponse.json(watchlistItem);
  } catch (error) {
    console.error('Error updating watchlist:', error);
    return NextResponse.json({ error: 'Failed to update watchlist' }, { status: 500 });
  }
}