import React, { useState } from 'react';

const ImageFetcher = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isButtonVisible, setIsButtonVisible] = useState(true); // To control button visibility

  // Define the fetchImage function
  const fetchImage = async () => {
    try {
      const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=hM0VNweFeTGZ6kdcU7EQSWninH3zk6QAnkISSR5Q'); // Replace with your API endpoint
      const data = await response.json();
      setImageSrc(data.hdurl); // Assuming the API returns an object with an imageUrl field
      setIsButtonVisible(false);  // Hide button after image is fetched
    } catch (error) {
      console.error('Error fetching the image:', error);
    }

    
  };
  const goBack = () => {
    setImageSrc(null);  // Hide the image
    setIsButtonVisible(true);  // Show the "Show Image" button again
  };

  return (
    <div>
      <h1></h1>
      {/* Only show the button when it's visible */}
      {isButtonVisible ? (
        <button onClick={fetchImage}>Show Image</button>
      ) : null}

      {/* Display the image if available, otherwise show loading after button is clicked */}
      {imageSrc ? (
        <>
          <img 
            src={imageSrc} 
            alt="Fetched from API" 
            className="responsive-image" style={{ maxWidth: '500px', maxHeight: '500px', width: 'auto', height: 'auto' }}// Apply your CSS class
          />
          <br />
          {/* "Go Back" button becomes visible after the image is displayed */}
          <button onClick={goBack} style={{ marginTop: '20px' }}>Go Back</button>
        </>
      ) : (
        !isButtonVisible && <p>Loading image...</p>
      )}
    </div>
  );
};

export default ImageFetcher;
