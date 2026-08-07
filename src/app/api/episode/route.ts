import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const contentId = searchParams.get('contentId');
  const episodeNumber = searchParams.get('episode');

  if (!contentId || !episodeNumber) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  try {
    const episode = await prisma.episode.findFirst({
      where: {
        contentId,
        episodeNumber: parseInt(episodeNumber),
      },
      include: {
        videoSources: {
          where: { isActive: true },
          orderBy: { priority: 'desc' },
        },
      },
    });

    if (!episode) {
      return NextResponse.json({ error: 'Episode not found' }, { status: 404 });
    }

    const content = await prisma.content.findUnique({
      where: { id: contentId },
      select: { title: true },
    });

    return NextResponse.json({
      episode,
      contentTitle: content?.title || 'Unknown',
      videoSources: episode.videoSources,
    });
  } catch (error) {
    console.error('Error fetching episode:', error);
    return NextResponse.json({ error: 'Failed to fetch episode' }, { status: 500 });
  }
}