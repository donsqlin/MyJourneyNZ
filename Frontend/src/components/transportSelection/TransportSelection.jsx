import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import { green } from '@mui/material/colors';
import personIcon from "../../assets/personIcon.svg"

const names = [
  'Price',
  'Time',
  'Sustainability',
  'Convenience',
  'Accessability',
  'Popularity'
];

export default function TransportSelection({ changeAppProgressGrandparent1, changeSortBy }) {
  const [sort, setSort] = useState("");
  const [pax, setPax] = useState(0)

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    changeSortBy(value)
    setSort(value);
  };

  return (
    <div>
      <div className='flex-column justify-center mt-[60px]'>
        <p className='text-center mt-[-50px]'>Sort by</p>
        <div className='flex justify-center'>
          <FormControl sx={{ m: 1, width: 300, height: 20, marginTop: 3 }}>
            <Select
              multiple
              native
              value={sort}
              onChange={handleChangeMultiple}
              label="Native"
              inputProps={{
                id: 'select-multiple-native',
              }}
            >
              {names.map((name) => (
                <option key={name} value={name} className='text-center'>
                  {name}
                </option>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className='flex flex-row space-x-4 mt-[110px] mb-[20px] border-2 w-[150px]'>
        <img className="w-[25px] h-[25px]" src={personIcon}></img>
        <p>{pax} pax</p>

        <div className='flex flex-row'>
          <div>
            <p className='border-r-2  text-4xl' onClick={() => {
              if (pax != 0) {
                setPax(prev => prev - 1)
              }
            }}>-</p>
          </div>
          <div>
            <p className='text-4xl '
              onClick={() => {
                setPax(prev => prev + 1)
              }}
            >+</p>
          </div>
        </div>

      </div>

      <div className='flex justify-center mb-[80px] mt-[120px]'>

        <Button
          onClick={() => changeAppProgressGrandparent1(2)}
          variant="contained" sx={{ width: "300px" }}
          disabled={sort ? false : true}
        >
          Search
        </Button>
      </div>

    </div>
  );
}
