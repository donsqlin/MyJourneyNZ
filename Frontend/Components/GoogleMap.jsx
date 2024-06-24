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
      center: { lat: 41.85, lng: -87.65 },
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
        <select id="start">
          <option value="Auckland, NZ">Auckland</option>
          <option value="St Louis, MO">St Louis</option>
          <option value="Joplin, MO">Joplin, MO</option>
          <option value="Oklahoma City, OK">Oklahoma City</option>
          <option value="Amarillo, TX">Amarillo</option>
          <option value="Gallup, NM">Gallup, NM</option>
          <option value="Flagstaff, AZ">Flagstaff, AZ</option>
          <option value="Winona, AZ">Winona</option>
          <option value="Kingman, AZ">Kingman</option>
          <option value="Barstow, CA">Barstow</option>
          <option value="San Bernardino, CA">San Bernardino</option>
          <option value="Los Angeles, CA">Los Angeles</option>
        </select>
        <b>End:</b>
        <select id="end">
          <option value="Wellington, NZ">Wellington, NZ</option>
          <option value="San Bernardino, CA">San Bernardino</option>
          <option value="Barstow, CA">Barstow</option>
          <option value="Kingman, AZ">Kingman</option>
          <option value="Winona, AZ">Winona</option>
          <option value="Flagstaff, AZ">Flagstaff</option>
          <option value="Gallup, NM">Gallup</option>
          <option value="Amarillo, TX">Amarillo</option>
          <option value="Oklahoma City, OK">Oklahoma City</option>
          <option value="Joplin, MO">Joplin, MO</option>
          <option value="St Louis, MO">St Louis</option>
          <option value="Chicago, IL">Chicago</option>
        </select>
      </div>
      <div id="map" style={{ height: '500px', width: '100%' }}></div>
      <div id="directionsPanel" style={{ height: '500px', width: '100%' }}></div>
    </div>
  );
};

export default GoogleMap;