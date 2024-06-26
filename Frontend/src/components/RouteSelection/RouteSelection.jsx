import React from 'react'
import RouteButton from '../fancyButtons/RouteButton.jsx'
import OtherRouterButton from '../fancyButtons/OtherRouterButtons.jsx'
import AtRouterButton from '../fancyButtons/AtButton.jsx'
import Beam1Button from '../fancyButtons/Beam1Button.jsx'
import Beam2Button from '../fancyButtons/Beam2Button.jsx'
import UberButton from '../fancyButtons/UberButton.jsx'

const RouteSelection = ({ sortby }) => {

    return (
        <div >
            <div className=''>
                <h1 className='font-bold text-center text-2xl'>{sortby}</h1>
            </div>

            <div>
                <h1 className='font-bold mt-[20px] text-center text-xl'>Top Suggested Route</h1>
                <div>
                    <RouteButton />
                </div>
            </div>

            <div className='flex flex-col justify-center'>
                <h1 className='font-bold mt-[20px] text-center text-xl'>Other Routes</h1>
                <div style={{border:"1px solid black"}} className='max-h-[300px] overflow-y-auto'>

                    <div>
                        <AtRouterButton />
                    </div>
                    <div>
                        <Beam1Button />
                    </div>
                    <div>
                        <Beam2Button />
                    </div>
                    <div>
                        <UberButton />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RouteSelection
