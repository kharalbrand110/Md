<!DOCTYPE html>
<html lang="ur">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <title>KHARAL-MD - Video Downloader</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
            color: #fff;
        }
        
        .top-bar {
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(10px);
            border-radius: 50px;
            padding: 8px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 25px;
            flex-wrap: wrap;
            gap: 15px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .logo-area {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .logo-img {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid #ff6b6b;
        }
        
        .brand-text {
            font-size: 24px;
            font-weight: bold;
            background: linear-gradient(135deg, #ff6b6b, #feca57);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }
        
        .whatsapp-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            background: #25D366;
            padding: 8px 18px;
            border-radius: 40px;
            text-decoration: none;
            color: white;
            font-weight: bold;
            transition: all 0.3s ease;
            font-size: 14px;
        }
        
        .whatsapp-btn:hover {
            background: #128C7E;
            transform: scale(1.05);
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px 25px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        h1 { text-align: center; margin-bottom: 10px; font-size: 28px; }
        .subtitle { text-align: center; margin-bottom: 30px; opacity: 0.9; font-size: 14px; }
        
        .platform-selector {
            display: flex;
            gap: 15px;
            margin-bottom: 25px;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .platform-btn {
            background: rgba(255, 255, 255, 0.2);
            border: 2px solid rgba(255, 255, 255, 0.3);
            padding: 10px 20px;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: bold;
        }
        
        .platform-btn.active { background: #ff6b6b; border-color: #ff6b6b; }
        .platform-btn:hover { transform: translateY(-2px); }
        
        .input-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 8px; font-weight: 500; }
        
        .url-input {
            width: 100%;
            padding: 15px;
            border: none;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.95);
            font-size: 16px;
            outline: none;
        }
        
        .fetch-btn {
            width: 100%;
            padding: 15px;
            background: linear-gradient(135deg, #ff6b6b, #feca57);
            border: none;
            border-radius: 12px;
            color: white;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            margin-bottom: 20px;
        }
        
        .fetch-btn:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.3); }
        .fetch-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        
        .loading { text-align: center; padding: 20px; display: none; }
        
        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(255,255,255,0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }
        
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        
        .result-box { display: none; margin-top: 20px; }
        
        .video-info {
            background: rgba(0,0,0,0.5);
            border-radius: 12px;
            padding: 15px;
            margin-bottom: 15px;
        }
        
        .video-title { font-size: 16px; font-weight: bold; margin-bottom: 10px; word-break: break-word; }
        .thumbnail { width: 100%; border-radius: 10px; margin-bottom: 10px; }
        
        .download-options { display: flex; flex-direction: column; gap: 10px; }
        
        .quality-select {
            width: 100%;
            padding: 12px;
            border-radius: 10px;
            border: none;
            font-size: 14px;
            background: rgba(255,255,255,0.9);
        }
        
        .download-btn {
            width: 100%;
            padding: 12px;
            background: #25D366;
            border: none;
            border-radius: 10px;
            color: white;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 16px;
        }
        
        .download-btn:hover { background: #128C7E; }
        
        .error-msg {
            background: rgba(255,0,0,0.7);
            padding: 12px;
            border-radius: 10px;
            text-align: center;
            display: none;
            margin-top: 15px;
        }
        
        .success-msg {
            background: rgba(37, 211, 102, 0.9);
            padding: 12px;
            border-radius: 10px;
            text-align: center;
            display: none;
            margin-top: 15px;
        }
        
        @media (max-width: 480px) {
            .container { padding: 20px 15px; }
            .brand-text { font-size: 18px; }
            .logo-img { width: 35px; height: 35px; }
        }
        
        .powered { text-align: center; font-size: 12px; margin-top: 15px; opacity: 0.8; }
    </style>
</head>
<body>
    <div class="top-bar">
        <div class="logo-area">
            <img src="https://i.postimg.cc/NfJxTRWy/1775276938074-1.jpg" alt="Logo" class="logo-img" onerror="this.src='https://via.placeholder.com/45'">
            <span class="brand-text">KHARAL-MD</span>
        </div>
        <a href="https://wa.me/923292359957" target="_blank" class="whatsapp-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.91-9.91-9.91zm0 18.23c-1.49 0-2.96-.4-4.24-1.16l-.3-.18-3.12.82.83-3.04-.2-.31c-.8-1.29-1.22-2.79-1.22-4.31 0-4.59 3.73-8.32 8.33-8.32 4.59 0 8.32 3.73 8.32 8.32 0 4.6-3.73 8.33-8.32 8.33zm4.56-6.23c-.25-.12-1.47-.73-1.7-.81-.23-.08-.39-.12-.56.12-.17.24-.66.81-.81.98-.15.17-.3.19-.55.07-.25-.12-1.05-.39-2.01-1.24-.74-.66-1.24-1.47-1.39-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.15.16-.25.24-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.41-.56-.42-.14-.01-.31-.01-.48-.01-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.57.12.17 1.74 2.66 4.21 3.73.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.22-.16-.47-.28z"/>
            </svg>
            WhatsApp Support
        </a>
    </div>
    
    <div class="container">
        <h1>📥 Video Downloader</h1>
        <div class="subtitle">YouTube | Facebook | TikTok</div>
        
        <div class="platform-selector">
            <div class="platform-btn active" data-platform="youtube">🎬 YouTube</div>
            <div class="platform-btn" data-platform="facebook">📘 Facebook</div>
            <div class="platform-btn" data-platform="tiktok">🎵 TikTok</div>
        </div>
        
        <div class="input-group">
            <label>🔗 Video Link Daalein:</label>
            <input type="text" id="videoUrl" class="url-input" placeholder="https://www.youtube.com/watch?v=...">
        </div>
        
        <button class="fetch-btn" onclick="fetchVideo()">📥 Get Video</button>
        
        <div class="loading" id="loading">
            <div class="spinner"></div>
            <p style="margin-top: 10px;">Processing ho raha hai...</p>
        </div>
        
        <div class="result-box" id="resultBox">
            <div class="video-info">
                <img id="thumbnail" class="thumbnail" src="" alt="Thumbnail">
                <div class="video-title" id="videoTitle"></div>
            </div>
            <div class="download-options">
                <select id="qualitySelect" class="quality-select">
                    <option value="">Pehle video fetch karein</option>
                </select>
                <button class="download-btn" onclick="downloadVideo()">⬇️ Download Karain</button>
            </div>
        </div>
        
        <div class="error-msg" id="errorMsg"></div>
        <div class="success-msg" id="successMsg"></div>
        <div class="powered">Powered by Kharal ❤️ By Love is taha</div>
    </div>
    
    <script>
        let currentVideoData = null;
        let currentPlatform = 'youtube';
        
        document.querySelectorAll('.platform-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.platform-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                currentPlatform = this.dataset.platform;
                
                const urlInput = document.getElementById('videoUrl');
                if(currentPlatform === 'youtube') urlInput.placeholder = 'https://www.youtube.com/watch?v=...';
                else if(currentPlatform === 'facebook') urlInput.placeholder = 'https://www.facebook.com/.../videos/...';
                else urlInput.placeholder = 'https://www.tiktok.com/@username/video/...';
                
                document.getElementById('resultBox').style.display = 'none';
                currentVideoData = null;
            });
        });
        
        async function fetchVideo() {
            const url = document.getElementById('videoUrl').value.trim();
            
            if(!url) {
                showError('Please enter a valid video link');
                return;
            }
            
            showLoading(true);
            hideError();
            hideSuccess();
            
            try {
                const response = await fetch(`/api/download?url=${encodeURIComponent(url)}&platform=${currentPlatform}`);
                const data = await response.json();
                
                if(data.error) {
                    throw new Error(data.error);
                }
                
                currentVideoData = data;
                displayVideoInfo(data);
                showLoading(false);
            } catch(error) {
                showLoading(false);
                showError('Error: ' + error.message);
            }
        }
        
        function displayVideoInfo(data) {
            document.getElementById('videoTitle').textContent = data.title;
            document.getElementById('thumbnail').src = data.thumbnail;
            
            const qualitySelect = document.getElementById('qualitySelect');
            qualitySelect.innerHTML = '<option value="">Select Quality</option>';
            
            data.formats.forEach((format, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = `${format.quality} - ${format.type.toUpperCase()}`;
                qualitySelect.appendChild(option);
            });
            
            document.getElementById('resultBox').style.display = 'block';
        }
        
        function downloadVideo() {
            if(!currentVideoData) {
                showError('Pehle video fetch karein');
                return;
            }
            
            const selectedIndex = document.getElementById('qualitySelect').value;
            if(selectedIndex === '') {
                showError('Please select a quality first');
                return;
            }
            
            const selectedFormat = currentVideoData.formats[parseInt(selectedIndex)];
            
            if(selectedFormat.url && selectedFormat.url !== '#') {
                const link = document.createElement('a');
                link.href = selectedFormat.url;
                link.download = `${currentVideoData.title}.mp4`;
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                showSuccess('Download starting... Mobile storage mein save hoga');
            } else {
                showError('Download link available nahi hai');
            }
        }
        
        function showLoading(show) {
            document.getElementById('loading').style.display = show ? 'block' : 'none';
            document.querySelector('.fetch-btn').disabled = show;
        }
        
        function showError(message) {
            const errorDiv = document.getElementById('errorMsg');
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
            setTimeout(() => errorDiv.style.display = 'none', 5000);
        }
        
        function hideError() {
            document.getElementById('errorMsg').style.display = 'none';
        }
        
        function showSuccess(message) {
            const successDiv = document.getElementById('successMsg');
            successDiv.textContent = message;
            successDiv.style.display = 'block';
            setTimeout(() => successDiv.style.display = 'none', 3000);
        }
        
        function hideSuccess() {
            document.getElementById('successMsg').style.display = 'none';
        }
    </script>
</body>
</html>
