import React, { useEffect, useState, useCallback } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import * as ttservices from '@tomtom-international/web-sdk-services';
import '@tomtom-international/web-sdk-maps/dist/maps.css';

const icons = {
  car: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="blue"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>',
  bus: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="green"><path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/></svg>',
  bicycle: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="red"><path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6.9-.6 1.4 0 .6.2 1.1.6 1.4L11 14v5h2v-6.2l-2.2-2.3zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"/></svg>'
};

const TomTomMap = () => {
  const [map, setMap] = useState(null);
  const [error, setError] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);

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

  const updateRouteStyle = useCallback(() => {
    if (!map) return;

    const travelModes = ['car', 'bus', 'bicycle'];
    travelModes.forEach(mode => {
      const layerId = `route-${mode}`;
      if (map.getLayer(layerId)) {
        map.setPaintProperty(layerId, 'line-opacity', mode === selectedRoute ? 1 : 0.5);
        map.setPaintProperty(layerId, 'line-width', mode === selectedRoute ? 6 : 4);
      }
    });
  }, [map, selectedRoute]);

  const calculateRoute = useCallback(async () => {
    if (!map) return;

    try {
      const startPoint = await geocodeAddress('51 Victor Street, Avondale, Auckland 1026');
      const endPoint = await geocodeAddress('130 Quay Street, Auckland CBD, Auckland 1010');

      if (!startPoint || !endPoint) {
        throw new Error('Failed to geocode addresses.');
      }

      // Ensure coordinates are valid numbers
      const start = startPoint.map(coord => parseFloat(coord).toFixed(6));
      const end = endPoint.map(coord => parseFloat(coord).toFixed(6));

      new tt.Marker().setLngLat([start[0], start[1]]).addTo(map);
      new tt.Marker().setLngLat([end[0], end[1]]).addTo(map);

      const travelModes = ['car', 'bus', 'bicycle'];
      const colors = {
        car: 'blue',
        bus: 'green',
        bicycle: 'red',
      };

      const routePromises = travelModes.map(async (mode) => {
        const routeResponse = await ttservices.services.calculateRoute({
          key: apiKey,
          locations: `${start[0]},${start[1]}:${end[0]},${end[1]}`,
          travelMode: mode,
        });
  
        if (!routeResponse || !routeResponse.routes || !routeResponse.routes[0]) {
          console.error(`Invalid response for ${mode}:`, routeResponse);
          return null; // Return null for this mode if the response is invalid
        }
  
        const geojson = routeResponse.toGeoJson();
  
        const layerId = `route-${mode}`;
        const sourceId = `route-${mode}`;
  
        if (map.getLayer(layerId)) {
          map.removeLayer(layerId);
        }
        if (map.getSource(sourceId)) {
          map.removeSource(sourceId);
        }
  
        map.addLayer({
          id: layerId,
          type: 'line',
          source: {
            type: 'geojson',
            data: geojson,
          },
          paint: {
            'line-color': colors[mode],
            'line-width': 4,
            'line-opacity': 0.5
          },
        });

        // Add click event to select route
        map.on('click', layerId, () => {
          setSelectedRoute(mode);
        });

        const coordinates = geojson.features[0].geometry.coordinates;
        const midpoint = coordinates[Math.floor(coordinates.length / 2)];
        
        const el = document.createElement('div');
        el.innerHTML = icons[mode];

        const getOffset = (percentageX, percentageY) => {
          const mapContainer = document.getElementById('map');
          const mapWidth = mapContainer.offsetWidth;
          const mapHeight = mapContainer.offsetHeight;
          const offsetX = (percentageX / 100) * mapWidth;
          const offsetY = (percentageY / 100) * mapHeight;
          return [offsetX, offsetY];
        };
        
        // Define different offsets for different modes
        const iconOffset = mode === 'car' ? getOffset(0, -2) : (mode === 'bus' ? getOffset(0, 7) : getOffset(0, 0));
        new tt.Marker({element: el, offset: new tt.Point(...iconOffset)})
          .setLngLat(midpoint)
          .addTo(map);
        
        // Extract ETA and create label with offset
        const { summary } = routeResponse.routes[0];
        const eta = Math.round(summary.travelTimeInSeconds / 60); // ETA in minutes
        const etaLabel = document.createElement('div');
        etaLabel.innerHTML = `<div style="background-color: white; padding: 5px; border-radius: 5px;">${eta} mins</div>`;
        
        // Define different offsets for ETA labels
        const etaOffset = mode === 'car' ? getOffset(5, -3) : (mode === 'bus' ? getOffset(5, 7) : getOffset(5, -1));
        new tt.Marker({element: etaLabel, offset: new tt.Point(...etaOffset)})
          .setLngLat(midpoint)
          .addTo(map);

        return geojson; // Return the geojson for this mode
      });
  
      // Wait for all route promises to resolve
      const routeGeojsons = await Promise.all(routePromises);
  
      // Filter out any null values (invalid responses)
      const validRouteGeojsons = routeGeojsons.filter(geojson => geojson !== null);
  
      // Calculate bounding box from route coordinates
      const bounds = new tt.LngLatBounds();
      validRouteGeojsons.forEach((geojson, index) => {
        const mode = travelModes[index];
        geojson.features[0].geometry.coordinates.forEach((coord) => {
          bounds.extend(new tt.LngLat(coord[0], coord[1]));
        });
      });
  
      map.fitBounds(bounds, { padding: 100 });
  
    } catch (error) {
      console.error(error);
      setError(`Route calculation error: ${error}`);
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
      setMap(mapInstance);
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

  useEffect(() => {
    if (map && selectedRoute) {
      updateRouteStyle();
    }
  }, [map, selectedRoute, updateRouteStyle]);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default TomTomMap;

