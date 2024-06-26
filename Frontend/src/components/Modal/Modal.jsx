import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Skeleton, SwipeableDrawer, TextField, Typography } from '@mui/material';
import JourneySelection from '../journeySelection/JourneySelection.jsx';
import TransportSelection from '../transportSelection/TransportSelection.jsx';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: "grey",
}));

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: 'grey',
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

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
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: 'black' }}>51 results</Typography>
        </StyledBox>
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
