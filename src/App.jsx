import React, { useEffect } from 'react'
import useHabitStore from './store/store'
import { Box, Container, Typography } from '@mui/material';
import AddHabitForm from './components/AddHabitForm';
import HabitList from './components/HabitList';

const App = () => {
  const store = useHabitStore();
  console.log(store)

  return (
    <Container className='p-20'>
      <Box>
        <Typography variant='h2' component="h1" gutterBottom align='center'>Habit Tracker</Typography>

        <AddHabitForm />

        <HabitList />
      </Box>
    </Container>
  )
}

export default App