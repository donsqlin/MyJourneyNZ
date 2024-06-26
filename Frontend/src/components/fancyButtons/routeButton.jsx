import React from "react";
import { Box, Typography } from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DirectionsSubwayIcon from '@mui/icons-material/DirectionsSubway';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/system';

const DottedLine = styled('div')({
  flexGrow: 1,
  height: '2px',
  borderTop: '2px dotted white',
  margin: '0 5px',
});

const RouteButton = () => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#000',
        color: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        padding: '10px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <h3> BUS</h3>
          <DirectionsBusIcon sx={{ color: '#fff' }} />
          <DottedLine />
          <DirectionsSubwayIcon sx={{ color: '#fff' }} />
          <DottedLine />
          <SportsScoreIcon />

        </Box>
        <Typography sx={{ fontWeight: 'bold', fontSize: '1.2em' }}>
          4:10PM
        </Typography>
        <Typography sx={{ fontWeight: 'bold', fontSize: '1.2em' }}>
          FREE
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginTop: '10px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ScheduleIcon sx={{ color: '#fff', marginRight: '5px' }} />
          <Typography>45 MIN + delays</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RouteButton;
