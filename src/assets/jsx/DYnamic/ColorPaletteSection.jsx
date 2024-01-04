import React from 'react';
import GenerateColorTable from './GenerateColorTable';

const ColorPaletteSection = ({ title, colorTable, onClick }) => {
  return (
    <section>
      <h3>{title}</h3>
      <table>
        <tbody>
          <GenerateColorTable colorTable={colorTable} onClick={onClick} />
        </tbody>
      </table>
    </section>
  );
};

export default ColorPaletteSection;
