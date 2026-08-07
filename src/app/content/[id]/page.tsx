'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/ui/Button';
import { Badge } from '@/ui/Badge';
import { Card } from '@/ui/Card';
import { LoadingSpinner } from '@/ui/LoadingSpinner';
import { EmptyState } from '@/ui/EmptyState';
import { Skeleton } from '@/ui/Skeleton';
import { useToast } from '@/ui/Toast';
import { getPosterUrl, getBackdropUrl, getPlaceholderImage } from '@/utils/image';
import { formatRating, formatYear } from '@/utils/formatting';
import { contentTypeLabels, contentTypeEmojis, watchlistStatus } from '@/constants/design';

interface Content {
  id: string;
  title: string;
  titleAlt: string | null;
  description: string | null;
  type: string;
  year: number;
  rating: number;
  posterUrl: string | null;
  backdropUrl: string | null;
  status: string;
  genres: Array<{ genre: { id: string; name: string; slug: string } }>;
}

function ContentDetail() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { showToast } = useToast();
  
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [watchlistLoading, setWatchlistLoading] = useState(false);

  useEffect(() => {
    fetchContent();
  }, [params.id]);

  const fetchContent = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/content/${params.id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('Content not found');
        } else {
          throw new Error('Failed to load content');
        }
        setContent(null);
        return;
      }
      
      const data = await response.json();
      setContent(data);
    } catch (err) {
      setError('Failed to load content');
      console.error('Error fetching content:', err);
      setContent(null);
    } finally {
      setLoading(false);
    }
  };

  const checkWatchlist = async () => {
    if (!session) return;
    
    try {
      const response = await fetch('/api/watchlist');
      const data = await response.json();
      const isInList = data.some((item: any) => item.contentId === params.id);
      setIsInWatchlist(isInList);
    } catch (err) {
      console.error('Error checking watchlist:', err);
    }
  };

  useEffect(() => {
    if (session && params.id) {
      checkWatchlist();
    }
  }, [session, params.id]);

  const addToWatchlist = async () => {
    if (!session) {
      router.push('/login');
      return;
    }

    setWatchlistLoading(true);
    try {
      const response = await fetch('/api/watchlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentId: params.id }),
      });

      if (!response.ok) throw new Error('Failed to add to watchlist');

      setIsInWatchlist(true);
      showToast('success', 'Added to watchlist');
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      showToast('error', 'Failed to add to watchlist');
    } finally {
      setWatchlistLoading(false);
    }
  };

  const removeFromWatchlist = async () => {
    if (!session) return;

    setWatchlistLoading(true);
    try {
      const response = await fetch(`/api/watchlist?contentId=${params.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to remove from watchlist');

      setIsInWatchlist(false);
      showToast('success', 'Removed from watchlist');
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      showToast('error', 'Failed to remove from watchlist');
    } finally {
      setWatchlistLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <Skeleton variant="rectangular" width="100%" height="400" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <Skeleton variant="rectangular" width="100%" height="450" />
              </div>
              <div className="md:col-span-2 space-y-4">
                <Skeleton variant="text" width="80%" height="40" />
                <Skeleton variant="text" width="60%" height="24" />
                <Skeleton variant="text" width="100%" height="20" />
                <Skeleton variant="text" width="100%" height="20" />
                <Skeleton variant="text" width="100%" height="20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card variant="flat" padding="lg">
            <EmptyState
              title="Content not found"
              description="The content you're looking for doesn't exist or has been removed"
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

  const backdropSrc = content.backdropUrl ? getBackdropUrl(content.backdropUrl, 'w1280') : getPlaceholderImage('backdrop');
  const posterSrc = content.posterUrl ? getPosterUrl(content.posterUrl, 'w500') : getPlaceholderImage('poster');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero with Backdrop */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <img
          src={backdropSrc}
          alt={content.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = getPlaceholderImage('backdrop');
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Poster Card */}
          <div className="md:col-span-1">
            <Card variant="elevated" padding="none">
              <img
                src={posterSrc}
                alt={content.title}
                className="w-full aspect-[2/3] object-cover"
                onError={(e) => {
                  e.currentTarget.src = getPlaceholderImage('poster');
                }}
              />
              <div className="p-4 space-y-3">
                <Button
                  onClick={() => router.push(`/watch?contentId=${params.id}&episode=1`)}
                  variant="primary"
                  fullWidth
                  size="lg"
                >
                  Watch Now
                </Button>
                {session ? (
                  isInWatchlist ? (
                    <Button
                      onClick={removeFromWatchlist}
                      variant="danger"
                      fullWidth
                      isLoading={watchlistLoading}
                    >
                      Remove from Watchlist
                    </Button>
                  ) : (
                    <Button
                      onClick={addToWatchlist}
                      variant="secondary"
                      fullWidth
                      isLoading={watchlistLoading}
                    >
                      Add to Watchlist
                    </Button>
                  )
                ) : (
                  <Button
                    onClick={() => router.push('/login')}
                    variant="secondary"
                    fullWidth
                  >
                    Sign in to Add
                  </Button>
                )}
              </div>
            </Card>
          </div>

          {/* Content Info */}
          <div className="md:col-span-2 space-y-6">
            {/* Title and Metadata */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {content.title}
                  </h1>
                  {content.titleAlt && (
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                      {content.titleAlt}
                    </p>
                  )}
                </div>
                <Badge variant="success" size="lg">
                  ★ {formatRating(content.rating)}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-3 mb-4">
                <Badge variant="info">
                  {contentTypeEmojis[content.type as keyof typeof contentTypeEmojis] || '🎬'} {contentTypeLabels[content.type as keyof typeof contentTypeLabels] || content.type}
                </Badge>
                <Badge variant="default">
                  {formatYear(new Date(content.year, 0, 1))}
                </Badge>
                <Badge variant="default">
                  {content.status}
                </Badge>
              </div>

              {content.genres && content.genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {content.genres.map((g) => (
                    <Badge key={g.genre.id} variant="secondary" size="sm">
                      {g.genre.name}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            {content.description && (
              <Card variant="elevated" padding="md">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Synopsis</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {content.description}
                </p>
              </Card>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card variant="flat" padding="md" className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{formatRating(content.rating)}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Rating</div>
              </Card>
              <Card variant="flat" padding="md" className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{content.year}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Year</div>
              </Card>
              <Card variant="flat" padding="md" className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{content.genres?.length || 0}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Genres</div>
              </Card>
              <Card variant="flat" padding="md" className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{content.type}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Type</div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContentPage() {
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
      <ContentDetail />
    </Suspense>
  );
}