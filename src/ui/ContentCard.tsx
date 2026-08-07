// Content card component for displaying anime/drama in grids
import { memo } from 'react';
import { useRouter } from 'next/navigation';
import { getPosterUrl, getPlaceholderImage } from '../utils/image';
import { formatRating, formatYear } from '../utils/formatting';
import { contentTypeLabels, contentTypeEmojis } from '../constants/design';
import { Badge } from './Badge';
import { Button } from './Button';

interface ContentCardProps {
  id: string;
  title: string;
  titleAlt?: string | null;
  posterUrl?: string | null;
  year: number;
  rating: number;
  type: string;
  genres?: Array<{ genre: { name: string } }>;
  status?: string;
  onAddToWatchlist?: (id: string) => void;
  isInWatchlist?: boolean;
}

export const ContentCard = memo(function ContentCard({
  id,
  title,
  titleAlt,
  posterUrl,
  year,
  rating,
  type,
  genres = [],
  status,
  onAddToWatchlist,
  isInWatchlist = false,
}: ContentCardProps) {
  const router = useRouter();
  const posterSrc = posterUrl ? getPosterUrl(posterUrl) : getPlaceholderImage('poster');

  const handleWatch = () => {
    router.push(`/watch?contentId=${id}&episode=1`);
  };

  const handleAddToWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToWatchlist?.(id);
  };

  return (
    <div 
      className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-200 cursor-pointer"
      onClick={() => router.push(`/content/${id}`)}
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden bg-gray-100">
        <img
          src={posterSrc}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = getPlaceholderImage('poster');
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        
        {/* Type Badge */}
        <div className="absolute top-2 left-2">
          <Badge variant="info" size="sm">
            {contentTypeEmojis[type as keyof typeof contentTypeEmojis] || '🎬'} {contentTypeLabels[type as keyof typeof contentTypeLabels] || type}
          </Badge>
        </div>

        {/* Rating Badge */}
        {rating > 0 && (
          <div className="absolute top-2 right-2">
            <Badge variant="success" size="sm">
              ★ {formatRating(rating)}
            </Badge>
          </div>
        )}

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="primary"
            size="sm"
            onClick={handleWatch}
            className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200"
          >
            Watch
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>
        {titleAlt && (
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mb-2">
            {titleAlt}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
          <span>{year}</span>
          {status && (
            <span className="text-xs">{status}</span>
          )}
        </div>

        {/* Genres */}
        {genres.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {genres.slice(0, 3).map((g, index) => (
              <Badge key={index} variant="default" size="sm">
                {g.genre.name}
              </Badge>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            fullWidth
            onClick={handleAddToWatchlist}
            disabled={isInWatchlist}
          >
            {isInWatchlist ? 'In Watchlist' : '+ Watchlist'}
          </Button>
        </div>
      </div>
    </div>
  );
});