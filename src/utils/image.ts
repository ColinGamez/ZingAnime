// Image utilities

export function getPosterUrl(path: string | null, size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500'): string {
  if (!path) return '';
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export function getBackdropUrl(path: string | null, size: 'w300' | 'w780' | 'w1280' | 'original' = 'w780'): string {
  if (!path) return '';
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export function getPlaceholderImage(type: 'poster' | 'backdrop' = 'poster'): string {
  if (type === 'poster') {
    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="750" viewBox="0 0 500 750"%3E%3Crect fill="%23f3f4f6" width="500" height="750"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%239ca3af"%3ENo Image%3C/text%3E%3C/svg%3E';
  }
  return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720"%3E%3Crect fill="%23f3f4f6" width="1280" height="720"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32" fill="%239ca3af"%3ENo Image%3C/text%3E%3C/svg%3E';
}

export function getAvatarUrl(name: string, size: number = 40): string {
  const initial = name.charAt(0).toUpperCase();
  const colors = ['EF4444', 'F59E0B', '10B981', '3B82F6', '8B5CF6', 'EC4899'];
  const colorIndex = name.charCodeAt(0) % colors.length;
  const color = colors[colorIndex];
  
  return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"%3E%3Crect fill="%23${color}" width="${size}" height="${size}" rx="50%25"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="${size * 0.5}" fill="white"%3E${initial}%3C/text%3E%3C/svg%3E`;
}

export function getImageAspectRatio(type: 'poster' | 'backdrop' | 'avatar'): number {
  const ratios = {
    poster: 2 / 3,
    backdrop: 16 / 9,
    avatar: 1,
  };
  return ratios[type];
}