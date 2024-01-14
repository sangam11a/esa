import React, { useState, useRef } from 'react';
import '../css/Dynamic.css';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';

const downloadImage = () => {
  const card = document.getElementById('card1');

  html2canvas(card).then((canvas) => {
    const imageData = canvas.toDataURL('image/png');

    fetch('http://localhost:3001/saveImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageData }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Image saved on the server:', data);
      })
      .catch(error => {
        console.error('Error while saving image:', error);
      });
  });
};

const ColorCard = ({ cardColorName, onClick }) => {
  return (
    <div className="colorChoices" style={{ background: cardColorName }} onClick={() => onClick(cardColorName)}>
      {/* Handle the click event here */}
    </div>
  );
};

function Dynamic() {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [file, setFile] = useState('');
  const [name, setName] = useState('');
  const [cardColorName, setCardColorName] = useState('royalblue');
  const [displayTextColor, setDisplayTextColor] = useState('black');
  const [imageBackgroundColor, setImageBackgroundColor] = useState('white');
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedFile);
    setFile(imageUrl);
  };

  const handleBackgroundChange = (e) => {
    const selectedBackground = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedBackground);
    setBackgroundImage(imageUrl);
    setCardColorName(null);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleCardColor = (newColor) => {
    setCardColorName(newColor);
    setBackgroundImage(null);
  };

  const handleDisplayTextColor = (newColor) => {
    setDisplayTextColor(newColor);
  };

  const handleImageBackgroundColor = (newColor) => {
    setImageBackgroundColor(newColor);
  };

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  const GenerateColorTable = ({ onClick }) => {
    const table = [];
    const numRows = 5;
    const numCols = 5;

    for (let i = 0; i < numRows; i++) {
      const row = [];

      for (let j = 0; j < numCols; j++) {
        const color = generateRandomColor();
        row.push(
          <td key={`td-${i}-${j}`}>
            <ColorCard cardColorName={color} onClick={onClick} />
          </td>
        );
      }

      table.push(<tr key={`tr-${i}`}>{row}</tr>);
    }

    return table;
  };

  const replaceCode = (color) => {
    let colorArray = color.split('');
    let firstChar = color.charCodeAt(1);

    if (firstChar > 98 && firstChar <= 102) {
      colorArray[1] = String.fromCharCode(firstChar - 2);
    } else if (firstChar === 97) {
      colorArray[1] = '0';
    } else if (firstChar === 48) {
      colorArray[1] = '2';
    } else {
      colorArray[1] = String.fromCharCode(firstChar - 2);
    }

    return colorArray.join('');
  };

  const generateGradient = (color) => {
    return `linear-gradient(to right, ${replaceCode(color)} 30%, ${color} 100%)`;
  };

  return (
    <>
      <form action="">
        <section className="uploads">
          <h2>Add Background Image</h2>
          <input type="file" onChange={handleBackgroundChange} /><br />
          <h2>Add Logo:</h2>
          <input type="file" ref={fileInputRef} onChange={handleChange} /><br />
          <h2>Add Text</h2>
          <input type="text" name="name" id="name" onChange={handleName} />
        </section>
      </form>
      {!cardColorName ? (
        <div className="card1" id="card1" style={{ background: `url(${backgroundImage})`, backgroundSize:'contain' }}>
          {name && <Draggable bounds="parent"><div id="displayText" style={{ color: displayTextColor }}>{name}</div></Draggable>}
          {file && <Draggable bounds="parent"><img src={file} alt="Uploaded" className="logo1" style={{ background: imageBackgroundColor }} /></Draggable>}
        </div>
      ):
      (
        <div className="card1" id="card1" style={{ background: generateGradient(cardColorName) }}>
          {name && <Draggable bounds="parent"><div id="displayText" style={{ color: displayTextColor }}>{name}</div></Draggable>}
          {file && <Draggable bounds="parent"><img src={file} alt="Uploaded" className="logo1" style={{ background: imageBackgroundColor }} /></Draggable>}
        </div>
      )
      }
      {/* {cardColorName && (
        <div className="card1" id="card1" style={{ background: generateGradient(cardColorName) }}>
          {name && <Draggable><div id="displayText" style={{ color: displayTextColor }}>{name}</div></Draggable>}
          {file && <Draggable><img src={file} alt="Uploaded" className="logo1" style={{ background: imageBackgroundColor }} /></Draggable>}
        </div>
      )} */}
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
        <section></section>
      </div>
    </>
  );
}

export default Dynamic;
