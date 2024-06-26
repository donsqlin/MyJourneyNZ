import React, { useState, useRef } from 'react';
import Modal from '../Modal/Modal.jsx';
import GoogleMap from '../Map/GoogleMap.jsx';
import NavBar from '../NavBar/NavBar.jsx'
import NavBarDefault from '../NavBar/NavBarDefault.jsx';

const Home = () => {
  const [start, setStart] = useState('');
  const [destination, setDestination] = useState('');
  const [progress, setProgress] = useState(0);
  const [travelMode, setTravelMode] = useState('DRIVING');
  const googleMapRef = useRef();
  const [directions, setDirections] = useState("")

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

  const getDirections = (directions) =>{
    setDirections(directions)
  }

  const handleTravelModeChange = (mode) => {
    setTravelMode(mode);
    handleCalculateRoute();
  };

  return (
    <>
      <div>
        <h1 className='text-center py-5 bg-lime-500'>Events</h1>
      </div>
      {progress <= 1 
      ? <NavBarDefault />
      :<NavBar />}
      
      
      <GoogleMap ref={googleMapRef} start={start} end={destination} travelMode={travelMode} getDirections={getDirections} />
      <Modal 
        changeAppProgress={changeAppProgress} 
        setStart={setStart} 
        setDestination={setDestination}
        handleTravelModeChange={handleTravelModeChange} 
        directions={directions}
        start={start}
        destination={destination}
      />
    </>
  );
};

export default Home;
