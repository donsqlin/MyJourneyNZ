import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';

const names = [
  'Price',
  'Time',
  'Sustainability',
  'Convenience',
  'Accessability',
  'Popularity'
];

export default function TransportSelection({ changeAppProgressGrandparent1 }) {
  const [selected, setSelected] = React.useState([]);
  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelected(value);
  };

  return (
    <div>
      <div className='flex-column justify-center'>
        <p className='text-center'>dsd</p>
        <FormControl sx={{ m: 1, width: 200, height:250, marginTop:3 }}>
          <Select
            multiple
            native
            value={selected}
            onChange={handleChangeMultiple}
            label="Native"
            inputProps={{
              id: 'select-multiple-native',
            }}
          >
            {names.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className='flex justify-center mb-[100px] mt-[100px]'>
        <Button
          onClick={() => changeAppProgressGrandparent1(1)}
          variant="contained" sx={{ width: "300px" }}
        >
          Search
        </Button>
      </div>

    </div>
  );
}
