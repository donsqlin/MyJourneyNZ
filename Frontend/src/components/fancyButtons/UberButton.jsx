import React from "react";
import { Box, Typography } from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DirectionsSubwayIcon from '@mui/icons-material/DirectionsSubway';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/system';
import Atlogo from "../../assets/at-logo.png"
import UberLogo from "../../assets/Uber.svg"

const DottedLine = styled('div')({
    flexGrow: 1,
    height: '2px',
    borderTop: '2px dotted black',
    margin: '0 5px',
});

const UberButton = () => {
    return (
        <Box
            sx={{
                width: '100%',
                backgroundColor: 'white',
                color: 'black',
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
                <img src={UberLogo} className="w-[50px] h-[40px]"></img>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <h3 className="font-bold"> UBERX/UBER GREEN</h3>
                    {/* <DirectionsBusIcon sx={{ color: 'black' }} />
                    <DottedLine />
                    <DirectionsSubwayIcon sx={{ color: 'black' }} /> */}
                </Box>
                <Box sx={{display:"flex", flexDirection:"column"}}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                        $47.50
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                        30 MINS
                    </Typography>
                </Box>

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
                    <Typography sx={{fontSize: "10px"}}>WEST leaves 4:09pm from Parnell Train station</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default UberButton;
