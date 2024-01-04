import React, { useState } from 'react';
import '../css/Dynamic.css';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';

const downloadImage = () => {
  const card = document.getElementById('card1');

  // Using html2canvas to capture the card element
  html2canvas(card).then((canvas) => {
    const imageData = canvas.toDataURL('image/png');
    // Create a new canvas element to draw the rounded image
    fetch('http://localhost:3001/saveImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageData }),
    })
      .then(response => {
        // Handle response if needed
        console.log('Image saved on the server');
      })
      .catch(error => {
        // Handle error if needed
        console.error('Error while saving image:', error);
      });
    const roundedCanvas = document.createElement('canvas');
    const roundedCanvasContext = roundedCanvas.getContext('2d');

    const { width, height } = canvas;
    const cornerRadius = 20; // Adjust the corner radius as needed

    roundedCanvas.width = width;
    roundedCanvas.height = height;

    // Draw the rounded rectangle on the new canvas
    roundedCanvasContext.beginPath();
    roundedCanvasContext.moveTo(cornerRadius, 0);
    roundedCanvasContext.lineTo(width - cornerRadius, 0);
    roundedCanvasContext.quadraticCurveTo(width, 0, width, cornerRadius);
    roundedCanvasContext.lineTo(width, height - cornerRadius);
    roundedCanvasContext.quadraticCurveTo(width, height, width - cornerRadius, height);
    roundedCanvasContext.lineTo(cornerRadius, height);
    roundedCanvasContext.quadraticCurveTo(0, height, 0, height - cornerRadius);
    roundedCanvasContext.lineTo(0, cornerRadius);
    roundedCanvasContext.quadraticCurveTo(0, 0, cornerRadius, 0);
    roundedCanvasContext.closePath();
    roundedCanvasContext.clip();
    roundedCanvasContext.drawImage(canvas, 0, 0, width, height);

    // Convert the canvas to a data URL and create a download link
    const link = document.createElement('a');
    link.download = 'table.png';
    link.href = roundedCanvas.toDataURL('image/png');
    link.click();
  });
};

const ColorCard = ({ cardColorName, onClick }) => {
  const divisions = (
    <div className="colorChoices" style={{ background: cardColorName }} onClick={() => onClick(cardColorName)}>
      {/* You can handle the click event here */}
    </div>
  );
  return divisions;
};

function Dynamic() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [cardColorName, setCardColorName] = useState('royalblue');
  const [displayTextColor, setDisplayTextColor] = useState('black');
  const [imageBackgroundColor, setImageBackgroundColor] = useState('white');

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedFile);
    setFile(imageUrl);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleCardColor = (newColor) => {
    setCardColorName(newColor);
  };

  const handleDisplayTextColor = (newColor) => {
    setDisplayTextColor(newColor);
  };

  const handleImageBackgroundColor = (newColor) => {
    setImageBackgroundColor(newColor);
  };

  const generateRandomColor = () => {
    // Generate a random hex color
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  const GenerateColorTable = ({ onClick }) => {
    const table = [];
    const numRows = 5; // Number of rows
    const numCols = 5; // Number of columns

    for (let i = 0; i < numRows; i++) {
      const row = [];
      
      for (let j = 0; j < numCols; j++) {
        const color = generateRandomColor();
        row.push(
          <td key={`td-${i}-${j}`}><ColorCard cardColorName={color} onClick={onClick} /></td>
        );
      }

      table.push(<tr key={`tr-${i}`}>{row}</tr>);
    }

    return table;
  };
  
  const replaceCode = (color) => {
    let colorArray = color.split(''); // Convert color string to array
    let firstChar = color.charCodeAt(1);
  
    if (firstChar > 98 && firstChar <= 102) {
      colorArray[1] = String.fromCharCode(firstChar - 2); // Decrement character code
    } else if (firstChar === 97) {
      colorArray[1] = '0';
    } else if (firstChar === 48) {
      colorArray[1] = '2';
    } else if (firstChar === 97) {
      colorArray[1] = String.fromCharCode(firstChar - 1);
    } else {
      colorArray[1] = String.fromCharCode(firstChar - 2); // Decrement character code
    }
  
    return colorArray.join(''); // Convert array back to string
  };
  
  const generateGradient = (color) => {
    console.log(color);
    return `linear-gradient(to right, ${replaceCode(color)} 30%, ${color} 100%)`;
  };
  
  // Example usage
  
 
  return (
    <>
      <form action="">
        <h2>Add Image:</h2>
        <input type="file" onChange={handleChange} /><br/>
        <h2>Add Text</h2>
        <input type="text" name="name" id="name" onChange={handleName} />
      </form>
      <div className="card1" id="card1" style={{ background: generateGradient(cardColorName) }}>
        {name && <Draggable><div id="displayText" style={{ color: displayTextColor }}>{name}</div></Draggable>}
        {file && <Draggable><img src={file} alt="Uploaded" className="logo1" style={{ background: imageBackgroundColor }} /></Draggable>}
      </div>
      <button onClick={downloadImage}>Download Image</button>
      <div className="cardColor">
      <section>
        <h3>Text Color Palette:</h3>
        <table>
          <tbody>
            <GenerateColorTable onClick={handleDisplayTextColor} />
          </tbody>
        </table>
      </section>
      <section>
        <h3>Card Background Color Palette:</h3>
        <table>
          <tbody>
            <GenerateColorTable onClick={handleCardColor} />
          </tbody>
        </table>
      </section>
      <section>
        <h3>Image Background Color Palette:</h3>
        <table>
          <tbody>
            <GenerateColorTable onClick={handleImageBackgroundColor} />
          </tbody>
        </table>
      </section>
      <section>
          
      </section>
      </div>
    </>
  );
}

export default Dynamic;
