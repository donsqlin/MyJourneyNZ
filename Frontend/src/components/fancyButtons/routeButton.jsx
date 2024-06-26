import React from "react";
import { Box, Typography } from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DirectionsSubwayIcon from '@mui/icons-material/DirectionsSubway';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { styled } from '@mui/system';
import Atlogo from "../../assets/AT.svg";

const DottedLine = styled('div')({
    flexGrow: 1,
    height: '2px',
    borderTop: '2px dotted black',
    margin: '0 5px',
});

const AtRouterButton = ({ onClick }) => {
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
                cursor: 'pointer', // Add cursor style to indicate clickability
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
                <img src={Atlogo} alt="AT logo" className="w-[50px] h-[40px]" />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2">BUS</Typography>
                    <DirectionsBusIcon sx={{ color: 'black' }} />
                    <DottedLine />
                    <DirectionsSubwayIcon sx={{ color: 'black' }} />
                </Box>
                <Box sx={{ display:"flex", flexDirection:"column" }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                        <span className="line-through">$4.35</span> FREE
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                        53 MIN + delays
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
                    <Typography>WEST leaves 4:09pm from Parnell Train station</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default AtRouterButton;