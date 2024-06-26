import React from 'react'
// import RouteButton from '../fancyButtons/RouteButton.jsx'
import OtherRouterButton from '../fancyButtons/OtherRouterButtons.jsx'
import AtRouterButton from '../fancyButtons/AtButton.jsx'
import Beam1Button from '../fancyButtons/Beam1Button.jsx'
import Beam2Button from '../fancyButtons/Beam2Button.jsx'
import UberButton from '../fancyButtons/UberButton.jsx'

const RouteSelection = ({ sortby, handleTravelModeChange  }) => {



    return (
        <div >
            <div className=''>
                <h1 className='font-bold text-center'>{sortby}</h1>
            </div>

            <div>
                <h1 className='font-bold mt-[20px] text-center'>Top Suggested Route</h1>
                <div>
                    <OtherRouterButton onClick={() => handleTravelModeChange('TRANSIT')}/>
                </div>
            </div>

            <div className='flex flex-col justify-center'>
                <h1 className='font-bold mt-[20px] text-center'>Other Journeys</h1>
                <div className='max-h-[300px] overflow-y-auto'>

                     <div>
                       <AtRouterButton onClick={() => handleTravelModeChange('TRANSIT')} />
                    </div>
                    <div>
                        <Beam1Button onClick={() => handleTravelModeChange('BICYCLING')}/>
                    </div>
                    <div>
                        <Beam2Button onClick={() => handleTravelModeChange('BICYCLING')} />
                    </div>
                    <div>
                        <UberButton onClick={() => handleTravelModeChange('DRIVING')} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RouteSelection
