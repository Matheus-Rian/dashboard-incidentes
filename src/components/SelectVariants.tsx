// src/components/SelectVariants.tsx
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectVariants() {
  const [bairro, setBairro] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setBairro(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Bairro</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={bairro}
          onChange={handleChange}
          label="Bairro"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="lorem">Lorem Ipsum</MenuItem>
          <MenuItem value="bairro1">Bairro 1</MenuItem>
          <MenuItem value="bairro2">Bairro 2</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Bairro</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={bairro}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="lorem">Lorem Ipsum</MenuItem>
          <MenuItem value="bairro1">Bairro 1</MenuItem>
          <MenuItem value="bairro2">Bairro 2</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}