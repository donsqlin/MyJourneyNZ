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
      { lat: -36.846100, lng: 174.761390 },
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
