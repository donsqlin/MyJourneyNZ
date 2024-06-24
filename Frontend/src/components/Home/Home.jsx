import React from 'react'
import Map from '../Map/map.jsx'
import Modal from '../Modal/Modal.jsx'


const Home = () => {
  return (
    <>
        <div>
            <h1 className='text-center py-5 bg-lime-500'>Events</h1>
        </div>
        <Map />
        <Modal />
    </>
  )
}

export default Home
