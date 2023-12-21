
import React from 'react';
// import 'assets/css/card1.css'; 
import '../css/card1.css';// Import your CSS file
import flapCardImage from '../images/flap_card.png';
import glassImage from '../images/glass.png';
import flapMenuImage from '../images/flap_menu.png';

const Card = ({  title, description }) => {
  let selectedImage;
console.log(title)
  switch (title) {
    case 'Introducing Flap':
      selectedImage = flapCardImage;
      break;
    case 'Vibe':
      selectedImage = glassImage;
      break;
    case 'Neon':
      selectedImage = flapMenuImage;
       // Set a default image if title doesn't match
      break;
  }

  const cardImageStyle = {
    backgroundImage: `url(${selectedImage})`,
    height: "300px", 
    backgroundSize: "cover", 
    backgroundRepeat:"no-repeat",
  };
  console.log(cardImageStyle);

  return (
    <div className="card">
      <div className="card-image" style={cardImageStyle}></div>
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="card-container">
      <Card
        title="Introducing Flap"
        description=" Your gateway to effortless connectivity. Experience instant contact sharing, seamless smartphone integration, and secure, sleek technology redefining networking convenience."
      />
      <Card
        title="Vibe"
        description=" Your music, their light. This coaster reacts to tunes, emanating radiant patterns. Elevate any setting with its synchronized spectacle—a harmony of sound and captivating luminescence."
      />
      <Card
        title="Neon"
        description="Illuminating Choices! Our sleek, vibrant LED-powered menu redefines dining. With its captivating glow and user-friendly design, it elevates your dining experience, guiding you through a world of culinary delights effortlessly."
      />
    </div>
  );
};

export default App;
