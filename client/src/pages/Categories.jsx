import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {useEffect, useState} from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
const Categories = () => {

   const ITEM_HEIGHT = 48;
   const ITEM_PADDING_TOP = 8;
   const MenuProps = {
     PaperProps: {
       style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 250,
       },
     },
   };

   const [personName, setPersonName] = useState([]);
   const [plays, setPlays] = useState([]);

   useEffect(() => {
    axios.get('/plays')
      .then(res => setPlays(res.data))
      .catch(err => console.log(err));
   }, []);

   const handleChange = (event) => {
     const {
       target: { value },
     } = event;
     setPersonName(
       // On autofill we get a stringified value.
       typeof value === 'string' ? value.split(',') : value,
     );
   };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <TextField label="Category Name"/>

        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps} >
                {plays.map((play) => (
                  <MenuItem key={play.play_id} value={play.play_name}>
                    <Checkbox checked={personName.indexOf(play.play_name) > -1} />
                    <ListItemText primary={play.play_name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

      </div>
      );
    }


export default Categories;