// import React, { useState } from 'react'
// import Modal from '../Modal/Modal.jsx'
// import GoogleMap from '../Map/GoogleMap.jsx'


// const Home = () => {

//   const [start, setStart] = useState()
//   const [destination, setDestination] = useState()
//   const [progress, setProgress] = useState(0)

//   const changeAppProgress = (prog) =>{
    
//     setProgress(prog)
//     console.log(prog)
//   }
  
//   return (
//     <>
//         <div>
//             <h1 className='text-center py-5 bg-lime-500'>Events</h1>
//         </div>
//         <GoogleMap start={start} destination={destination} progress={progress}/>
//         <Modal changeAppProgress= {changeAppProgress}/>
//     </>
//   )
// }

// export default Home


import React, { useState, useRef } from 'react';
import Modal from '../Modal/Modal.jsx';
import GoogleMap from '../Map/GoogleMap.jsx';
import NavBar from '../NavBar/NavBar.jsx'
import NavBarDefault from '../NavBar/NavBarDefault.jsx';

const Home = () => {
  const [start, setStart] = useState('');
  const [destination, setDestination] = useState('');
  const [progress, setProgress] = useState(0);
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

  return (
    <>
      <div>
        <h1 className='text-center py-5 bg-lime-500'>Events</h1>
      </div>
      {progress <= 1 
      ? <NavBarDefault />
      :<NavBar />}
      
      
      <GoogleMap ref={googleMapRef} start={start} end={destination} travelMode="TRANSIT" />
      <Modal 
        changeAppProgress={changeAppProgress} 
        setStart={setStart} 
        setDestination={setDestination} 
      />
    </>
  );
};

export default Home;
