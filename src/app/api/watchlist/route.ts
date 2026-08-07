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
    const { contentId, status = 'Plan to Watch', progress = 0, score } = body;

    // Validate status
    const validStatuses = ['Plan to Watch', 'Watching', 'Completed', 'Dropped', 'On Hold'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

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
        score: score !== undefined ? score : undefined,
      },
      create: {
        userId: session.user.id,
        contentId,
        status,
        progress,
        score: score !== undefined ? score : undefined,
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

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const contentId = searchParams.get('contentId');

    if (!contentId) {
      return NextResponse.json({ error: 'contentId is required' }, { status: 400 });
    }

    await prisma.watchlist.deleteMany({
      where: {
        userId: session.user.id,
        contentId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    return NextResponse.json({ error: 'Failed to remove from watchlist' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { contentId, status, progress, score } = body;

    if (!contentId) {
      return NextResponse.json({ error: 'contentId is required' }, { status: 400 });
    }

    const updateData: any = {};
    if (status !== undefined) updateData.status = status;
    if (progress !== undefined) updateData.progress = progress;
    if (score !== undefined) updateData.score = score;

    const watchlistItem = await prisma.watchlist.updateMany({
      where: {
        userId: session.user.id,
        contentId,
      },
      data: updateData,
    });

    return NextResponse.json({ success: true, updated: watchlistItem });
  } catch (error) {
    console.error('Error updating watchlist:', error);
    return NextResponse.json({ error: 'Failed to update watchlist' }, { status: 500 });
  }
}