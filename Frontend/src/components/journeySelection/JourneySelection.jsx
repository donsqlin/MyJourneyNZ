import React, { useState } from 'react';
import { TextField } from '@mui/material';
import SearchButton from '../SearchButton/SearchButton';

const JourneySelection = ({ changeAppProgressGrandparent, setStart, setDestination }) => {
  const [start, setStartState] = useState('');
  const [destination, setDestinationState] = useState('');

  const changeAppProgressGrandparent1 = (prog) => {
    console.log('Start:', start);
    console.log('Destination:', destination);
    setStart(start);
    setDestination(destination);
    changeAppProgressGrandparent(prog);
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
        <SearchButton changeAppProgressGrandparent1={changeAppProgressGrandparent1} />
      </div>
    </div>
  );
};

export default JourneySelection;
