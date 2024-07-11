import React from 'react';

const Banner = () => {
  const bannerStyle = {
    backgroundImage: `linear-gradient(to right, #3498db, #2980b9)`, // Gradient background
    color: '#fff', // Text color
    padding: '20px',
    textAlign: 'center',
    position: 'relative',
    marginBottom: '20px', // Margin bottom for spacing under Navbar
    borderRadius: '5px', // Rounded corners
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' // Box shadow for depth
  };

  const contentStyle = {
    maxWidth: '800px',
    margin: '0 auto'
  };

  const message = "Design Your Signature Collection!  Choose, Customize, Logoize"; 

  return (
    <div style={bannerStyle}>
      <div style={contentStyle}>
        <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>{message}</h2>
        <p style={{ fontSize: '16px' }}>Create Unique Products with Personalized Logos - Design, Print, Impress</p>
        <button style={{ 
          padding: '10px 20px', 
          fontSize: '16px', 
          backgroundColor: '#fff', 
          color: '#3498db',
          border: 'none',
          borderRadius: '5px',
          marginTop: '10px',
          cursor: 'pointer'
        }}>Shop Now</button>
      </div>
    </div>
  );
};

export default Banner;
