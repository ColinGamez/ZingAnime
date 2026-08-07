import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-purple-900 font-sans">
      <main className="flex flex-1 w-full max-w-6xl flex-col items-center justify-center py-20 px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-purple-900 dark:text-purple-100">
          Welcome to ZingAnime
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-purple-700 dark:text-purple-200 max-w-2xl">
          Your gateway to anime from the 2000s, 2010s, and underground gems
        </p>
        <div className="flex flex-col sm:flex-row gap-4 text-base font-medium">
          <Link
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-purple-600 px-8 text-white transition-colors hover:bg-purple-700 shadow-lg"
            href="/catalog"
          >
            Browse Catalog
          </Link>
          <Link
            className="flex h-12 items-center justify-center rounded-full border-2 border-purple-600 px-8 text-purple-600 transition-colors hover:bg-purple-600 hover:text-white"
            href="/watchlist"
          >
            My Watchlist
          </Link>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2 text-purple-900 dark:text-purple-100">Huge Catalog</h3>
            <p className="text-purple-700 dark:text-purple-200">Discover anime from the golden eras and hidden underground gems</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2 text-purple-900 dark:text-purple-100">Watch & Track</h3>
            <p className="text-purple-700 dark:text-purple-200">Stream episodes and keep track of your progress</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2 text-purple-900 dark:text-purple-100">Community</h3>
            <p className="text-purple-700 dark:text-purple-200">Read reviews, news, and connect with fellow anime fans</p>
          </div>
        </div>
      </main>
    </div>
  );
}