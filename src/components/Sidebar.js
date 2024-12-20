import React, { useEffect, useRef } from 'react';
import './Sidebar.css';

const Sidebar = ({ images, selectedIndex, onImageSelect }) => {
  // Ref to track the button of the selected image for smooth scrolling
  const selectedButtonRef = useRef(null);

  // Scroll the selected button into view when selectedIndex changes
  useEffect(() => {
    if (selectedButtonRef.current) {
      selectedButtonRef.current.scrollIntoView({
        behavior: 'smooth', // Smooth scrolling
        block: 'center', // Center the selected button
      });
    }
  }, [selectedIndex]); // Trigger on selectedIndex change

  return (
    <aside
      className="col-3 bg-light d-flex flex-column align-items-center justify-content-center position-relative"
      style={{
        height: '100vh', // Full height of the viewport
      }}
    >
      <div
        className="d-flex flex-column w-100 custom-scrollbar"
        style={{
          height: 'calc(5 * 3rem)', // Restrict height to display a limited number of buttons
          overflowY: 'auto', // Enable scrolling for the sidebar if there are too many buttons
        }}
      >
        {/* Render a button for each image */}
        {images.map((_, index) => (
          <button
            key={index}
            ref={selectedIndex === index ? selectedButtonRef : null} // Set ref for the selected image
            className={`btn btn-outline-primary mb-2 w-100 ${
              selectedIndex === index ? 'active' : ''
            }`} // Apply 'active' class for the selected button
            onClick={() => onImageSelect(index)} // Handle image selection
          >
            Image {index + 1} {/* Display image index */}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;