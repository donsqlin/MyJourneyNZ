import React from "react";
import { Box, Typography } from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DirectionsSubwayIcon from '@mui/icons-material/DirectionsSubway';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/system';
import Atlogo from "../../assets/at-logo.png"
import BeamLogo from "../../assets/beam.svg"

const DottedLine = styled('div')({
    flexGrow: 1,
    height: '2px',
    borderTop: '2px dotted black',
    margin: '0 5px',
});

const Beam1Button = () => {
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
                <img src={BeamLogo} className="w-[50px] h-[40px]"></img>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <h3 className="font-bold"> BEAM-BIKE 1 PAX</h3>
                    {/* <DirectionsBusIcon sx={{ color: 'black' }} />
                    <DottedLine />
                    <DirectionsSubwayIcon sx={{ color: 'black' }} /> */}
                </Box>
                <Box sx={{display:"flex", flexDirection:"column"}}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                        $21.01
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                        20 MIN
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
                    <Typography>3:50 PM</Typography>
                    <div className="flex flex-row items-center ml-[20px]">
                        <Typography>Sustainability</Typography>
                        <div className="w-[50px] h-[10px] bg-green-500 ml-[10px]"></div>
                        <div className="w-[50px] h-[10px] "></div>
                        <div className="w-[50px] h-[10px] "></div>
                    </div>
                </Box>
            </Box>
        </Box>
    );
};

export default Beam1Button;
