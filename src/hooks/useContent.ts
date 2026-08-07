// Custom hooks for content data fetching
import { useState, useEffect, useCallback } from 'react';

export interface Content {
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

export interface UseContentOptions {
  search?: string;
  genre?: string;
  type?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export function useContent(options: UseContentOptions = {}) {
  const [data, setData] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchContent = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (options.search) params.append('search', options.search);
      if (options.genre && options.genre !== 'All') params.append('genre', options.genre);
      if (options.type && options.type !== 'All') params.append('type', options.type);
      if (options.sortBy) params.append('sortBy', options.sortBy);
      if (options.page) params.append('page', options.page.toString());
      if (options.limit) params.append('limit', options.limit.toString());

      const response = await fetch(`/api/content?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result.data || result);
      setTotal(result.total || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch content');
      console.error('Error fetching content:', err);
    } finally {
      setLoading(false);
    }
  }, [options]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return { data, loading, error, total, refetch: fetchContent };
}