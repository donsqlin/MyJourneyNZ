import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, Skeleton, SwipeableDrawer, TextField, Typography } from '@mui/material';

const Modal = () => {

  const [time, setTime] = useState(0)
  const [open, setOpen] = useState(false)

  let drawerBleeding = 56

  let container = window.document.body
  const toggleDrawer = (newOpen) => {
    setOpen(newOpen)
  }

  // const Puller = styled('div')(({ theme }) => ({
  //   width: 30,
  //   height: 6,
  //   backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  //   borderRadius: 3,
  //   position: 'absolute',
  //   top: 8,
  //   left: 'calc(50% - 15px)',
  // }));

  return (
    <div className='z-10 rounded-md flex flex-col items-center justify-center p-5'>
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        // onClose={toggleDrawer(false)}
        // onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >

        <p className='text-lg font-semibold'>Plan your journey</p>
        <TextField
          sx={{ width: "400px" }}
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

        <div className='w-full mt-5 flex justify-center p-3 mb-5'>

          <Button variant="contained" sx={{ width: "300px" }}>Search</Button>

          <FormControl sx={{ width: "150px" }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={time}
              label="Time"
              onChange={(e) => {
                setTime(e.target.value)
              }}
            >
              <MenuItem value={0}>now</MenuItem>
              <MenuItem value={15}>15 Mins</MenuItem>
              <MenuItem value={30}>30 Mins</MenuItem>
              <MenuItem value={45}>45 Mins</MenuItem>
            </Select>
          </FormControl>

        </div>
        <Skeleton variant="rectangular" height="100%" />
      </SwipeableDrawer>
    </div>
  );
};

export default Modal;
