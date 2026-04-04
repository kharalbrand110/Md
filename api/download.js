export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const { url, platform } = req.query;
  
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }
  
  try {
    // For different platforms
    let videoData = null;
    
    if (platform === 'youtube' || url.includes('youtube.com') || url.includes('youtu.be')) {
      videoData = await getYouTubeData(url);
    } 
    else if (platform === 'facebook' || url.includes('facebook.com')) {
      videoData = await getFacebookData(url);
    }
    else if (platform === 'tiktok' || url.includes('tiktok.com')) {
      videoData = await getTikTokData(url);
    }
    else {
      // Auto-detect
      videoData = await getGenericData(url);
    }
    
    res.status(200).json(videoData);
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch video', details: error.message });
  }
}

async function getYouTubeData(url) {
  // Using yt-dlp API service (free public API)
  const apiUrl = `https://p.oceansaver.in/ajax/download.php?url=${encodeURIComponent(url)}&format=mp4`;
  
  const response = await fetch(apiUrl);
  const data = await response.json();
  
  return {
    title: data.title || 'YouTube Video',
    thumbnail: data.thumbnail || 'https://via.placeholder.com/400x225',
    formats: [
      { quality: '1080p', url: data.video_url || '#', type: 'video' },
      { quality: '720p', url: data.video_url || '#', type: 'video' },
      { quality: '480p', url: data.video_url || '#', type: 'video' },
      { quality: 'Audio Only', url: data.audio_url || '#', type: 'audio' }
    ]
  };
}

async function getFacebookData(url) {
  // Facebook video download API
  const apiUrl = `https://getvideo.cc/api/video-info?url=${encodeURIComponent(url)}`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    return {
      title: data.title || 'Facebook Video',
      thumbnail: data.thumbnail || 'https://via.placeholder.com/400x225',
      formats: [
        { quality: 'HD', url: data.hd_url || data.sd_url, type: 'video' },
        { quality: 'SD', url: data.sd_url, type: 'video' }
      ]
    };
  } catch {
    return getGenericData(url);
  }
}

async function getTikTokData(url) {
  // TikTok without watermark API
  const apiUrl = `https://tikwm.com/api/?url=${encodeURIComponent(url)}`;
  
  const response = await fetch(apiUrl);
  const data = await response.json();
  
  if (data.code === 0) {
    return {
      title: data.data.title || 'TikTok Video',
      thumbnail: data.data.cover || 'https://via.placeholder.com/400x225',
      formats: [
        { quality: 'No Watermark', url: data.data.play, type: 'video' },
        { quality: 'With Watermark', url: data.data.wmplay, type: 'video' },
        { quality: 'Audio Only', url: data.data.music, type: 'audio' }
      ]
    };
  }
  
  throw new Error('Failed to fetch TikTok video');
}

async function getGenericData(url) {
  // Fallback using anyvideo API
  const apiUrl = `https://anyvideo.cc/api/download?url=${encodeURIComponent(url)}`;
  
  const response = await fetch(apiUrl);
  const data = await response.json();
  
  return {
    title: data.title || 'Video',
    thumbnail: data.thumbnail || 'https://via.placeholder.com/400x225',
    formats: [
      { quality: 'Best Quality', url: data.download_url, type: 'video' }
    ]
  };
}
