import React from 'react';

const FormSection = ({ handleChange, handleName }) => {
  return (
    <form action="">
      <h2>Add Image:</h2>
      <input type="text" name="name" id="name" onChange={handleName} />
      <input type="file" onChange={handleChange} />
    </form>
  );
};

export default FormSection;
