import React from 'react';

const HexColorTable = () => {
  const generateRandomColor = () => {
    // Generate a random hex color
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };



  const generateColorTable = ({handleCardColor}) => {
    const table = [];
    const numRows = 10; // Number of rows
    const numCols = 5; // Number of columns

    for (let i = 0; i < numRows; i++) {
      const row = [];
      for (let j = 0; j < numCols; j++) {
        const color = generateRandomColor();
        row.push(
          <td onClick={()=>handleCardColor(color)} key={`${i}-${j}`} style={{ backgroundColor: color, padding: '10px' }}>
            {/* Display only the background color */}
          </td>
        );
      }
      table.push(<tr key={i}>{row}</tr>);
    }

    return table;
  };

  return (
    <div>
      <h2>Hex Color Table</h2>
      <table>
        <tbody>{generateColorTable()}</tbody>
      </table>
    </div>
  );
};

export default HexColorTable;
