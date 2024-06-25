import React, { useEffect, useImperativeHandle, forwardRef } from 'react';

const GoogleMap = forwardRef(({ start, end, travelMode }, ref) => {
  // Define initMap function
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

  // Effect to load Google Maps API script
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;

    // Define initMap in the global scope for Google Maps API to access
    window.initMap = initMap;

    // Append the script to the document head
    document.head.appendChild(script);

    // Clean up function to remove the script from the head
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Effect to initialize the map when Google Maps API is ready
  useEffect(() => {
    if (window.google && window.google.maps) {
      initMap(); // Initialize the map
    }
  }, []);

  // Expose a function to calculate and display route externally
  useImperativeHandle(ref, () => ({
    calculateRoute: () => {
      calculateAndDisplayRoute();
    },
  }));

  // Function to calculate and display route
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
      <div id="map" style={{ height: '710px', width: '100%' }}></div>
    </div>
  );
});

export default GoogleMap;