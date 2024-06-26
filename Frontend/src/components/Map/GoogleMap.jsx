// import React, { useEffect, useImperativeHandle, forwardRef } from 'react';
// import blackAndWhiteStyle from '../../assets/blackandwhitestyle.json';


// const GoogleMap = forwardRef(({ start, end, travelMode }, ref) => {
//   // Define initMap function
//   const initMap = () => {
//     const directionsService = new window.google.maps.DirectionsService();
//     const directionsRenderer = new window.google.maps.DirectionsRenderer();
//     const map = new window.google.maps.Map(document.getElementById('map'), {
//       zoom: 11,
//       center: { lat: -36.880184, lng: 174.754739 },
//       zoomControl: false,
//       mapTypeControl: false,
//       scaleControl: false,
//       streetViewControl: false,
//       rotateControl: false,
//       fullscreenControl: false,
//       styles: blackAndWhiteStyle,
//       disableDefaultUI: true,
//       mapTypeId: 'roadmap',
//       backgroundColor: 'none'
//     });
//     directionsRenderer.setMap(map);
//     directionsRenderer.setPanel(document.getElementById('directionsPanel'));

//     window.directionsService = directionsService;
//     window.directionsRenderer = directionsRenderer;
//   };

//   // Effect to load Google Maps API script
//   useEffect(() => {
//     const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
//     const script = document.createElement('script');
//     script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
//     script.async = true;
//     script.defer = true;

//     // Define initMap in the global scope for Google Maps API to access
//     window.initMap = initMap;

//     // Append the script to the document head
//     document.head.appendChild(script);

//     // Clean up function to remove the script from the head
//     return () => {
//       document.head.removeChild(script);
//     };
//   }, []);

//   // Effect to initialize the map when Google Maps API is ready
//   useEffect(() => {
//     if (window.google && window.google.maps) {
//       initMap(); // Initialize the map
//     }
//   }, []);

//   // Expose a function to calculate and display route externally
//   useImperativeHandle(ref, () => ({
//     calculateRoute: () => {
//       calculateAndDisplayRoute();
//     },
//   }));

//   // Function to calculate and display route
//   const calculateAndDisplayRoute = () => {
//     const { directionsService, directionsRenderer } = window;
//     directionsService.route(
//       {
//         origin: { query: start },
//         destination: { query: end },
//         travelMode: window.google.maps.TravelMode[travelMode],
//       },
//       (response, status) => {
//         if (status === 'OK') {
//           directionsRenderer.setDirections(response);
//         } else {
//           window.alert('Directions request failed due to ' + status);
//         }
//       }
//     );
//   };

//   return (
//     <div>
//       <div id="map" style={{ height: '195vw', width: '100%' }}></div>
//     </div>
//   );
// });

// export default GoogleMap;

import React, { useEffect, useImperativeHandle, forwardRef } from 'react';
import blackAndWhiteStyle from '../../assets/blackandwhitestyle.json';
import currentLocationIcon from '../../assets/current-location-icon.svg';
import destinationFlagIcon from '../../assets/destination-flag-icon.svg';


const GoogleMap = forwardRef(({ start, end, travelMode }, ref) => {
  // Expose a function to calculate and display route externally
  useImperativeHandle(ref, () => ({
    calculateRoute: () => {
      if (start && end) {
        calculateAndDisplayRoute();
      } else {
        console.log('Start and End must be set before calculating route');
      }
    },
  }));
    // Define initMap function
  const initMap = () => {
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer({
      suppressMarkers: true // This will suppress the default A and B markers
    });
    const map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: { lat: -36.880184, lng: 174.754739 },
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      styles: blackAndWhiteStyle,
      disableDefaultUI: true,
      mapTypeId: 'roadmap',
      backgroundColor: 'none'
    });
    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById('directionsPanel'));

    window.directionsService = directionsService;
    window.directionsRenderer = directionsRenderer;
    window.map = map;
  };

   // Function to calculate and display route
  const calculateAndDisplayRoute = () => {
    const { directionsService, directionsRenderer, map } = window;
    directionsService.route(
      {
        origin: { query: start },
        destination: { query: end },
        travelMode: window.google.maps.TravelMode[travelMode],
      },
      (response, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(response);
  
          // Add markers for start and end points
          const route = response.routes[0];
          const startLocation = route.legs[0].start_location;
          const endLocation = route.legs[0].end_location;
  
          // Create and add the start marker (A)
          new window.google.maps.Marker({
            position: startLocation,
            map: map,
            icon: {
              url: currentLocationIcon,
              scaledSize: new window.google.maps.Size(30, 30), // Adjust size as needed
            },
            label: {
              text: 'A',
              color: 'white',
              fontSize: '14px',
            },
          });
  
          // Create and add the end marker (B)
          new window.google.maps.Marker({
            position: endLocation,
            map: map,
            icon: {
              url: destinationFlagIcon,
              scaledSize: new window.google.maps.Size(30, 30), // Adjust size as needed
            },
            label: {
              text: 'B',
              color: 'white',
              fontSize: '14px',
            },
          });
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
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
      initMap();
    }
  }, []);

  return (
    <div>
      <div id="map" style={{ height: '195vw', width: '100%' }}></div>
    </div>
  );
});

export default GoogleMap;
