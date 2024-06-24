import React, { useEffect } from 'react';

const GoogleMap = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCpkVfBVIeKF_yEQBOnFCxt_jlpN9iF53s&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.initMap = initMap;
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initMap = () => {
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    const map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: { lat: -36.880184, lng: 174.754739 },
    });
    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById('directionsPanel'));

    const onChangeHandler = () => {
      calculateAndDisplayRoute(directionsService, directionsRenderer);
    };

    document.getElementById('start').addEventListener('change', onChangeHandler);
    document.getElementById('end').addEventListener('change', onChangeHandler);
  };

  const calculateAndDisplayRoute = (directionsService, directionsRenderer) => {
    directionsService.route(
      {
        origin: { query: document.getElementById('start').value },
        destination: { query: document.getElementById('end').value },
        travelMode: window.google.maps.TravelMode.DRIVING,
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
      </div>
      <div id="map" style={{ height: '500px', width: '100%' }}></div>
      <div id="directionsPanel" style={{ height: '500px', width: '100%' }}></div>
    </div>
  );
};

export default GoogleMap;