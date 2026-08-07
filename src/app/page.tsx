import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 font-sans">
      {/* Hero Section */}
      <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900">
          <div className="absolute inset-0 bg-black/30"></div>
          {/* Animated circles */}
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-8 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              ZingAnime
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-2xl mx-auto leading-relaxed">
            Your ultimate gateway to anime from the 2000s, 2010s, and underground gems. 
            <span className="block mt-2 text-purple-200">Korean & Chinese anime + J/C/K Dramas</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-base font-medium">
            <Link
              className="group flex h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 text-white transition-all duration-300 hover:from-purple-700 hover:to-pink-700 hover:scale-105 shadow-2xl"
              href="/catalog"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Browse Catalog
            </Link>
            <Link
              className="group flex h-14 items-center justify-center gap-2 rounded-full border-2 border-white/30 px-8 text-white transition-all duration-300 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm"
              href="/watchlist"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              My Watchlist
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-purple-900 py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-purple-900 dark:text-purple-100">
            Why Choose ZingAnime?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-100 dark:border-purple-700">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-purple-900 dark:text-purple-100">Huge Catalog</h3>
              <p className="text-purple-700 dark:text-purple-200 leading-relaxed">
                Discover anime from the golden eras (2000s-2010s) and hidden underground gems you won't find anywhere else
              </p>
            </div>
            <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-100 dark:border-purple-700">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-purple-900 dark:text-purple-100">Watch & Track</h3>
              <p className="text-purple-700 dark:text-purple-200 leading-relaxed">
                Stream episodes in HD quality and keep track of your progress with our powerful watchlist system
              </p>
            </div>
            <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-100 dark:border-purple-700">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-purple-900 dark:text-purple-100">Community</h3>
              <p className="text-purple-700 dark:text-purple-200 leading-relaxed">
                Read reviews, news, and connect with fellow anime fans from around the world
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Types Section */}
      <div className="bg-white dark:bg-gray-800 py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-purple-900 dark:text-purple-100">
            All Your Asian Media in One Place
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Anime', emoji: '🎌', gradient: 'from-red-500 to-pink-600' },
              { name: 'K-Anime', emoji: '🇰🇷', gradient: 'from-blue-500 to-cyan-500' },
              { name: 'C-Anime', emoji: '🇨🇳', gradient: 'from-red-600 to-yellow-500' },
              { name: 'J-Drama', emoji: '🎭', gradient: 'from-pink-500 to-rose-500' },
              { name: 'C-Drama', emoji: '🏮', gradient: 'from-amber-500 to-red-600' },
              { name: 'K-Drama', emoji: '🌸', gradient: 'from-purple-500 to-pink-500' },
            ].map((type) => (
              <Link
                key={type.name}
                href={`/catalog?type=${type.name.toUpperCase().replace('-', '')}`}
                className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <span className="text-5xl mb-2 group-hover:scale-110 transition-transform">{type.emoji}</span>
                  <span className="font-bold text-lg">{type.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}