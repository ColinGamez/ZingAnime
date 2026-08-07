'use client';

import { useState, useEffect, Suspense } from 'react';
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
  backdropUrl: string | null;
  status: string;
  genres: ContentGenre[];
}

const genres = ['All', 'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mecha', 'Romance', 'Sci-Fi', 'Slice of Life', 'Thriller'];
const types = ['All', 'ANIME', 'KDRAMA', 'CDRAMA', 'JDRAMA'];

const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    'ANIME': 'Anime',
    'KDRAMA': 'K-Drama',
    'CDRAMA': 'C-Drama',
    'JDRAMA': 'J-Drama',
  };
  return labels[type] || type;
};

const getTypeEmoji = (type: string) => {
  const emojis: Record<string, string> = {
    'ANIME': '🎌',
    'JDRAMA': '🎭',
    'CDRAMA': '🏮',
    'KDRAMA': '🌸',
  };
  return emojis[type] || '📺';
};

const getTypeGradient = (type: string) => {
  const gradients: Record<string, string> = {
    'ANIME': 'from-red-500 via-pink-500 to-purple-600',
    'JDRAMA': 'from-pink-500 via-rose-500 to-red-500',
    'CDRAMA': 'from-amber-500 via-orange-500 to-red-600',
    'KDRAMA': 'from-purple-500 via-pink-500 to-rose-500',
  };
  return gradients[type] || 'from-gray-500 via-gray-600 to-gray-700';
};

const getGenreColor = (genre: string) => {
  const colors: Record<string, string> = {
    'Action': 'bg-red-500',
    'Adventure': 'bg-green-500',
    'Comedy': 'bg-yellow-500',
    'Drama': 'bg-purple-500',
    'Fantasy': 'bg-indigo-500',
    'Horror': 'bg-gray-800',
    'Mecha': 'bg-blue-500',
    'Romance': 'bg-pink-500',
    'Sci-Fi': 'bg-cyan-500',
    'Slice of Life': 'bg-teal-500',
    'Thriller': 'bg-orange-500',
  };
  return colors[genre] || 'bg-gray-500';
};

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const typeParam = searchParams.get('type') || 'All';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedType, setSelectedType] = useState(typeParam);
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [useExternalSearch, setUseExternalSearch] = useState(false);

  useEffect(() => {
    setSelectedType(typeParam);
  }, [typeParam]);

  useEffect(() => {
    if (useExternalSearch && searchTerm.length > 2) {
      searchExternal();
    } else if (!useExternalSearch) {
      fetchContent();
    }
  }, [searchTerm, selectedGenre, selectedType, useExternalSearch, searchTerm.length]);

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

  const searchExternal = async () => {
    if (!searchTerm) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/tmdb?q=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      
      // Convert TMDB results to our content format
      const convertedContent = [
        // TMDB movies
        ...(data.movies || []).map((item: any) => ({
          id: `tmdb-movie-${item.id}`,
          title: item.title,
          titleAlt: item.original_title,
          description: item.overview,
          type: 'ANIME', // Default to anime for movies
          year: item.release_date ? parseInt(item.release_date.split('-')[0]) : 2000,
          rating: item.vote_average || 8.0,
          posterUrl: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
          backdropUrl: item.backdrop_path ? `https://image.tmdb.org/t/p/w780${item.backdrop_path}` : null,
          status: 'Completed',
          genres: item.genres ? item.genres.map((g: any) => ({ genre: { name: g.name, id: g.id, slug: g.name.toLowerCase() } })) : [],
        })),
        // TMDB TV shows
        ...(data.tv || []).map((item: any) => ({
          id: `tmdb-tv-${item.id}`,
          title: item.name,
          titleAlt: item.original_name,
          description: item.overview,
          type: item.original_language === 'ko' ? 'KDRAMA' : 
                item.original_language === 'zh' ? 'CDRAMA' : 
                item.original_language === 'ja' ? 'ANIME' : 'JDRAMA',
          year: item.first_air_date ? parseInt(item.first_air_date.split('-')[0]) : 2000,
          rating: item.vote_average || 8.0,
          posterUrl: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
          backdropUrl: item.backdrop_path ? `https://image.tmdb.org/t/p/w780${item.backdrop_path}` : null,
          status: 'Ongoing',
          genres: item.genres ? item.genres.map((g: any) => ({ genre: { name: g.name, id: g.id, slug: g.name.toLowerCase() } })) : [],
        }))
      ];
      
      setContent(convertedContent);
    } catch (error) {
      console.error('Error searching external API:', error);
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
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-purple-300 dark:border-purple-700 bg-white dark:bg-gray-800 text-purple-900 dark:text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button
                onClick={() => setUseExternalSearch(!useExternalSearch)}
                className={`text-xs px-2 py-1 rounded ${useExternalSearch ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'} hover:opacity-80`}
              >
                {useExternalSearch ? '🎬 TMDB' : '📦 Local'}
              </button>
            </div>
          </div>
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
              <div 
                key={item.id} 
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-200 dark:border-gray-700"
              >
                {/* Card Image Area */}
                <div 
                  className={`relative h-64 overflow-hidden ${item.posterUrl ? '' : `bg-gradient-to-br ${getTypeGradient(item.type)}`} flex items-center justify-center`}
                  onClick={() => router.push(`/watch?contentId=${item.id}&episode=1`)}
                >
                  {item.posterUrl ? (
                    <img 
                      src={item.posterUrl} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', getTypeGradient(item.type));
                      }}
                    />
                  ) : (
                    <span className="text-6xl">{getTypeEmoji(item.type)}</span>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  {/* Type Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-white/20">
                      {getTypeLabel(item.type)}
                    </span>
                  </div>
                  
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-white/20 flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      {item.rating}
                    </span>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg line-clamp-2 group-hover:text-purple-300 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4">
                  {/* Genres */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.genres.slice(0, 3).map((g) => (
                      <span 
                        key={g.genre.id}
                        className={`px-2 py-1 ${getGenreColor(g.genre.name)} text-white text-xs font-medium rounded-full`}
                      >
                        {g.genre.name}
                      </span>
                    ))}
                  </div>

                  {/* Year and Info */}
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-4">
                    <span>{item.year}</span>
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {item.status}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => addToWatchlist(item.id)}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 text-sm flex items-center justify-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Watchlist
                    </button>
                    <button 
                      onClick={() => router.push(`/watch?contentId=${item.id}&episode=1`)}
                      className="flex-1 bg-gradient-to-r from-pink-600 to-rose-600 text-white py-2 px-4 rounded-lg font-medium hover:from-pink-700 hover:to-rose-700 transition-all duration-200 text-sm flex items-center justify-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      Watch
                    </button>
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

export default function Catalog() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-purple-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12 text-purple-600 dark:text-purple-300">
          Loading catalog...
        </div>
      </div>
    </div>}>
      <CatalogContent />
    </Suspense>
  );
}