// Design System Constants
// Production-grade design tokens for ZingAnime

export const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
  '4xl': '6rem',    // 96px
} as const;

export const fontSize = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem',    // 48px
} as const;

export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px',
} as const;

export const borderWidth = {
  none: '0',
  thin: '1px',
  medium: '2px',
  thick: '3px',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const animation = {
  fast: '150ms',
  base: '200ms',
  slow: '300ms',
  slower: '500ms',
} as const;

export const transition = {
  base: `all ${animation.base} cubic-bezier(0.4, 0, 0.2, 1)`,
  fast: `all ${animation.fast} cubic-bezier(0.4, 0, 0.2, 1)`,
  slow: `all ${animation.slow} cubic-bezier(0.4, 0, 0.2, 1)`,
} as const;

// Content type constants
export const contentTypes = {
  ANIME: 'ANIME',
  KDRAMA: 'KDRAMA',
  CDRAMA: 'CDRAMA',
  JDRAMA: 'JDRAMA',
} as const;

export const contentTypeLabels = {
  [contentTypes.ANIME]: 'Anime',
  [contentTypes.KDRAMA]: 'K-Drama',
  [contentTypes.CDRAMA]: 'C-Drama',
  [contentTypes.JDRAMA]: 'J-Drama',
} as const;

export const contentTypeEmojis = {
  [contentTypes.ANIME]: '🎌',
  [contentTypes.KDRAMA]: '🌸',
  [contentTypes.CDRAMA]: '🏮',
  [contentTypes.JDRAMA]: '🎭',
} as const;

// Watchlist status constants
export const watchlistStatus = {
  PLAN_TO_WATCH: 'Plan to Watch',
  WATCHING: 'Watching',
  COMPLETED: 'Completed',
  DROPPED: 'Dropped',
  ON_HOLD: 'On Hold',
} as const;

export const watchlistStatusColors = {
  [watchlistStatus.PLAN_TO_WATCH]: 'bg-gray-100 text-gray-800',
  [watchlistStatus.WATCHING]: 'bg-blue-100 text-blue-800',
  [watchlistStatus.COMPLETED]: 'bg-green-100 text-green-800',
  [watchlistStatus.DROPPED]: 'bg-red-100 text-red-800',
  [watchlistStatus.ON_HOLD]: 'bg-yellow-100 text-yellow-800',
} as const;

// Pagination constants
export const pagination = {
  defaultPageSize: 24,
  pageSizeOptions: [12, 24, 48, 96],
} as const;

// Image sizes
export const imageSizes = {
  poster: {
    xs: 'w-32 h-48',
    sm: 'w-40 h-60',
    md: 'w-48 h-72',
    lg: 'w-56 h-84',
  },
  backdrop: {
    sm: 'h-48',
    md: 'h-64',
    lg: 'h-96',
  },
} as const;

// Z-index layers
export const zIndex = {
  dropdown: 10,
  sticky: 20,
  navbar: 30,
  modal: 40,
  toast: 50,
} as const;