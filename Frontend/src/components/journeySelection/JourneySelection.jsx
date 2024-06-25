import React, { useState } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, Skeleton, SwipeableDrawer, TextField, Typography } from '@mui/material';
import SearchButton from '../SearchButton/SearchButton';
import TransportSelection from '../transportSelection/TransportSelection';

const JourneySelection = ({ changeAppProgressGrandparent }) => {
  const [modelProg, setModelProg] = useState(0)

  const changeAppProgressGrandparent1 = (prog) =>{
    changeAppProgressGrandparent(prog)
    setModelProg(prog)
  }

  return (
    <div>

      <p className='text-lg font-semibold mb-5'>Plan your journey</p>
      <TextField
        sx={{ width: "400px", marginBottom: "10px" }}
        id="Start point"
        label="Start point"
        variant="outlined"
      />
      <TextField
        sx={{ width: "400px", paddingTop: "5px" }}
        id="Destination"
        label="Destination"
        variant="outlined"
      />

      {modelProg == 0
      ? <SearchButton changeAppProgressGrandparent1 = {changeAppProgressGrandparent1}/>
      : <TransportSelection />}      

    </div>
  )
}

export default JourneySelection
