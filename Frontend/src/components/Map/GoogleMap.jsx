import React, {
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
} from 'react';
import blackAndWhiteStyle from '../../assets/blackandwhitestyle.json';
import currentLocationIcon from '../../assets/current-location-icon.svg';
import destinationFlagIcon from '../../assets/destination-flag-icon.svg';
import scooterIconUrl from '../../assets/electric-scooter.png';
import scooterLocationsData from '../../assets/scooterLocations.json';

const GoogleMap = forwardRef(({ start, end, travelMode }, ref) => {
  const [directionsData, setDirectionsData] = useState();
  const [showDirections, setShowDirections] = useState(false);

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

    if (travelMode === 'BICYCLING') {
      plotScooters(map);
    }
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
          setDirectionsData(response.routes[0].legs[0]);
          directionsRenderer.setDirections(response);
          setShowDirections(true);

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

          // Plot scooters if travel mode is BICYCLING
          if (travelMode === 'BICYCLING') {
            plotScooters(map);
          }
        } else {
          window.alert('Directions request failed due to ' + status);
          setShowDirections(false);
        }
      }
    );
  };

  // Function to plot scooters
  const plotScooters = (map) => {
    const scooterLocations = scooterLocationsData.scooterLocations;

    const scooterIcon = {
      url: scooterIconUrl,
      scaledSize: new window.google.maps.Size(27, 27),
    };

    scooterLocations.forEach(location => {
      new window.google.maps.Marker({
        position: location,
        map: map,
        icon: scooterIcon,
      });
    });
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
  }, [travelMode]); // Re-initialize the map when travelMode changes

  return (
    <div>
      <div id="map" style={{ height: '195vw', width: '100%' }}></div>
      {showDirections && directionsData && (
        <div className="border-t-2 border-black rounded-3xl">
          <div className="flex font-bold mt-2">
            <div className="flex gap-2">
              <div className="ml-2">
                {directionsData.departure_time ? directionsData.departure_time.text : 'No departure time available'}
              </div>
              <div>
                <img
                  src="../../src/assets/location-blue.png"
                  alt="location icon"
                  className="max-w-3"
                />
              </div>
            </div>
            <div className="ml-2">Depart from {start}</div>
          </div>

          <ul className="ml-2">
            {directionsData.steps.map((direction, index) => (
              <li key={index} className="flex items-center">
                <p className="w-20">{direction.duration.text}</p>
                <p className="font-bold text-2xl w-5">&#x2022;</p>
                <p className='w-[100vw]'>{direction.instructions}</p>
              </li>
            ))}
          </ul>

          <div className="flex font-bold justify-between">
            <div className="flex gap-2">
              <div className="ml-2">
                {directionsData.arrival_time ? directionsData.arrival_time.text : 'No arrival time available'}
              </div>
              <div>
                <img
                  src="../../src/assets/finish-flag-blue.png"
                  alt="finish flag icon"
                  className="max-w-3"
                />
              </div>
              <div>Arrive at {end}</div>
            </div>

            <div>
              <button className="bg-black text-white font-bold py-2 px-4 rounded mr-3 mb-5">
                Start
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default GoogleMap;
