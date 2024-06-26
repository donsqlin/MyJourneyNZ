import React from "react";
import { Box, Typography } from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DirectionsSubwayIcon from '@mui/icons-material/DirectionsSubway';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { styled } from '@mui/system';
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Atlogo from "../../assets/AT.svg"

const DottedLine = styled('div')({
    flexGrow: 1,
    height: '2px',
    borderTop: '2px dotted black',
    margin: '0 5px',
});

const RouteButton = ({onClick}) => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'black',
        color: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        padding: '10px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <img src={Atlogo} className="w-[50px] h-[40px]"></img>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <DirectionsBusIcon sx={{ color: 'white', marginRight: "10px" }} />
          <MoreHoriz />
          <DirectionsSubwayIcon sx={{ color: 'white', marginRight: "10px" }} />
          <MoreHoriz />
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
      <Box className="w-[100%]">
        <div className="flex flex-row items-center ">
          <Typography>Sustainability</Typography>
          <div className="w-[50px] h-[10px] bg-green-500 ml-[10px]"></div>
          <div className="w-[50px] h-[10px] bg-orange-500"></div>
          <div className="w-[50px] h-[10px]"></div>
        </div>
      </Box>
    </Box>
  );
};

export default RouteButton;