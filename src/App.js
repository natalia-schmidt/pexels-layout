import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainImage from './components/MainImage';
import Thumbnails from './components/Thumbnails';
import SearchBar from './components/SearchBar';

const App = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchTopic, setSearchTopic] = useState('nature');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('topic') || 'nature'; // Default to 'nature' if no query string is present
    setSearchTopic(query);
  }, [location.search]);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const API_KEY = process.env.REACT_APP_API_KEY;
        const response = await axios.get('https://api.pexels.com/v1/search', {
          headers: { Authorization: API_KEY },
          params: { query: searchTopic, per_page: 15 }, // Fetch 15 images to fill the carousel
        });
        setImages(response.data.photos);
        setSelectedImage(response.data.photos[0]); // Default to the first image
        setSelectedIndex(0); // Set the first image as the selected one
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [searchTopic]);

  const handleImageSelection = (index) => {
    setSelectedImage(images[index]);
    setSelectedIndex(index);
  };

  const handleSearchChange = (newTopic) => {
    setSearchTopic(newTopic);
    navigate(`?topic=${newTopic}`);
  };

  const handleSearchSubmit = (newTopic) => {
    setSearchTopic(newTopic);
    navigate(`?topic=${newTopic}`);
  };

  // Function to handle navigation and update selectedIndex
  const handleNavigate = (newIndex) => {
    setSelectedIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <Sidebar
          images={images}
          selectedIndex={selectedIndex}
          onImageSelect={handleImageSelection}
        />
        <main className="col-9 d-flex flex-column align-items-center justify-content-center">
          <SearchBar
            searchTopic={searchTopic}
            onSearchChange={handleSearchChange}
            onSearchSubmit={handleSearchSubmit}
          />
          {loading ? (
            <p>Loading...</p>
          ) : selectedImage ? (
            <>
              <MainImage image={selectedImage} />
              <Thumbnails
                images={images}
                selectedIndex={selectedIndex}
                onThumbnailClick={handleImageSelection} // Update selected image here
                onNavigate={handleNavigate} // Pass the navigate function
              />
            </>
          ) : (
            <p>No images found for the topic "{searchTopic}".</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;