import React from 'react'

const ColorCard = ({ colorName, onClick }) => {
    const divisions = (
      <div className="colorChoices" style={{ background: colorName }} onClick={() => onClick(colorName)}>
        {/* You can handle the click event here */}
      </div>
    );
    return divisions;
  };

  export default ColorCard;