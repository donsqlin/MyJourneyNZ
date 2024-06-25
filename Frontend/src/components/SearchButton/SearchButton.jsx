import { Button, FormControl, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'

const SearchButton = ({changeAppProgressGrandparent1}) => {

    const [time, setTime] = useState(0)

    return (
        <div className='w-full mt-5 flex justify-center p-3 mb-5'>
            <Button
                onClick={() => changeAppProgressGrandparent1(1)}
                variant="contained" sx={{ width: "300px" }}
            >
                Search
            </Button>

            <FormControl sx={{ width: "150px" }}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={time}
                    label="Time"
                    onChange={(e) => {
                        setTime(e.target.value)
                    }}
                >
                    <MenuItem value={0}>now</MenuItem>
                    <MenuItem value={15}>15 Mins</MenuItem>
                    <MenuItem value={30}>30 Mins</MenuItem>
                    <MenuItem value={45}>45 Mins</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default SearchButton
