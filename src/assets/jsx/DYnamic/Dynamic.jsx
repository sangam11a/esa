import React from 'react';
import FormSection from './FormSection';
import ColorPaletteSection from './ColorPaletteSection';
import DraggableCard from './DraggableCard';
import { downloadImage } from './ImageUtils';

const Dynamic = () => {

    return (
        <>
          <form action="">
            <h2>Add Image:</h2>
            <input type="text" name="name" id="name" onChange={handleName} />
            <input type="file" onChange={handleChange} />
          </form>
          <div className="card1" id="card1" style={{ background: generateGradient(cardColorName) }}>
            {name && <Draggable><div id="displayText" style={{ color: displayTextColor }}>{name}</div></Draggable>}
            {file && <Draggable><img src={file} alt="Uploaded" className="logo1" style={{ background: imageBackgroundColor }} /></Draggable>}
          </div>
          <button onClick={downloadImage}>Download Image</button>
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
        </>
      );}

export default Dynamic;
