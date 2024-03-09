import React, { useState, useEffect } from 'react';
import '../popup.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AiFillDelete, AiOutlineClose } from 'react-icons/ai';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { toast } from 'react-toastify';

interface WorkoutPlanPopupProps {
    setShowWorkoutPlanPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const WorkoutPlanPopup: React.FC<WorkoutPlanPopupProps> = ({ setShowWorkoutPlanPopup }) => {
    const [date, setDate] = useState<any>(dayjs(new Date()));
    const [exercise, setExercise] = useState<string>('');
    const [durationInMinutes, setDurationInMinutes] = useState<number>(0);
    const [workouts, setWorkouts] = useState<any[]>([]);
    const [cleared, setCleared] = useState<boolean>(false);

    const selectedDay = (val: any) => {
        setDate(val);
    };

    const saveWorkoutEntry = async () => {
        // Extracting the date string from the Dayjs object
        const dateString = date.format('YYYY-MM-DD');
        
        console.log("Date:", dateString);
        console.log("Exercise:", exercise);
        console.log("Duration:", durationInMinutes);
        
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/workoutplan/addworkoutentry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    date: dateString, // Using the dateString instead of the Dayjs object
                    exercise: exercise,
                    durationInMinutes: durationInMinutes,
                }),
            });
            const data = await response.json();
            console.log("Response:", data); // Log the response from the server
            if (data.ok) {
                toast.success('Workout entry added successfully');
                getWorkoutEntries();
            } else {
                toast.error('Error in adding workout entry');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error in adding workout entry');
        }
    };
    
    const getWorkoutEntries = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/workoutplan/getworkoutsbydate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    date: date,
                }),
            });
            const data = await response.json();
            if (data.ok) {
                console.log(data.data, 'workout entries for date');
                setWorkouts(data.data);
            } else {
                toast.error('Error in getting workout entries');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error in getting workout entries');
        }
    };

    const deleteWorkoutEntry = async (entry: any) => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/workoutplan/deleteworkoutentry', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    date: entry.date,
                }),
            });
            const data = await response.json();
            if (data.ok) {
                toast.success('Workout entry deleted successfully');
                getWorkoutEntries();
            } else {
                toast.error('Error in deleting workout entry');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error in deleting workout entry');
        }
    };

    useEffect(() => {
        getWorkoutEntries();
    }, [date]);

    return (
        <div className='popupout'>
            <div className='popupbox'>
                <button
                    className='close'
                    onClick={() => {
                        setShowWorkoutPlanPopup(false);
                    }}
                >
                    <AiOutlineClose />
                </button>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            position: 'relative',
                        }}
                    >
                        <DatePicker
                            sx={{ width: 260 }}
                            slotProps={{
                                field: { clearable: true, onClear: () => setCleared(true) },
                            }}
                            value={date}
                            onChange={(newValue: any) => {
                                selectedDay(newValue);
                            }}
                        />
                        {cleared && (
                            <Alert sx={{ position: 'absolute', bottom: 0, right: 0 }} severity='success'>
                                Field cleared!
                            </Alert>
                        )}
                    </Box>
                </LocalizationProvider>

                <TextField
                    id='outlined-basic'
                    label='Exercise'
                    variant='outlined'
                    onChange={(e) => {
                        setExercise(e.target.value);
                    }}
                />

                <TextField
                    id='outlined-basic'
                    label='Duration (in minutes)'
                    variant='outlined'
                    type='number'
                    onChange={(e) => {
                        setDurationInMinutes(parseInt(e.target.value));
                    }}
                />

                <Button className='save' variant='contained' onClick={saveWorkoutEntry}>
                    Save
                </Button>

                <div className='items'>
                    {workouts.map((entry: any, index: number) => (
                        <div className='item' key={index}>
                            <h3>{entry.exercise}</h3>
                            <h3>{entry.durationInMinutes} minutes</h3>
                            <h3>{dayjs(entry.date).format('YYYY-MM-DD')}</h3>
                            <button onClick={() => deleteWorkoutEntry(entry)}>
                                <AiFillDelete />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WorkoutPlanPopup;
