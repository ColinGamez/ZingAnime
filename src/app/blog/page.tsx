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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-purple-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-purple-900 dark:text-purple-100">Anime Blog & News</h1>
        
        {loading ? (
          <div className="text-center py-12 text-purple-600 dark:text-purple-300">
            Loading posts...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <article key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-purple-200 to-indigo-200 dark:from-purple-900 dark:to-indigo-900 flex items-center justify-center">
                  <span className="text-4xl">📰</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                    <span className="text-sm text-purple-600 dark:text-purple-300">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-2 text-purple-900 dark:text-purple-100 hover:text-purple-700 dark:hover:text-purple-300 cursor-pointer">
                    {post.title}
                  </h2>
                  <p className="text-purple-700 dark:text-purple-200 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-600 dark:text-purple-300">
                      By {post.author}
                    </span>
                    <button className="text-purple-600 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100 font-medium">
                      Read More →
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
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Load More Posts
            </button>
          </div>
        )}
      </div>
    </div>
  );
}