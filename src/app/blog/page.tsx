'use client';

import { useState, useEffect } from 'react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  author: string;
  category: string;
  published: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Recommendations': 'from-purple-500 to-pink-500',
      'Analysis': 'from-blue-500 to-indigo-500',
      'Guides': 'from-green-500 to-teal-500',
      'Comparison': 'from-orange-500 to-red-500',
      'Industry': 'from-cyan-500 to-blue-500',
      'Culture': 'from-rose-500 to-pink-500',
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  const getCategoryEmoji = (category: string) => {
    const emojis: Record<string, string> = {
      'Recommendations': '⭐',
      'Analysis': '🔍',
      'Guides': '📖',
      'Comparison': '⚖️',
      'Culture': '🎭',
      'Industry': '🏭',
    };
    return emojis[category] || '📰';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-purple-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-purple-900 dark:text-purple-100">
            Anime News & Insights
          </h1>
          <p className="text-xl text-purple-700 dark:text-purple-200 max-w-2xl mx-auto">
            Discover hidden gems, analysis, and the latest news from the world of Asian media
          </p>
        </div>
        
        {loading ? (
          <div className="text-center py-12 text-purple-600 dark:text-purple-300">
            Loading posts...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <article 
                key={post.id} 
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-100 dark:border-purple-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Article Image Area */}
                <div className="relative h-48 bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(post.category)} text-white text-xs font-bold rounded-full shadow-lg`}>
                      {getCategoryEmoji(post.category)} {post.category}
                    </span>
                  </div>

                  {/* Date Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                    </span>
                  </div>

                  {/* Decorative pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-4 right-4 w-24 h-24 border-2 border-white/30 rounded-full"></div>
                    <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-white/30 rounded-full"></div>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-3 text-purple-900 dark:text-purple-100 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-purple-700 dark:text-purple-200 mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {post.author.charAt(0)}
                      </div>
                      <span className="text-sm text-purple-600 dark:text-purple-300 font-medium">
                        {post.author}
                      </span>
                    </div>
                    <button className="text-purple-600 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read 
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div className="text-center py-12 text-purple-600 dark:text-purple-300">
            No blog posts found.
          </div>
        )}

        {!loading && posts.length > 0 && (
          <div className="mt-12 text-center">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              Load More Articles
            </button>
          </div>
        )}
      </div>
    </div>
  );
}