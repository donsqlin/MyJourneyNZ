import React, { useState, useRef } from 'react';
import Modal from '../Modal/Modal.jsx';
import GoogleMap from '../Map/GoogleMap.jsx';

const Home = () => {
  const [start, setStart] = useState('');
  const [destination, setDestination] = useState('');
  const [progress, setProgress] = useState(0);
  const [travelMode, setTravelMode] = useState('DRIVING');
  const googleMapRef = useRef();

  const changeAppProgress = (prog) => {
    setProgress(prog);
    console.log(prog);
    if (prog === 1) {
      handleCalculateRoute();
    }
  };

  const handleCalculateRoute = () => {
    if (googleMapRef.current) {
      googleMapRef.current.calculateRoute();
    }
  };

  const handleTravelModeChange = (mode) => {
    setTravelMode(mode);
    handleCalculateRoute();
  };

  return (
    <>
      <div>
        <h1 className='text-center py-5 bg-lime-500'>Events</h1>
      </div>
      <GoogleMap ref={googleMapRef} start={start} end={destination} travelMode={travelMode} />
      <Modal 
        changeAppProgress={changeAppProgress} 
        setStart={setStart} 
        setDestination={setDestination}
        handleTravelModeChange={handleTravelModeChange} 
      />
    </>
  );
};

export default Home;
