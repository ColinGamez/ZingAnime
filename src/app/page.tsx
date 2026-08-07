'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ContentCard } from '@/ui/ContentCard';
import { Button } from '@/ui/Button';
import { LoadingSpinner } from '@/ui/LoadingSpinner';
import { EmptyState } from '@/ui/EmptyState';
import { Skeleton } from '@/ui/Skeleton';
import { Card } from '@/ui/Card';
import { contentTypes, contentTypeLabels, contentTypeEmojis } from '@/constants/design';
import { useContent } from '@/hooks/useContent';

interface Content {
  id: string;
  title: string;
  titleAlt: string | null;
  posterUrl: string | null;
  year: number;
  rating: number;
  type: string;
  genres: Array<{ genre: { name: string } }>;
}

export default function Home() {
  const router = useRouter();
  
  // Fetch trending content
  const { data: trendingContent, loading: trendingLoading } = useContent({
    sortBy: 'rating',
    limit: 12,
  });

  // Fetch recent content
  const { data: recentContent, loading: recentLoading } = useContent({
    sortBy: 'latest',
    limit: 12,
  });

  const contentTypesList = Object.entries(contentTypes).map(([type, label]) => ({
    type,
    label: contentTypeLabels[type as keyof typeof contentTypeLabels] || label,
    emoji: contentTypeEmojis[type as keyof typeof contentTypeEmojis] || '🎬',
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Compact Hero */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              ZingAnime
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Discover anime, K-dramas, C-dramas, and J-dramas from our extensive catalog
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => router.push('/catalog')} size="lg">
                Browse Catalog
              </Button>
              <Button onClick={() => router.push('/watchlist')} variant="secondary" size="lg">
                My Watchlist
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Browse by Type */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Browse by Type</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {contentTypesList.map((type) => (
            <Link
              key={type.type}
              href={`/catalog?type=${type.type}`}
              className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
            >
              <div className="text-center">
                <span className="text-3xl mb-2 block group-hover:scale-110 transition-transform">
                  {type.emoji}
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {type.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Trending Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Trending Now</h2>
          <Button variant="ghost" onClick={() => router.push('/catalog?sortBy=rating')}>
            View All
          </Button>
        </div>
        
        {trendingLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton variant="rectangular" width="100%" height="288" />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="60%" />
              </div>
            ))}
          </div>
        ) : trendingContent && trendingContent.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {trendingContent.slice(0, 6).map((content: Content) => (
              <ContentCard
                key={content.id}
                id={content.id}
                title={content.title}
                titleAlt={content.titleAlt}
                posterUrl={content.posterUrl}
                year={content.year}
                rating={content.rating}
                type={content.type}
                genres={content.genres}
              />
            ))}
          </div>
        ) : (
          <Card variant="flat" padding="lg">
            <EmptyState
              title="No trending content available"
              description="Check back later for new additions"
            />
          </Card>
        )}
      </div>

      {/* Recently Added Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recently Added</h2>
          <Button variant="ghost" onClick={() => router.push('/catalog?sortBy=latest')}>
            View All
          </Button>
        </div>
        
        {recentLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton variant="rectangular" width="100%" height="288" />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="60%" />
              </div>
            ))}
          </div>
        ) : recentContent && recentContent.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {recentContent.slice(0, 6).map((content: Content) => (
              <ContentCard
                key={content.id}
                id={content.id}
                title={content.title}
                titleAlt={content.titleAlt}
                posterUrl={content.posterUrl}
                year={content.year}
                rating={content.rating}
                type={content.type}
                genres={content.genres}
              />
            ))}
          </div>
        ) : (
          <Card variant="flat" padding="lg">
            <EmptyState
              title="No recent content available"
              description="New content will appear here when added"
            />
          </Card>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Extensive Catalog</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Browse our large collection of anime and dramas
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Watchlist Tracking</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Keep track of your progress and favorites
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Blog & News</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Stay updated with the latest anime news and reviews
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}