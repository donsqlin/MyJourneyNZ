import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Map() {
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/map')
      .then(response => {
        setMapData(response.data.mapData);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {mapData && (
        <div id="map" style={{ height: '500px', width: '100%' }} />
      )}
    </div>
  );
}

export default Map;