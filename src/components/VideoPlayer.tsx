'use client';

import { useState } from 'react';

interface VideoSource {
  id: string;
  sourceType: string;
  sourceUrl: string;
  language: string;
  quality?: string;
  isActive: boolean;
  priority: number;
}

interface VideoPlayerProps {
  sources: VideoSource[];
  defaultSource?: VideoSource;
}

export default function VideoPlayer({ sources, defaultSource }: VideoPlayerProps) {
  const [currentSource, setCurrentSource] = useState(defaultSource || sources[0]);
  const [showSourceSelector, setShowSourceSelector] = useState(false);

  const activeSources = sources.filter(s => s.isActive);

  const renderEmbed = () => {
    if (!currentSource) return <div className="text-center py-12">No video source available</div>;

    switch (currentSource.sourceType) {
      case 'youtube':
        const videoId = extractYouTubeId(currentSource.sourceUrl);
        return (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );
      
      case 'vimeo':
        const vimeoId = extractVimeoId(currentSource.sourceUrl);
        return (
          <iframe
            className="w-full h-full"
            src={`https://player.vimeo.com/video/${vimeoId}`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        );
      
      case 'embed':
      default:
        return (
          <iframe
            className="w-full h-full"
            src={currentSource.sourceUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            sandbox="allow-same-origin allow-scripts allow-presentation"
          />
        );
    }
  };

  const extractYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : '';
  };

  const extractVimeoId = (url: string) => {
    const regExp = /vimeo\.com\/(\d+)/;
    const match = url.match(regExp);
    return match ? match[1] : '';
  };

  return (
    <div className="w-full bg-black">
      <div className="relative aspect-video">
        {renderEmbed()}
      </div>
      
      {/* Source Selector */}
      <div className="bg-gray-900 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold">Video Sources</h3>
          <button
            onClick={() => setShowSourceSelector(!showSourceSelector)}
            className="text-purple-400 hover:text-purple-300 text-sm"
          >
            {showSourceSelector ? 'Hide' : 'Show Sources'}
          </button>
        </div>
        
        {showSourceSelector && (
          <div className="space-y-2">
            {activeSources.map((source, index) => (
              <button
                key={source.id}
                onClick={() => setCurrentSource(source)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  currentSource.id === source.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Source {index + 1}</div>
                    <div className="text-sm opacity-75">
                      {source.sourceType} • {source.language}
                      {source.quality && ` • ${source.quality}`}
                    </div>
                  </div>
                  {currentSource.id === source.id && (
                    <span className="text-green-400">● Playing</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}