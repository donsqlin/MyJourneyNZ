import React, { useEffect, useImperativeHandle, forwardRef } from 'react';

const GoogleMap = forwardRef(({ start, end, travelMode }, ref) => {
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
      initMap();
    }
  }, []);

  useImperativeHandle(ref, () => ({
    calculateRoute: () => {
      calculateAndDisplayRoute();
    },
  }));

  const initMap = () => {
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    const map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: { lat: -36.880184, lng: 174.754739 },
    });
    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById('directionsPanel'));

    window.directionsService = directionsService;
    window.directionsRenderer = directionsRenderer;
  };

  const calculateAndDisplayRoute = () => {
    const { directionsService, directionsRenderer } = window;
    directionsService.route(
      {
        origin: { query: start },
        destination: { query: end },
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
      <div id="map" style={{ height: '500px', width: '100%' }}></div>
      <div id="directionsPanel" style={{ height: '500px', width: '100%' }}></div>
    </div>
  );
});

export default GoogleMap;
