import React, { useState } from 'react'
import Modal from '../Modal/Modal.jsx'
import GoogleMap from '../Map/GoogleMap.jsx'


const Home = () => {

  const [start, setStart] = useState()
  const [destination, setDestination] = useState()
  const [progress, setProgress] = useState(0)

  const changeAppProgress = (prog) =>{
    
    setProgress(prog)
    console.log(prog)
  }
  
  return (
    <>
        <div>
            <h1 className='text-center py-5 bg-lime-500'>Events</h1>
        </div>
        <GoogleMap start={start} destination={destination} progress={progress}/>
        <Modal changeAppProgress= {changeAppProgress}/>
    </>
  )
}

export default Home
