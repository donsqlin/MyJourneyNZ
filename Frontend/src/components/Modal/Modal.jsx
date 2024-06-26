import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Skeleton, SwipeableDrawer, TextField, Typography } from '@mui/material';
import JourneySelection from '../journeySelection/JourneySelection.jsx';
import TransportSelection from '../transportSelection/TransportSelection.jsx';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { Global } from '@emotion/react';
import DehazeIcon from '@mui/icons-material/Dehaze';

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: "white",
}));

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: 'black',
  borderRadius: 3,
  position: 'absolute',
  top: 880,
  left: 'calc(50% - 15px)',
}));

const Modal = ({ changeAppProgress, setStart, setDestination, handleTravelModeChange, directions, start, destination }) => {
  const [open, setOpen] = useState(false);
  const [modalProg, setModalProg] = useState(0);

  

  const changeAppProgressGrandparent = (prog) => {
    changeAppProgress(prog);
    setModalProg(prog);
  };

  let drawerBleeding = 56;
  let container = window.document.body;

  return (
    <div className=''>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            // height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />

      <SwipeableDrawer
        sx={{borderTop:"1px solid black"}}
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
          <div className='ml-[48%] mt-[10px] h-[50px]'>
            <DehazeIcon />
          </div>
        </StyledBox>
        <JourneySelection
            changeAppProgressGrandparent={changeAppProgressGrandparent}
            setStart={setStart}
            setDestination={setDestination}
          handleTravelModeChange={handleTravelModeChange} 
          directions={directions}
          start={start}
          destination={destination}
        />
        <Skeleton variant="rectangular" height="100%" />
      </SwipeableDrawer>
    </div>
  );
};

export default Modal;
