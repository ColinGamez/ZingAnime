'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Genre {
  id: string;
  name: string;
  slug: string;
}

interface ContentGenre {
  genre: Genre;
}

interface Content {
  id: string;
  title: string;
  titleAlt: string | null;
  description: string | null;
  type: string;
  year: number;
  rating: number;
  posterUrl: string | null;
  status: string;
  genres: ContentGenre[];
}

export default function Catalog() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const typeParam = searchParams.get('type') || 'All';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedType, setSelectedType] = useState(typeParam);
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  const genres = ['All', 'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mecha', 'Romance', 'Sci-Fi', 'Slice of Life', 'Thriller'];
  const types = ['All', 'ANIME', 'KANIME', 'CANIME', 'JDRAMA', 'CDRAMA', 'KDRAMA'];

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'ANIME': 'Anime',
      'KANIME': 'K-Anime',
      'CANIME': 'C-Anime',
      'JDRAMA': 'J-Drama',
      'CDRAMA': 'C-Drama',
      'KDRAMA': 'K-Drama',
    };
    return labels[type] || type;
  };

  const getTypeEmoji = (type: string) => {
    const emojis: Record<string, string> = {
      'ANIME': '🎌',
      'KANIME': '🇰🇷',
      'CANIME': '🇨🇳',
      'JDRAMA': '🎭',
      'CDRAMA': '🏮',
      'KDRAMA': '🌸',
    };
    return emojis[type] || '📺';
  };

  useEffect(() => {
    setSelectedType(typeParam);
  }, [typeParam]);

  useEffect(() => {
    fetchContent();
  }, [searchTerm, selectedGenre, selectedType]);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedGenre !== 'All') params.append('genre', selectedGenre);
      if (selectedType !== 'All') params.append('type', selectedType);

      const response = await fetch(`/api/content?${params.toString()}`);
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToWatchlist = async (contentId: string) => {
    if (!session) {
      router.push('/login');
      return;
    }

    try {
      await fetch('/api/watchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contentId }),
      });
      alert('Added to watchlist!');
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      alert('Failed to add to watchlist');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-purple-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-purple-900 dark:text-purple-100">
          {selectedType !== 'All' ? `${getTypeLabel(selectedType)} Catalog` : 'Content Catalog'}
        </h1>
        
        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-purple-300 dark:border-purple-700 bg-white dark:bg-gray-800 text-purple-900 dark:text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-4 py-2 rounded-lg border border-purple-300 dark:border-purple-700 bg-white dark:bg-gray-800 text-purple-900 dark:text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 rounded-lg border border-purple-300 dark:border-purple-700 bg-white dark:bg-gray-800 text-purple-900 dark:text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {types.map(type => (
              <option key={type} value={type}>{getTypeLabel(type)}</option>
            ))}
          </select>
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="text-center py-12 text-purple-600 dark:text-purple-300">
            Loading content...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {content.map(item => (
              <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                <div 
                  className="h-48 bg-gradient-to-br from-purple-200 to-indigo-200 dark:from-purple-900 dark:to-indigo-900 flex items-center justify-center text-6xl"
                  onClick={() => router.push(`/watch?contentId=${item.id}&episode=1`)}
                >
                  {getTypeEmoji(item.type)}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
                      {getTypeLabel(item.type)}
                    </span>
                  </div>
                  <h3 
                    className="font-bold text-lg mb-1 text-purple-900 dark:text-purple-100 hover:text-purple-700 dark:hover:text-purple-300"
                    onClick={() => router.push(`/watch?contentId=${item.id}&episode=1`)}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-purple-600 dark:text-purple-300 mb-2">{item.year} • {item.genres.map(g => g.genre.name).join(', ')}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-purple-700 dark:text-purple-200">{item.rating}</span>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => addToWatchlist(item.id)}
                        className="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition-colors"
                      >
                        + Watchlist
                      </button>
                      <button 
                        onClick={() => router.push(`/watch?contentId=${item.id}&episode=1`)}
                        className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition-colors"
                      >
                        Watch
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && content.length === 0 && (
          <div className="text-center py-12 text-purple-600 dark:text-purple-300">
            No content found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}