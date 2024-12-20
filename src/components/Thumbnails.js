import React, { useState, useEffect } from 'react';

const Thumbnails = ({ images, selectedIndex, onThumbnailClick, onNavigate }) => {
  const [photosPerPage, setPhotosPerPage] = useState(5); // Default number of thumbnails to show at once
  const totalImages = images.length;

  // Dynamically set photosPerPage based on screen width
  useEffect(() => {
    const updatePhotosPerPage = () => {
      if (window.innerWidth < 576) {
        setPhotosPerPage(3); // 3 thumbnails for small screens
      } else if (window.innerWidth < 768) {
        setPhotosPerPage(4); // 4 thumbnails for medium screens
      } else {
        setPhotosPerPage(5); // 5 thumbnails for large screens
      }
    };

    updatePhotosPerPage(); // Set initial photosPerPage
    window.addEventListener('resize', updatePhotosPerPage); // Recalculate on window resize

    return () => {
      window.removeEventListener('resize', updatePhotosPerPage); // Cleanup listener
    };
  }, []);

  const handleLeftClick = () => {
    const newSelectedIndex = selectedIndex - 1 < 0 ? totalImages - 1 : selectedIndex - 1; // Wrap around to last image if at the first one
    onNavigate(newSelectedIndex); // Navigate to the previous image
  };

  const handleRightClick = () => {
    const newSelectedIndex = selectedIndex + 1 >= totalImages ? 0 : selectedIndex + 1; // Wrap around to first image if at the last one
    onNavigate(newSelectedIndex); // Navigate to the next image
  };

  return (
    <div className="d-flex justify-content-center align-items-center position-relative">
      {/* Left button */}
      <button
        className="btn btn-outline-primary mx-2"
        onClick={handleLeftClick}
        disabled={totalImages <= 1} // Disable if there's only one image
      >
        &lt;
      </button>

      {/* Thumbnails container with slide transition */}
      <div
        className="d-flex"
        style={{
          overflow: 'hidden', // Hide anything overflowing the container
          width: `${photosPerPage * 80 + (photosPerPage - 1) * 8}px`, // Adjust width based on photosPerPage
        }}
      >
        <div
          className="d-flex"
          style={{
            transition: 'transform 0.5s ease', // Sliding transition
            transform: `translateX(-${selectedIndex * (80 + 8)}px)`, // Adjust to show the current image
          }}
        >
          {images.map((img, index) => (
            <img
              key={index} // Use index for a unique key
              src={img.src.small}
              alt={img.alt}
              className="mx-1"
              style={{
                width: '80px', // Fixed width for the full image
                height: '80px', // Fixed height for the full image
                objectFit: 'cover', // Ensures images cover the area without stretching
                cursor: 'pointer',
                border: selectedIndex === index ? '2px solid #007bff' : 'none', // Apply border for selected image
              }}
              onClick={() => onThumbnailClick(index)} // Adjust index based on current page
            />
          ))}
        </div>
      </div>

      {/* Right button */}
      <button
        className="btn btn-outline-primary mx-2"
        onClick={handleRightClick}
        disabled={totalImages <= 1} // Disable if there's only one image
      >
        &gt;
      </button>
    </div>
  );
};

export default Thumbnails;