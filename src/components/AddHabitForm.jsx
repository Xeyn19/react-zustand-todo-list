import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react'
import useHabitStore from '../store/store';

const AddHabitForm = () => {

    const [name, setName] = useState("");
    const [frequency, setFrequency] = useState("daily");

    const {habits ,addHabit} = useHabitStore();

    function handleSubmit(e){
      e.preventDefault();

      if(name.trim()){
        addHabit(name, frequency);
        setName("");
     
      }
    }

  return (
    <form onSubmit={handleSubmit}>
        <Box className="flex flex-col gap-4">
        <TextField 
        label="Habit Name"
        value={name}
        onChange={(e) => setName(e.target.value)} 
        placeholder='Enter Habit Name'
        fullWidth
        />
          <FormControl fullWidth>
            <InputLabel>Frequency</InputLabel>
            <Select
                label="frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
            >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
            </Select>
        </FormControl>
        <Button type="submit" variant="contained" color='primary'>ADD HABIT</Button>
        </Box>
    </form>
  )
}

export default AddHabitForm