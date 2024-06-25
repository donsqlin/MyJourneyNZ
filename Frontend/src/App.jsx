import { useState, useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
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
    <Home/>
  );
}

export default App;
