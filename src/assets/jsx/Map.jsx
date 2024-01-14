// import React from 'react';
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

// const MapComponent = withScriptjs(
//   withGoogleMap(props => (
//     <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
//       <Marker position={{ lat: -34.397, lng: 150.644 }} />
//     </GoogleMap>
//   ))
// );

// const MapPage = () => {
//   return (
//     <div style={{ width: '100%', height: '100vh' }}>
//       <MapComponent
//         googleMapURL={`https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`}
//         loadingElement={<div style={{ height: `100%` }} />}
//         containerElement={<div style={{ height: `100%` }} />}
//         mapElement={<div style={{ height: `100%` }} />}
//       />
//     </div>
//   );
// };

// export default MapPage;

import React, { useRef, useEffect } from 'react';

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const google = window.google;
    if (!google) return; // Check if Google Maps API is available

    const map = new google.maps.Map(mapRef.current, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });

    const marker = new google.maps.Marker({
      position: { lat: -34.397, lng: 150.644 },
      map: map,
      title: 'Marker Title',
    });

    // Add event listener to marker for showing info window
    marker.addListener('click', () => {
      const infowindow = new google.maps.InfoWindow({
        content: '<h3>Marker Information</h3><p>Marker Description</p>',
      });
      infowindow.open(map, marker);
    });
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
};

export default MapComponent;
