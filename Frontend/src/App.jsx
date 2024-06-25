import { useState, useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import GoogleMap from '../Components/GoogleMap';
import Home from './components/Home/Home.jsx'

function App() {
  const [count, setCount] = useState(0);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [travelMode, setTravelMode] = useState('DRIVING');
  const googleMapRef = useRef();

  const handleCalculateRoute = () => {
    if (googleMapRef.current) {
      googleMapRef.current.calculateRoute();
    }
  };

  return (
    <>
    <Home/>
      <h1>Vite + React</h1>
      {/* GOOGLE MAPS */}

      {/* Input Entries to be sent to Google Map API */}
      <div>
        <b>Start:</b>
        <input
          type="text"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          placeholder="Enter start location"
        />
        <b>End:</b>
        <input
          type="text"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          placeholder="Enter end location"
        />
        <b>Travel Mode:</b>
        <select
          value={travelMode}
          onChange={(e) => setTravelMode(e.target.value)}
        >
          <option value="DRIVING">Driving</option>
          <option value="BICYCLING">Bicycling</option>
          <option value="TRANSIT">Transit</option>
          <option value="WALKING">Walking</option>
        </select>
        <button onClick={handleCalculateRoute}>Calculate Route</button>
      </div>

      <GoogleMap ref={googleMapRef} start={start} end={end} travelMode={travelMode} />
    </>
  );
}

export default App;
