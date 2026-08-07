// Content-related constants
export const GENRES = [
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Fantasy',
  'Horror',
  'Mecha',
  'Romance',
  'Sci-Fi',
  'Slice of Life',
  'Thriller',
  'Mystery',
  'Supernatural',
  'Sports',
  'Music',
  'Psychological',
  'Isekai',
  'Historical',
  'Slice of Life',
];

export const SEASONS = ['Winter', 'Spring', 'Summer', 'Fall'];

export const CONTENT_FORMATS = [
  'TV',
  'TV Short',
  'OVA',
  'ONA',
  'Movie',
  'Special',
  'Music',
];

export const CONTENT_STATUS = [
  'Airing',
  'Completed',
  'Upcoming',
  'Cancelled',
];

export const GENRE_COLORS: Record<string, string> = {
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
  'Mystery': 'bg-violet-500',
  'Supernatural': 'bg-fuchsia-500',
  'Sports': 'bg-emerald-500',
  'Music': 'bg-rose-500',
  'Psychological': 'bg-slate-500',
  'Isekai': 'bg-amber-500',
  'Historical': 'bg-stone-500',
};

export const SORT_OPTIONS = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'rating', label: 'Rating' },
  { value: 'latest', label: 'Latest' },
  { value: 'title', label: 'Title (A-Z)' },
  { value: 'year', label: 'Year' },
];

export const FILTER_RANGES = {
  year: { min: 1950, max: new Date().getFullYear() + 2 },
  rating: { min: 0, max: 10 },
};

export const pagination = {
  defaultPageSize: 24,
  pageSizeOptions: [12, 24, 48, 96],
};