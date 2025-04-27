import { Box, Button, Grid, LinearProgress, Paper, Typography } from '@mui/material'
import React from 'react'
import useHabitStore from '../store/store'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteIcon from '@mui/icons-material/Delete';
const HabitList = () => {

    const {
        habits, 
        removeHabit, 
        toggleHabit, 
        totalHabits, 
        completedHabits, 
        longestStreak,
    } = useHabitStore();

    const today = new Date().toISOString().split("T")[0];

    function getStreak(habit){
        let streak = 0;
        const currentDate = new Date();

        while(true){
            const dateString = currentDate.toISOString().split('T')[0];

            if(habit.completedDates.includes(dateString)){
                streak++;
                currentDate.setDate(currentDate.getDate() - 1 );
            }else{
                break;
            }
        }
        return streak;
    }

  return (
    <Box className="flex flex-col gap-2 mt-4 justify-between">
        {habits.map((habit) =>(
            <Paper key={habit.id} elevation={2} className='p-4'>
                <Grid container alignItems="center" className="flex justify-between">
                    <div className="">
                        <Typography variant='h6'>{habit.name}</Typography>
                        <Typography variant='body2' color='text.secondary'>{habit.frequency}</Typography>
                    </div>
                    <div className="">
                       <Box className="flex justify-end gap-2">
                            <Button variant='outlined'
                            color={habit.completedDates.includes(today) ? 'success' : 'primary'}
                            startIcon={<CheckCircleIcon />}
                            onClick={() => toggleHabit(habit.id, today)}
                            >
                                {habit.completedDates.includes(today)
                                ? "Completed"
                                : "Mark Complete"
                                }
                            
                            </Button>
                            <Button 
                            variant='outlined' 
                            color='error' 
                            startIcon={<DeleteIcon />} 
                            onClick={() => removeHabit(habit.id)}
                            >Remove</Button>
                       </Box>
                    </div>
                </Grid>

                <Box className="mt-4">
                    <Typography>Current Streak: {getStreak(habit)}</Typography>
                    <LinearProgress variant='determinate' value={(getStreak(habit) / 30 ) * 100} />
                </Box>
            </Paper>
        ))}

        <Box className="shadow-md">
            <Paper elevation={2} className='p-10' >
                <h1 className='text-2xl text-black font-bold'>Statistics</h1>
                <Typography>Total Habits: {totalHabits()}</Typography>
                <Typography>Completed Today: {completedHabits()}</Typography>
                <Typography>Longest Streak: {longestStreak().habitWithNameStreak} ({longestStreak().longest})</Typography>
            </Paper>
        </Box>
    </Box>
  )
}

export default HabitList