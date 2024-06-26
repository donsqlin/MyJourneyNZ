import React, { useState } from 'react'
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, Skeleton, SwipeableDrawer, TextField, Typography } from '@mui/material';
import SearchButton from '../SearchButton/SearchButton';
import TransportSelection from '../transportSelection/TransportSelection';
import RouteSelection from '../RouteSelection/RouteSelection';

const JourneySelection = ({ changeAppProgressGrandparent }) => {
  const [modelProg, setModelProg] = useState(0)
  const [sortby, setSortby] = useState("")

  const changeSortBy = (sort) => {
    setSortby(sort)
  }

  const changeAppProgressGrandparent1 = (prog) => {
    changeAppProgressGrandparent(prog)
    setModelProg(prog)
  }

  return (

    <div className={modelProg == 0?'mt-10': 'mt-0' }>



      {modelProg == 0
        ? <p className='text-lg font-semibold mb-5 '>Plan your journey</p>
        : <h1 onClick={()=>{
          setModelProg(prev => prev - 1)
        }} className='text-6xl'>&#60;</h1>}

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <TextField
          sx={{ width: "400px", marginBottom: "10px", border: "1px solid black" }}
          id="Start point"
          label="Start point"
          variant="outlined"
        />
        <TextField
          sx={{ width: "400px", paddingTop: "5px", border: "1px solid black" }}
          id="Destination"
          label="Destination"
          variant="outlined"
        />

        {modelProg == 0
          ? <SearchButton changeAppProgressGrandparent1={changeAppProgressGrandparent1} />
          : (modelProg == 1
            ? <TransportSelection changeAppProgressGrandparent1={changeAppProgressGrandparent1} changeSortBy={changeSortBy} />
            : <RouteSelection sortby={sortby} />)}

      </div>


    </div>
  )
}

export default JourneySelection
