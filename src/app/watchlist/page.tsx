'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/ui/Button';
import { Badge } from '@/ui/Badge';
import { Card } from '@/ui/Card';
import { EmptyState } from '@/ui/EmptyState';
import { LoadingSpinner } from '@/ui/LoadingSpinner';
import { useToast } from '@/ui/Toast';
import { watchlistStatus, watchlistStatusColors } from '@/constants/design';

interface WatchlistItem {
  id: string;
  status: string;
  progress: number;
  score?: number | null;
  content: {
    id: string;
    title: string;
    year: number;
    type: string;
    posterUrl?: string | null;
    genres: Array<{ genre: { name: string } }>;
  };
}

export default function Watchlist() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { showToast } = useToast();
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      fetchWatchlist();
    }
  }, [status, router]);

  const fetchWatchlist = async () => {
    try {
      const response = await fetch('/api/watchlist');
      if (!response.ok) throw new Error('Failed to fetch watchlist');
      const data = await response.json();
      setWatchlist(data);
    } catch (error) {
      console.error('Error fetching watchlist:', error);
      showToast('error', 'Failed to load your watchlist');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (contentId: string) => {
    setRemoving(contentId);
    try {
      const response = await fetch(`/api/watchlist?contentId=${contentId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to remove from watchlist');
      
      setWatchlist(prev => prev.filter(item => item.content.id !== contentId));
      showToast('success', 'Removed from watchlist');
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      showToast('error', 'Failed to remove from watchlist');
    } finally {
      setRemoving(null);
    }
  };

  const handleWatch = (contentId: string, progress: number) => {
    router.push(`/content/${contentId}`);
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Watchlist</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {watchlist.length} {watchlist.length === 1 ? 'title' : 'titles'}
          </p>
        </div>
        
        {watchlist.length === 0 ? (
          <Card variant="flat" padding="lg">
            <EmptyState
              title="Your watchlist is empty"
              description="Start adding anime and dramas to track your progress"
              action={
                <Button onClick={() => router.push('/catalog')}>
                  Browse Catalog
                </Button>
              }
            />
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchlist.map((item) => (
              <Card key={item.id} variant="elevated" padding="md">
                <div className="flex gap-4">
                  {/* Poster */}
                  <div className="w-24 h-36 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                    {item.content.posterUrl ? (
                      <img
                        src={item.content.posterUrl}
                        alt={item.content.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 
                      className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400"
                      onClick={() => router.push(`/content/${item.content.id}`)}
                    >
                      {item.content.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {item.content.year} • {item.content.type}
                    </p>

                    {/* Status */}
                    <div className="mb-2">
                      <Badge 
                        variant="default" 
                        size="sm"
                        className={watchlistStatusColors[item.status as keyof typeof watchlistStatusColors] || ''}
                      >
                        {item.status}
                      </Badge>
                    </div>

                    {/* Progress */}
                    {item.progress > 0 && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Episode {item.progress}
                      </p>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleWatch(item.content.id, item.progress)}
                        className="flex-1"
                      >
                        Watch
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemove(item.content.id)}
                        disabled={removing === item.content.id}
                        isLoading={removing === item.content.id}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}