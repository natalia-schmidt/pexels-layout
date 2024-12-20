import React from 'react';

const MainImage = ({ image }) => {
  return (
    <>
      {/* Photographer's Name */}
      <a
        href={image.photographer_url}
        target="_blank"
        rel="noopener noreferrer"
        className="h5 text-primary mb-3"
      >
        {image.photographer}
      </a>

      {/* Main Image */}
      <img
        src={image.src.large}
        alt={image.alt}
        className="img-fluid rounded mb-3"
        style={{ maxHeight: '400px', objectFit: 'contain' }}
      />
    </>
  );
};

export default MainImage;