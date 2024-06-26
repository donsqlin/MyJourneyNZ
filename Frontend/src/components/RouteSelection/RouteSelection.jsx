import React from 'react'

const RouteSelection = ({ sortby }) => {



    return (
        <div>
            <div>
                <h1 className='font-bold'>{sortby}</h1>
            </div>

            <div>
                <h1 className='font-bold mt-[20px]'>Top Suggested Route</h1>
                <div className='border-2 mt-[20px]'>
                    
                </div>
            </div>

            <div>
                <h1 className='font-bold mt-[20px]'>Other Journeys</h1>
            </div>
        </div>
    )
}

export default RouteSelection
