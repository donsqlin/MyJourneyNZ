import React from 'react';

const Directions = ({ directionsData, start, end }) => {
  console.log(directionsData);

  if (!directionsData) return null;

  const createMarkup = (html) => {
    return { __html: html };
  };

  return (
    <div className="w-[380px] ">
      <div className="flex font-bold mt-2">
        <div className="flex gap-2">
          <div className="ml-2">
            {directionsData.departure_time ? directionsData.departure_time.text : 'No departure time available'}
          </div>
          <div>
            <img
              src="../../src/assets/location-blue.png"
              alt="location icon"
              className="max-w-3"
            />
          </div>
        </div>
        <div className="ml-2">Depart from {start}</div>
      </div>

      <ul className="ml-2">
        {directionsData.steps.map((direction, index) => (
          <li key={index} className="flex items-center">
            <p className="w-20">{direction.duration.text}</p>
            <p className="font-bold text-2xl w-5">&#x2022;</p>
            <div 
              className='w-[100vw]'
              dangerouslySetInnerHTML={createMarkup(direction.instructions)}
            />
          </li>
        ))}
      </ul>

      <div className="flex font-bold justify-between">
        <div className="flex gap-2">
          <div className="ml-2">
            {directionsData.arrival_time ? directionsData.arrival_time.text : 'No arrival time available'}
          </div>
          <div>
            <img
              src="../../src/assets/finish-flag-blue.png"
              alt="finish flag icon"
              className="max-w-3"
            />
          </div>
          <div>Arrive at {end}</div>
        </div>

        <div>
          <button className="bg-black text-white font-bold py-2 px-4 rounded mr-3 mb-5">
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Directions;