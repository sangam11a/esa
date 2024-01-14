import React from 'react';
import Draggable from 'react-draggable';

const DraggableCard = ({ name, file, displayTextColor, imageBackgroundColor, generateGradient }) => {
  return (
   <section>
       <div className="card1" id="card1" style={{ background: generateGradient() }}>
        {name && <Draggable><div id="displayText" style={{ color: displayTextColor }}>{name}</div></Draggable>}
        {file && <Draggable><img src={file} alt="Uploaded" className="logo1" style={{ background: imageBackgroundColor }} /></Draggable>}
       </div>
   </section>
  );
};

export default DraggableCard;
