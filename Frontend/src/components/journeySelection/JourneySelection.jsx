import React, { useState } from 'react';
import { TextField } from '@mui/material';
import SearchButton from '../SearchButton/SearchButton';
import TransportSelection from '../transportSelection/TransportSelection';
import RouteButton from '../fancyButtons/RouteButton';

const JourneySelection = ({ changeAppProgressGrandparent, setStart, setDestination }) => {
  const [modelProg, setModelProg] = useState(0);
  const [start, setStartState] = useState('');
  const [destination, setDestinationState] = useState('');

  const changeAppProgressGrandparent1 = (prog) => {
    console.log('Start:', start);
    console.log('Destination:', destination);
    setStart(start);
    setDestination(destination);
    changeAppProgressGrandparent(prog);
    setModelProg(prog);
  };

  return (
    <div>
      <p className='text-lg font-semibold mb-5'>Plan your journey</p>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <TextField
          sx={{ width: '400px', marginBottom: '10px' }}
          id="start-point"
          label="Start point"
          variant="outlined"
          value={start}
          onChange={(e) => setStartState(e.target.value)}
        />
        <TextField
          sx={{ width: '400px', paddingTop: '5px' }}
          id="destination"
          label="Destination"
          variant="outlined"
          value={destination}
          onChange={(e) => setDestinationState(e.target.value)}
        />
        <h2>his</h2>
        <RouteButton />
        <h1>he</h1>

        {modelProg === 0 ? (
          <SearchButton changeAppProgressGrandparent1={changeAppProgressGrandparent1} />
        ) : (
          <TransportSelection changeAppProgressGrandparent1={changeAppProgressGrandparent1} />
        )}
      </div>
    </div>
  );
};

export default JourneySelection;