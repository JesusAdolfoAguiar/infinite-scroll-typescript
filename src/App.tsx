import React, { useEffect, useState } from 'react';
import './App.css';

const UnsplashGallery = () => {

  // Types
  interface Photo {
    id: string;
    links: {
      html: string;
    }
    urls: {
      regular: string;
    };
    alt_description: string;
  }

  const [photosArray, setPhotosArray] = useState<Array<Photo>>([]);
  const [isLoading, setIsLoading] = useState(true); // New state variable for loader

  // Unsplash API
  const count = 10;
  const apiKey = 'sRMzWTHYGGMwfzOEhLORigMi6c3mCRr5jycce4wiScc';
  const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  const loader = require("./loader.svg") as string;


  // Create Elements For Links & Photos, Add to DOM
  const displayPhotos = () => {
    return photosArray.map((photo) => (
      <a key={photo.id} href={photo.links.html} target="_blank" rel="noreferrer">
        <img
          src={photo.urls.regular}
          alt={photo.alt_description}
          title={photo.alt_description}
        />
      </a>
    ));
  };

  // Get photos from Unsplash API
  const getPhotos = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setPhotosArray([...photosArray, ...data]);
    } catch (error) {
      // Catch Error Here
    } finally {
      setIsLoading(false); // Set isLoading to false after data is fetched
    }
  };

  // Check to see if scrolling near bottom of page, Load More Photos
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 1000
    ) {
      getPhotos();
      console.log('load more');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Unsplash API - Infinite Scroll</h1>
      {isLoading ? ( // Render loader based on isLoading value
        <div className="loader" id="loader">
          <img src={loader} alt="Loading" />
        </div>
      ) : (
        <div className="image-container" id="image-container">{displayPhotos()}</div>
      )}
    </div>
  );
};

export default UnsplashGallery;
