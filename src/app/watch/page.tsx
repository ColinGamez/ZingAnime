'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import VideoPlayer from '@/components/VideoPlayer';

interface Episode {
  id: string;
  contentId: string;
  episodeNumber: number;
  title: string | null;
  description: string | null;
  duration: number | null;
  airDate: Date | null;
}

interface VideoSource {
  id: string;
  sourceType: string;
  sourceUrl: string;
  language: string;
  quality: string | null;
  isActive: boolean;
  priority: number;
}

export default function Watch() {
  const searchParams = useSearchParams();
  const contentId = searchParams.get('contentId');
  const episodeNumber = searchParams.get('episode');

  const [episode, setEpisode] = useState<Episode | null>(null);
  const [contentTitle, setContentTitle] = useState('');
  const [videoSources, setVideoSources] = useState<VideoSource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (contentId && episodeNumber) {
      fetchEpisode();
    }
  }, [contentId, episodeNumber]);

  const fetchEpisode = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/episode?contentId=${contentId}&episode=${episodeNumber}`);
      const data = await response.json();
      setEpisode(data.episode);
      setContentTitle(data.contentTitle);
      setVideoSources(data.videoSources);
    } catch (error) {
      console.error('Error fetching episode:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-purple-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12 text-purple-600 dark:text-purple-300">
            Loading episode...
          </div>
        </div>
      </div>
    );
  }

  if (!episode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-purple-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12 text-purple-600 dark:text-purple-300">
            Episode not found
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-purple-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-purple-900 dark:text-purple-100">
            {contentTitle}
          </h1>
          <p className="text-purple-700 dark:text-purple-300">
            Episode {episode.episodeNumber}: {episode.title || 'Untitled'}
          </p>
        </div>

        <VideoPlayer sources={videoSources} />

        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-2 text-purple-900 dark:text-purple-100">
            Episode Information
          </h2>
          {episode.description && (
            <p className="text-purple-700 dark:text-purple-200 mb-4">
              {episode.description}
            </p>
          )}
          <div className="flex gap-4 text-sm text-purple-600 dark:text-purple-300">
            {episode.duration && (
              <span>Duration: {episode.duration} minutes</span>
            )}
            {episode.airDate && (
              <span>Air Date: {new Date(episode.airDate).toLocaleDateString()}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}