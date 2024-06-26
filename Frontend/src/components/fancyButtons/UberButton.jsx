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
                // borderRadius: '10px',
                border: "1px solid black",
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
                    <ScheduleIcon sx={{ color: 'black', marginRight: '5px' }} />
                    <Typography sx={{}}>4 PM</Typography>
                    <div className="flex flex-row items-center ml-[50px]">
                        <Typography>Sustainability</Typography>
                                            
                        <div className="w-[50px] h-[10px] bg-green-500 ml-[10px]"></div>
                        <div className="w-[50px] h-[10px] bg-orange-500"></div>
                        <div className="w-[50px] h-[10px] bg-red-500"></div>
 
    
                    </div>
                </Box>
            </Box>
        </Box>
    );
};

export default UberButton;
