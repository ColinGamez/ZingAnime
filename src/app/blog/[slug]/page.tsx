'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/ui/Button';
import { Badge } from '@/ui/Badge';
import { Card } from '@/ui/Card';
import { LoadingSpinner } from '@/ui/LoadingSpinner';
import { EmptyState } from '@/ui/EmptyState';
import { Skeleton } from '@/ui/Skeleton';

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

function BlogPostDetail() {
  const params = useParams();
  const router = useRouter();
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPost();
  }, [params.slug]);

  const fetchPost = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      
      const foundPost = data.find((p: BlogPost) => p.slug === params.slug);
      
      if (foundPost) {
        setPost(foundPost);
      } else {
        setError('Post not found');
      }
    } catch (err) {
      setError('Failed to load post');
      console.error('Error fetching post:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <Skeleton variant="text" width="80%" height="48" />
            <Skeleton variant="text" width="60%" height="24" />
            <Skeleton variant="rectangular" width="100%" height="400" />
            <Skeleton variant="text" width="100%" height="20" />
            <Skeleton variant="text" width="100%" height="20" />
            <Skeleton variant="text" width="100%" height="20" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card variant="flat" padding="lg">
            <EmptyState
              title="Post not found"
              description="The blog post you're looking for doesn't exist or has been removed"
              action={
                <Button onClick={() => router.push('/blog')}>
                  Back to Blog
                </Button>
              }
            />
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            onClick={() => router.push('/blog')}
            className="mb-4"
          >
            ← Back to Blog
          </Button>
          
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="info">{post.category}</Badge>
            {post.publishedAt && (
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{post.author}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Author</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {post.excerpt && (
          <Card variant="elevated" padding="md" className="mb-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic">
              {post.excerpt}
            </p>
          </Card>
        )}

        <Card variant="flat" padding="lg">
          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </Card>
      </div>
    </div>
  );
}

export default function BlogPostPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </div>
    }>
      <BlogPostDetail />
    </Suspense>
  );
}