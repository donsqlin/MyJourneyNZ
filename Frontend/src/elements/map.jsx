import { useEffect } from 'react';
import tt from '@tomtom-international/web-sdk-maps';

const TomTomMap = () => {
  useEffect(() => {
    const apiKey = import.meta.env.VITE_APP_TOMTOM_API_KEY;

    const map = tt.map({
      key: apiKey,
      container: 'map',
      center: [174.763336, -36.848461],
      zoom: 8
    });
    
    return () => {
        map.remove(); // Remove the map instance when component unmounts
    };
  }, []);

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
};

export default TomTomMap;