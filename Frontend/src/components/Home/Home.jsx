import React, { useState } from 'react'
import Map from '../Map/Map.jsx'
import Modal from '../Modal/Modal.jsx'


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
        <Map />
        <Modal changeAppProgress= {changeAppProgress}/>
    </>
  )
}

export default Home
