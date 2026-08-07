'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import VideoPlayer from '@/components/VideoPlayer';
import { Button } from '@/ui/Button';
import { Badge } from '@/ui/Badge';
import { Card } from '@/ui/Card';
import { LoadingSpinner } from '@/ui/LoadingSpinner';
import { EmptyState } from '@/ui/EmptyState';
import { Skeleton } from '@/ui/Skeleton';
import { useToast } from '@/ui/Toast';

interface Episode {
  id: string;
  contentId: string;
  episodeNumber: number;
  title: string | null;
  description: string | null;
  duration: number | null;
  airDate: Date | null;
}

interface VideoSource {
  id: string;
  sourceType: string;
  sourceUrl: string;
  language: string;
  quality?: string;
  isActive: boolean;
  priority: number;
}

function WatchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { showToast } = useToast();
  
  const contentId = searchParams.get('contentId');
  const episodeNumber = parseInt(searchParams.get('episode') || '1');

  const [episode, setEpisode] = useState<Episode | null>(null);
  const [contentTitle, setContentTitle] = useState('');
  const [videoSources, setVideoSources] = useState<VideoSource[]>([]);
  const [allEpisodes, setAllEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    if (contentId && episodeNumber) {
      fetchEpisode();
      fetchAllEpisodes();
    }
  }, [contentId, episodeNumber]);

  const fetchEpisode = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/episode?contentId=${contentId}&episode=${episodeNumber}`);
      const data = await response.json();
      setEpisode(data.episode);
      setContentTitle(data.contentTitle);
      setVideoSources(data.videoSources);
    } catch (error) {
      console.error('Error fetching episode:', error);
      showToast('error', 'Failed to load episode');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllEpisodes = async () => {
    try {
      const response = await fetch(`/api/episode?contentId=${contentId}`);
      const data = await response.json();
      if (data.episodes) {
        setAllEpisodes(data.episodes);
      }
    } catch (error) {
      console.error('Error fetching episodes:', error);
    }
  };

  const updateWatchlistProgress = async (progress: number) => {
    if (!session || !contentId) return;

    try {
      await fetch('/api/watchlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentId, progress, status: 'Watching' }),
      });
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const goToEpisode = (epNum: number) => {
    router.push(`/watch?contentId=${contentId}&episode=${epNum}`);
  };

  const goToNextEpisode = () => {
    const nextEp = allEpisodes.find(ep => ep.episodeNumber === episodeNumber + 1);
    if (nextEp) {
      goToEpisode(nextEp.episodeNumber);
    } else {
      showToast('info', 'No more episodes');
    }
  };

  const goToPreviousEpisode = () => {
    const prevEp = allEpisodes.find(ep => ep.episodeNumber === episodeNumber - 1);
    if (prevEp) {
      goToEpisode(prevEp.episodeNumber);
    } else {
      showToast('info', 'This is the first episode');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <Skeleton variant="rectangular" width="100%" height="400" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-3 space-y-4">
                <Skeleton variant="text" width="60%" height="32" />
                <Skeleton variant="text" width="40%" height="24" />
              </div>
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} variant="text" width="100%" height="20" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!episode) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card variant="flat" padding="lg">
            <EmptyState
              title="Episode not found"
              description="The episode you're looking for doesn't exist"
              action={
                <Button onClick={() => router.push('/catalog')}>
                  Browse Catalog
                </Button>
              }
            />
          </Card>
        </div>
      </div>
    );
  }

  const hasNextEpisode = allEpisodes.some(ep => ep.episodeNumber === episodeNumber + 1);
  const hasPreviousEpisode = allEpisodes.some(ep => ep.episodeNumber === episodeNumber - 1);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push(`/content/${contentId}`)}
            className="mb-4"
          >
            ← Back to Content
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {contentTitle}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Episode {episode.episodeNumber}: {episode.title || 'Untitled'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-3 space-y-6">
            <Card variant="elevated" padding="none">
              <VideoPlayer sources={videoSources} onEnded={() => autoPlay && goToNextEpisode()} />
            </Card>

            {/* Episode Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="secondary"
                onClick={goToPreviousEpisode}
                disabled={!hasPreviousEpisode}
              >
                ← Previous Episode
              </Button>
              
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <input
                    type="checkbox"
                    checked={autoPlay}
                    onChange={(e) => setAutoPlay(e.target.checked)}
                    className="rounded"
                  />
                  Auto-play next
                </label>
              </div>

              <Button
                variant="secondary"
                onClick={goToNextEpisode}
                disabled={!hasNextEpisode}
              >
                Next Episode →
              </Button>
            </div>

            {/* Episode Info */}
            <Card variant="elevated" padding="md">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Episode Information
              </h2>
              {episode.description && (
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {episode.description}
                </p>
              )}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                {episode.duration && (
                  <Badge variant="default">Duration: {episode.duration} min</Badge>
                )}
                {episode.airDate && (
                  <Badge variant="default">
                    Air Date: {new Date(episode.airDate).toLocaleDateString()}
                  </Badge>
                )}
              </div>
            </Card>
          </div>

          {/* Episode List */}
          <div className="lg:col-span-1">
            <Card variant="elevated" padding="md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Episodes
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {allEpisodes.length > 0 ? (
                  allEpisodes.map((ep) => (
                    <button
                      key={ep.id}
                      onClick={() => goToEpisode(ep.episodeNumber)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        ep.episodeNumber === episodeNumber
                          ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className="font-medium">
                        Episode {ep.episodeNumber}
                      </div>
                      {ep.title && (
                        <div className="text-sm opacity-75 line-clamp-1">
                          {ep.title}
                        </div>
                      )}
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    No episodes available
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Watch() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </div>
    }>
      <WatchContent />
    </Suspense>
  );
}