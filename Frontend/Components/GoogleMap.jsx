import React, { useEffect, useState } from 'react';

const GoogleMap = () => {
  const [travelMode, setTravelMode] = useState('DRIVING');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCpkVfBVIeKF_yEQBOnFCxt_jlpN9iF53s&callback=initMap`;
    script.async = true;
    script.defer = true;
    window.initMap = initMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (window.google && window.google.maps) {
      calculateAndDisplayRoute();
    }
  }, [travelMode]);

  const initMap = () => {
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    const map = new window.google.maps.Map(document.getElementById('map'), {
     zoom: 11,
      center: { lat: -36.880184, lng: 174.754739 },
    });
    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById('directionsPanel'));

    const onChangeHandler = () => {
      calculateAndDisplayRoute(directionsService, directionsRenderer);
    };

    document.getElementById('start').addEventListener('change', onChangeHandler);
    document.getElementById('end').addEventListener('change', onChangeHandler);

    window.directionsService = directionsService;
    window.directionsRenderer = directionsRenderer;
  };

  const calculateAndDisplayRoute = () => {
    const { directionsService, directionsRenderer } = window;
    directionsService.route(
      {
        origin: { query: document.getElementById('start').value },
        destination: { query: document.getElementById('end').value },
        travelMode: window.google.maps.TravelMode[travelMode],
      },
      (response, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
  };

  return (
    <div>
      <div>
        <b>Start:</b>
        <input type="text" id="start" placeholder="Enter start location" />
        <b>End:</b>
        <input type="text" id="end" placeholder="Enter end location" />
        <b>Travel Mode:</b>
        <select
          id="travelMode"
          value={travelMode}
          onChange={(e) => setTravelMode(e.target.value)}
        >
          <option value="DRIVING">Driving</option>
          <option value="BICYCLING">Bicycling</option>
          <option value="TRANSIT">Transit</option>
          <option value="WALKING">Walking</option>
        </select>
      </div>
      <div id="map" style={{ height: '500px', width: '100%' }}></div>
      <div id="directionsPanel" style={{ height: '500px', width: '100%' }}></div>
    </div>
  );
};

export default GoogleMap;