import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, Skeleton, SwipeableDrawer, TextField, Typography } from '@mui/material';
import JourneySelection from '../journeySelection/JourneySelection.jsx';
import TransportSelection from '../transportSelection/TransportSelection.jsx';

const Modal = ({ changeAppProgress, setStart, setDestination }) => {
  const [open, setOpen] = useState(false)
  const [modalProg, setModalProg] = useState(0)

  const changeAppProgressGrandparent = (prog) => {
    changeAppProgress(prog)
    setModalProg(prog)
  }

  let drawerBleeding = 56

  let container = window.document.body

  return (
    <div className='z-10 rounded-md flex flex-col items-center justify-center p-5'>
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <JourneySelection 
        changeAppProgressGrandparent={changeAppProgressGrandparent} 
        setStart={setStart} 
        setDestination={setDestination} 
        />
        
        <Skeleton variant="rectangular" height="100%" />
      </SwipeableDrawer>
    </div>
  );
};

export default Modal;
