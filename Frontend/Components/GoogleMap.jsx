import React, { useEffect, useImperativeHandle, forwardRef } from 'react';
import scooterIconUrl from './assets/electric-scooter.png'; // Adjust the import path as necessary
import circleIconUrl from './assets/circle.png'; // Adjust the import path as necessary
import bicycleIconUrl from './assets/bicycle.png'; // Adjust the import path as necessary

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
      zoom: 14,
      center: { lat: -36.848461, lng: 174.763336 },
    });
    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById('directionsPanel'));

    // Generate random circles within a specific area
    const generateRandomCircles = (numCircles) => {
      const circles = [];
      const latMin = -36.875565;
      const latMax = -36.843080;
      const lngMin = 174.744255;
      const lngMax = 174.784437;

      for (let i = 0; i < numCircles; i++) {
        const lat = latMin + (latMax - latMin) * Math.random();
        const lng = lngMin + (lngMax - lngMin) * Math.random();
        circles.push({ lat, lng });
      }
      return circles;
    };

    const scooterLocations = [
      { lat: -36.848461, lng: 174.763336 },
      { lat: -36.852389, lng: 174.784437 },
      { lat: -36.875565, lng: 174.745255 },
      { lat: -36.844080, lng: 174.769170 },
      { lat: -36.846690, lng: 174.767502 },
      { lat: -36.850860, lng: 174.764907 },
      { lat: -36.849210, lng: 174.762820 },
      { lat: -36.851824, lng: 174.765570 },
      { lat: -36.852430, lng: 174.758990 },
      { lat: -36.850111, lng: 174.769220 },
      { lat: -36.844820, lng: 174.762840 },
      { lat: -36.846100, lng: 174.761390 }
    ];

    const circleLocations = [
      { lat: -36.847461, lng: 174.762336 },
      { lat: -36.851389, lng: 174.783437 },
      { lat: -36.874565, lng: 174.744255 },
      { lat: -36.843080, lng: 174.768170 },
      { lat: -36.845690, lng: 174.766502 },
      { lat: -36.849860, lng: 174.763907 },
      { lat: -36.848210, lng: 174.761820 },
      { lat: -36.850824, lng: 174.764570 },
      { lat: -36.851430, lng: 174.757990 },
      { lat: -36.849111, lng: 174.768220 },
      { lat: -36.843820, lng: 174.761840 },
      { lat: -36.845100, lng: 174.760390 },
      { lat: -36.849000, lng: 174.764000 },
      { lat: -36.846000, lng: 174.762500 },
      { lat: -36.850000, lng: 174.766000 },
      { lat: -36.845500, lng: 174.763500 },
      { lat: -36.847500, lng: 174.768000 },
      { lat: -36.844500, lng: 174.759000 },
      { lat: -36.850300, lng: 174.761300 },
      { lat: -36.846200, lng: 174.764200 },
      { lat: -36.848800, lng: 174.765800 },
      { lat: -36.849700, lng: 174.767700 },
      { lat: -36.850600, lng: 174.760600 },
      { lat: -36.844100, lng: 174.758100 },
      { lat: -36.851100, lng: 174.765100 },
      { lat: -36.845300, lng: 174.762300 },
      { lat: -36.846400, lng: 174.761400 },
      { lat: -36.848500, lng: 174.762900 },
      { lat: -36.843600, lng: 174.765000 },
      { lat: -36.849200, lng: 174.763600 },
      { lat: -36.845700, lng: 174.764700 },
      { lat: -36.847100, lng: 174.761100 },
      { lat: -36.844200, lng: 174.766200 },
      { lat: -36.850900, lng: 174.758900 },
      { lat: -36.849800, lng: 174.762200 },
      { lat: -36.846800, lng: 174.760800 },
      { lat: -36.844900, lng: 174.763900 },
      { lat: -36.851700, lng: 174.767800 },
      { lat: -36.845800, lng: 174.759800 },
      { lat: -36.849400, lng: 174.766400 },
      { lat: -36.848900, lng: 174.761500 },
      { lat: -36.846500, lng: 174.765500 },
      { lat: -36.850500, lng: 174.760200 },
      { lat: -36.844600, lng: 174.761200 },
      { lat: -36.847900, lng: 174.764800 },
      { lat: -36.843300, lng: 174.767300 },
      { lat: -36.849900, lng: 174.764300 },
      { lat: -36.848300, lng: 174.759300 },
      { lat: -36.846300, lng: 174.763300 },
      { lat: -36.850200, lng: 174.762800 }
    ];
    
    const bicycleLocations = [
      { lat: -36.849500, lng: 174.765500 },
      { lat: -36.845700, lng: 174.761700 },
      { lat: -36.847200, lng: 174.768200 },
      { lat: -36.850500, lng: 174.762500 },
      { lat: -36.846500, lng: 174.764500 }
    ];

    const scooterIcon = {
      url: scooterIconUrl, // Use the imported scooter icon
      scaledSize: new window.google.maps.Size(27, 27), // Adjust the size as needed
    };

    const circleIcon = {
      url: circleIconUrl, // Use the imported circle icon
      scaledSize: new window.google.maps.Size(15, 15), // Adjust the size as needed
    };

    const bicycleIcon = {
      url: bicycleIconUrl, // Use the imported bicycle icon
      scaledSize: new window.google.maps.Size(30, 30), // Adjust the size as needed
    };

    scooterLocations.forEach(location => {
      new window.google.maps.Marker({
        position: location,
        map: map,
        icon: scooterIcon,
      });
    });

    circleLocations.forEach(location => {
      new window.google.maps.Marker({
        position: location,
        map: map,
        icon: circleIcon,
      });
    });

    bicycleLocations.forEach(location => {
      new window.google.maps.Marker({
        position: location,
        map: map,
        icon: bicycleIcon,
      });
    });

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
