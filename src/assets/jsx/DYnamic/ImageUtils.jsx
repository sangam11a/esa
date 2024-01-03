import html2canvas from 'html2canvas';

export const downloadImage = (elementId, roundedCanvas) => {
  const card = document.getElementById(elementId);

  html2canvas(card).then((canvas) => {
    const imageData = canvas.toDataURL('image/png');
    fetch('http://localhost:3001/saveImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageData }),
    })
      .then(response => {
        console.log('Image saved on the server');
      })
      .catch(error => {
        console.error('Error while saving image:', error);
      });

    // You can use roundedCanvas if needed for further processing
    // const roundedCanvas = document.createElement('canvas');
    // const roundedCanvasContext = roundedCanvas.getContext('2d');
    // ...
    // Additional logic for canvas processing or image manipulation
    // ...

    const link = document.createElement('a');
    link.download = 'table.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
};
