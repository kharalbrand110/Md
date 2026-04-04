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
      videoData = await getGenericData(url);
    }
    
    res.status(200).json(videoData);
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch video: ' + error.message });
  }
}

async function getYouTubeData(url) {
  const apiUrl = `https://p.oceansaver.in/ajax/download.php?url=${encodeURIComponent(url)}&format=mp4`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    return {
      title: data.title || 'YouTube Video',
      thumbnail: data.thumbnail || 'https://via.placeholder.com/400x225?text=YouTube',
      formats: [
        { quality: '720p', url: data.video_url || '#', type: 'video' },
        { quality: '480p', url: data.video_url || '#', type: 'video' },
        { quality: '360p', url: data.video_url || '#', type: 'video' },
        { quality: 'Audio Only', url: data.audio_url || '#', type: 'audio' }
      ]
    };
  } catch {
    return getMockData('YouTube Video');
  }
}

async function getFacebookData(url) {
  try {
    const apiUrl = `https://getvideo.cc/api/video-info?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    return {
      title: data.title || 'Facebook Video',
      thumbnail: data.thumbnail || 'https://via.placeholder.com/400x225?text=Facebook',
      formats: [
        { quality: 'HD', url: data.hd_url || data.sd_url || '#', type: 'video' },
        { quality: 'SD', url: data.sd_url || '#', type: 'video' }
      ]
    };
  } catch {
    return getMockData('Facebook Video');
  }
}

async function getTikTokData(url) {
  try {
    const apiUrl = `https://tikwm.com/api/?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (data.code === 0 && data.data) {
      return {
        title: data.data.title || 'TikTok Video',
        thumbnail: data.data.cover || 'https://via.placeholder.com/400x225?text=TikTok',
        formats: [
          { quality: 'No Watermark', url: data.data.play || '#', type: 'video' },
          { quality: 'With Watermark', url: data.data.wmplay || '#', type: 'video' },
          { quality: 'Audio Only', url: data.data.music || '#', type: 'audio' }
        ]
      };
    }
    throw new Error('No data');
  } catch {
    return getMockData('TikTok Video');
  }
}

async function getGenericData(url) {
  return getMockData('Video');
}

function getMockData(title) {
  return {
    title: title + ' - Demo Mode',
    thumbnail: 'https://via.placeholder.com/400x225?text=KHARAL-MD',
    formats: [
      { quality: 'Download Video', url: '#', type: 'video' }
    ]
  };
}
