import React, { useEffect, useState, useCallback } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import * as ttservices from '@tomtom-international/web-sdk-services';
import '@tomtom-international/web-sdk-maps/dist/maps.css';

const TomTomMap = () => {
  const [map, setMap] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_APP_TOMTOM_API_KEY;

  const geocodeAddress = useCallback(async (address) => {
    try {
      const response = await ttservices.services.geocode({
        key: apiKey,
        query: address,
      });
  
      if (response.results && response.results.length > 0) {
        const { position } = response.results[0];
        return [position.lng, position.lat];
      } else {
        throw new Error(`Geocoding failed for address: ${address}`);
      }
    } catch (error) {
      console.error(error);
      setError(`Geocoding error: ${error.message}`);
      return null;
    }
  }, [apiKey]);

  const calculateRoute = useCallback(async () => {
    if (!map) return;

    try {
      const startPoint = await geocodeAddress('Auckland CBD, New Zealand');
      const endPoint = await geocodeAddress('Auckland Airport, New Zealand');

      if (!startPoint || !endPoint) {
        throw new Error('Failed to geocode addresses.');
      }

      // Ensure coordinates are valid numbers
      const start = startPoint.map(coord => parseFloat(coord).toFixed(6));
      const end = endPoint.map(coord => parseFloat(coord).toFixed(6));

      const routeResponse = await ttservices.services.calculateRoute({
        key: apiKey,
        locations: `${start[0]},${start[1]}:${end[0]},${end[1]}`,
        computeBestOrder: false,
        travelMode: 'car',
      });

      const geojson = routeResponse.toGeoJson();

      console.log(geojson);

      // Remove existing route layer if it exists
      if (map.getLayer('route')) {
        map.removeLayer('route');
      }
      if (map.getSource('route')) {
        map.removeSource('route');
      }

      map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: geojson,
        },
        paint: {
          'line-color': 'blue',
          'line-width': 5,
        },
      });

      // Calculate bounding box from route coordinates
      const bounds = new tt.LngLatBounds();
      geojson.features[0].geometry.coordinates.forEach((coord) => {
        bounds.extend(new tt.LngLat(coord[0], coord[1]));
      });

      map.fitBounds(bounds, { padding: 100 });
    } catch (error) {
      console.error(error);
      setError(`Route calculation error: ${error.message}`);
    }
  }, [map, apiKey, geocodeAddress]);


  useEffect(() => {
    const initializeMap = () => {
      const mapInstance = tt.map({
        key: apiKey,
        container: 'map',
        center: [174.763336, -36.848461],
        zoom: 9,
      });
      
      mapInstance.on('load', () => {
        // Add traffic flow layer
        mapInstance.addLayer({
          id: 'traffic-flow',
          type: 'raster',
          source: {
            type: 'raster',
            tiles: [
              `https://api.tomtom.com/traffic/map/4/tile/flow/relative0/{z}/{x}/{y}.png?key=${apiKey}`
            ],
            tileSize: 256,
          },
          layout: {
            visibility: 'visible',
          },
        });

        setMap(mapInstance);
      });
    };

    initializeMap();

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [apiKey]);

  useEffect(() => {
    if (map) {
      calculateRoute();
    }
  }, [map, calculateRoute]);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default TomTomMap;
