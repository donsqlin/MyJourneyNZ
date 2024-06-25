import React from 'react'
import Map from '../Map/Map.jsx'
import Modal from '../Modal/Modal.jsx'
import NavBar from '../NavBar/NavBar.jsx'

const Home = () => {
  return (
    <>
      {/* <div>
        <h1 className="text-center py-5 bg-lime-500">Events</h1>
      </div> */}
      <NavBar />
      <Map />
      <Modal />
    </>
  )
}

export default Home
