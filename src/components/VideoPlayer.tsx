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
  onEnded?: () => void;
}

export default function VideoPlayer({ sources, defaultSource, onEnded }: VideoPlayerProps) {
  const [currentSource, setCurrentSource] = useState(defaultSource || sources[0]);
  const [showSourceSelector, setShowSourceSelector] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const activeSources = sources.filter(s => s.isActive).sort((a, b) => b.priority - a.priority);

  const renderEmbed = () => {
    if (!currentSource) return <div className="text-center py-12">No video source available</div>;

    switch (currentSource.sourceType) {
      case 'youtube':
        const videoId = extractYouTubeId(currentSource.sourceUrl);
        return (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setLoading(false)}
            onError={() => { setLoading(false); setError(true); }}
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
            onLoad={() => setLoading(false)}
            onError={() => { setLoading(false); setError(true); }}
          />
        );
      
      case 'dailymotion':
        const dailymotionId = extractDailymotionId(currentSource.sourceUrl);
        return (
          <iframe
            className="w-full h-full"
            src={`https://www.dailymotion.com/embed/video/${dailymotionId}`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            onLoad={() => setLoading(false)}
            onError={() => { setLoading(false); setError(true); }}
          />
        );
      
      case 'gdrive':
        const gdriveId = extractGDriveId(currentSource.sourceUrl);
        return (
          <iframe
            className="w-full h-full"
            src={`https://drive.google.com/file/d/${gdriveId}/preview`}
            allow="autoplay; fullscreen"
            onLoad={() => setLoading(false)}
            onError={() => { setLoading(false); setError(true); }}
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
            onLoad={() => setLoading(false)}
            onError={() => { setLoading(false); setError(true); }}
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

  const extractDailymotionId = (url: string) => {
    const regExp = /dailymotion\.com\/video\/([^_]+)/;
    const match = url.match(regExp);
    return match ? match[1] : '';
  };

  const extractGDriveId = (url: string) => {
    const regExp = /drive\.google\.com\/file\/d\/([^/]+)/;
    const match = url.match(regExp);
    return match ? match[1] : '';
  };

  const handleSourceChange = (source: VideoSource) => {
    setLoading(true);
    setError(false);
    setCurrentSource(source);
  };

  return (
    <div className="w-full bg-black">
      <div className="relative aspect-video bg-gray-900">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="text-center">
              <p className="text-white mb-4">Video failed to load</p>
              <button 
                onClick={() => setShowSourceSelector(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                Try Another Source
              </button>
            </div>
          </div>
        )}
        
        {!error && renderEmbed()}
      </div>
      
      {/* Source Selector */}
      <div className="bg-gray-900 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold">Video Sources</h3>
          <button
            onClick={() => setShowSourceSelector(!showSourceSelector)}
            className="text-purple-400 hover:text-purple-300 text-sm"
          >
            {showSourceSelector ? 'Hide' : 'Show Sources'} ({activeSources.length})
          </button>
        </div>
        
        {showSourceSelector && (
          <div className="space-y-2">
            {activeSources.map((source, index) => (
              <button
                key={source.id}
                onClick={() => handleSourceChange(source)}
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
                      {source.sourceType.toUpperCase()} • {source.language}
                      {source.quality && ` • ${source.quality}`}
                    </div>
                  </div>
                  {currentSource.id === source.id && (
                    <span className="text-green-400">● Playing</span>
                  )}
                </div>
              </button>
            ))}
            
            {activeSources.length === 0 && (
              <div className="text-center text-gray-400 py-4">
                No video sources available
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}