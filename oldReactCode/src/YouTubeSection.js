import React, { useEffect, useState } from "react";

const CHANNEL_ID = "UCECUOW5LUwZWpWTGaKUFWXg";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

const YouTubeSection = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(FEED_URL)}`);
        const data = await response.json();
        if (data.items) {
          setVideos(data.items.slice(0, 5)); //get 5 videos
        }
      } catch (error) {
        console.error("Failed to fetch YouTube videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <section className="youtube-section">
      <h2>Latest Videos</h2>
      <div className="video-grid">
        {videos.map((video, index) => {
          const videoId = video.link.split("v=")[1];
          return (
            <div key={index} className="video-card">
              <iframe
                width="100%"
                height="200"
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
              <p>{video.title}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default YouTubeSection;