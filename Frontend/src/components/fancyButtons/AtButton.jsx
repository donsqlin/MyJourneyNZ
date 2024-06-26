import React from "react";
import { Box, Typography } from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DirectionsSubwayIcon from '@mui/icons-material/DirectionsSubway';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/system';
import Atlogo from "../../assets/AT.svg"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const DottedLine = styled('div')({
    flexGrow: 1,
    height: '2px',
    borderTop: '2px dotted black',
    margin: '0 5px',
});

const AtRouterButton = () => {
    return (
        <Box
            sx={{
                width: '100%',
                backgroundColor: 'white',
                color: 'black',
                border: "1px solid black",
                // borderRadius: '10px',
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
                <img src={Atlogo} className="w-[50px] h-[40px]"></img>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <DirectionsBusIcon sx={{ color: 'black', marginRight: "10px" }} />
                    <MoreHorizIcon />
                    <DirectionsSubwayIcon sx={{ color: 'black', marginRight: "10px" }} />
                    <MoreHorizIcon />
                    <SportsScoreIcon />

                </Box>
                <Box sx={{display:"flex", flexDirection:"column"}}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                        <span className="line-through">$4.35</span> FREE
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                        53 MIN +delays
                    </Typography>
                </Box>

            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection:"column",
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
                <Box className="w-[100%]">
                    <div className="flex flex-row items-center ml-[110px]">
                        <Typography>Sustainability</Typography>
                        <div className="w-[50px] h-[10px] bg-green-500 ml-[10px]"></div>
                        <div className="w-[50px] h-[10px] bg-orange-500"></div>
                        <div className="w-[50px] h-[10px]"></div>
                    </div>
                </Box>
            </Box>
        </Box>
    );
};

export default AtRouterButton;
