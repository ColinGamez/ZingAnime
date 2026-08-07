'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ContentCard } from '@/ui/ContentCard';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';
import { Select } from '@/ui/Select';
import { Badge } from '@/ui/Badge';
import { LoadingSpinner } from '@/ui/LoadingSpinner';
import { EmptyState } from '@/ui/EmptyState';
import { Skeleton } from '@/ui/Skeleton';
import { Card } from '@/ui/Card';
import { useToast } from '@/ui/Toast';
import { useContent } from '@/hooks/useContent';
import { useDebounce } from '@/hooks/useDebounce';
import { GENRES, SORT_OPTIONS, pagination } from '@/constants/content';
import { contentTypes, contentTypeLabels } from '@/constants/design';

interface Content {
  id: string;
  title: string;
  titleAlt: string | null;
  posterUrl: string | null;
  year: number;
  rating: number;
  type: string;
  genres: Array<{ genre: { name: string } }>;
  status?: string;
}

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { showToast } = useToast();
  
  const typeParam = searchParams.get('type') || 'All';
  const genreParam = searchParams.get('genre') || 'All';
  const sortByParam = searchParams.get('sortBy') || 'rating';
  const pageParam = parseInt(searchParams.get('page') || '1');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(genreParam);
  const [selectedType, setSelectedType] = useState(typeParam);
  const [selectedSort, setSelectedSort] = useState(sortByParam);
  const [currentPage, setCurrentPage] = useState(pageParam);
  const [useExternalSearch, setUseExternalSearch] = useState(false);
  
  const debouncedSearch = useDebounce(searchTerm, 300);

  const { data: content, loading, error, total, totalPages } = useContent({
    search: useExternalSearch ? debouncedSearch : debouncedSearch || (searchParams.get('search') || ''),
    genre: selectedGenre,
    type: selectedType,
    sortBy: selectedSort,
    page: currentPage,
    limit: pagination.defaultPageSize,
  });

  useEffect(() => {
    setSelectedType(typeParam);
    setSelectedGenre(genreParam);
    setSelectedSort(sortByParam);
    setCurrentPage(pageParam);
  }, [typeParam, genreParam, sortByParam, pageParam]);

  const updateURL = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value === 'All' || value === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    router.push(`/catalog?${newParams.toString()}`);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleGenreChange = (value: string) => {
    setSelectedGenre(value);
    setCurrentPage(1);
    updateURL({ genre: value, page: '1' });
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    setCurrentPage(1);
    updateURL({ type: value, page: '1' });
  };

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    setCurrentPage(1);
    updateURL({ sortBy: value, page: '1' });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateURL({ page: page.toString() });
  };

  const addToWatchlist = async (contentId: string) => {
    if (!session) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch('/api/watchlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentId }),
      });

      if (!response.ok) throw new Error('Failed to add to watchlist');

      showToast('success', 'Added to watchlist');
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      showToast('error', 'Failed to add to watchlist');
    }
  };

  const genreOptions = GENRES.map(genre => ({ value: genre, label: genre }));
  const typeOptions = Object.entries(contentTypes).map(([value, label]) => ({
    value,
    label: contentTypeLabels[value as keyof typeof contentTypeLabels] || label,
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {selectedType !== 'All' ? `${contentTypeLabels[selectedType as keyof typeof contentTypeLabels] || selectedType} Catalog` : 'Content Catalog'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {total} {total === 1 ? 'title' : 'titles'} found
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                fullWidth
              />
            </div>

            {/* Genre Filter */}
            <Select
              value={selectedGenre}
              onChange={(e) => handleGenreChange(e.target.value)}
              options={genreOptions}
              fullWidth
            />

            {/* Type Filter */}
            <Select
              value={selectedType}
              onChange={(e) => handleTypeChange(e.target.value)}
              options={typeOptions}
              fullWidth
            />
          </div>

          {/* Sort and External Search Toggle */}
          <div className="flex items-center justify-between">
            <Select
              value={selectedSort}
              onChange={(e) => handleSortChange(e.target.value)}
              options={SORT_OPTIONS}
              label="Sort by"
            />
            
            <Button
              variant={useExternalSearch ? 'primary' : 'secondary'}
              onClick={() => setUseExternalSearch(!useExternalSearch)}
              size="sm"
            >
              {useExternalSearch ? '🎬 TMDB Search' : '📦 Local Search'}
            </Button>
          </div>
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton variant="rectangular" width="100%" height="288" />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="60%" />
              </div>
            ))}
          </div>
        ) : error ? (
          <Card variant="flat" padding="lg">
            <EmptyState
              title="Error loading content"
              description="Please try again later"
              action={
                <Button onClick={() => window.location.reload()}>
                  Retry
                </Button>
              }
            />
          </Card>
        ) : content && content.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {content.map((item: Content) => (
                <ContentCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  titleAlt={item.titleAlt}
                  posterUrl={item.posterUrl}
                  year={item.year}
                  rating={item.rating}
                  type={item.type}
                  genres={item.genres}
                  status={item.status}
                  onAddToWatchlist={addToWatchlist}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                  variant="secondary"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="secondary"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <Card variant="flat" padding="lg">
            <EmptyState
              title="No content found"
              description="Try adjusting your filters or search terms"
              action={
                <Button onClick={() => {
                  setSearchTerm('');
                  setSelectedGenre('All');
                  setSelectedType('All');
                  updateURL({});
                }}>
                  Clear Filters
                </Button>
              }
            />
          </Card>
        )}
      </div>
    </div>
  );
}

export default function Catalog() {
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
      <CatalogContent />
    </Suspense>
  );
}