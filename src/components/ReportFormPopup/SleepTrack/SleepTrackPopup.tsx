import React, { useState, useEffect } from 'react';
import '../popup.scss';
import { TextField, Button } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

interface SleepIntakePopupProps {
    setShowSleepIntakePopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const SleepIntakePopup: React.FC<SleepIntakePopupProps> = ({ setShowSleepIntakePopup }) => {
    const [durationInHrs, setDurationInHrs] = useState('');
    const [sleepEntries, setSleepEntries] = useState<any[]>([]);
    const [date, setDate] = React.useState<any>(dayjs(new Date()))
    const [time, setTime] = React.useState<any>(dayjs(new Date()))
    const [items, setItems] = React.useState<any>([])

    // ---------------------------------------------------------------------------------
    const saveSleepIntake = async () => {
        let tempdate = dayjs(date).format('YYYY-MM-DD');
        let temptime = dayjs(time).format('HH:mm:ss');
        let tempdatetime = tempdate + ' ' + temptime;
        let finaldatetime = new Date(tempdatetime);

        console.log(finaldatetime + 'finaldatetime')

        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/sleeptrack/addsleepentry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                date: finaldatetime.toISOString(), // Ensure date is sent in ISOString format
                durationInHrs: parseFloat(durationInHrs), // Ensure durationInHrs is parsed as a float
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    toast.success('Sleep Intake Added successfully')
                    getsleepbydate()
                }
                else {
                    toast.error('Error in adding Sleep Intake')
                }
            })
            .catch(err => {
                toast.error('Error in adding Sleep Intake')
                console.log(err)
            })
    }
    // ---------------------------------------------------------------------------------
    const getsleepbydate = async () => {
        setSleepEntries([]);
        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/sleeptrack/getsleepbydate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                date: date,
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    console.log(data.data, 'Sleep intake data for date');
                    setSleepEntries(data.data);
                } else {
                    toast.error('Error in getting Sleep Intake');
                }
            })
            .catch(err => {
                toast.error('Error in getting Sleep Intake');
                console.log(err);
            });
    }
    // ---------------------------------------isnt working------------------------------------------
    const deleteSleepEntry = async (date: any) => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/sleeptrack/deleteSleepEntry', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                date: date.date,
                entryId: date.entryId,
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    toast.success('Sleep entry deleted successfully');
                    getsleepbydate();
                } else {
                    toast.error('Error in deleting Sleep entry');
                }
            })
            .catch(err => {
                toast.error('Error in deleting Sleep entry');
                console.log(err);
            });
    }
    // --------------------------------------------------------------------------------
    const getCalorieintakebylimit = async () => {
        setItems([]);
        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/sleeptrack/getsleepbylimit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                limit: 10 // Assuming you want to retrieve sleep entries for the last 10 days
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) { // Assuming `ok` is replaced with `success` in the response
                console.log(data.message, 'sleep intake data for the dates');
                setItems(data.data); // Assuming sleep entries are returned as `data.data`
            } else {
                toast.error("Failed to load sleep entries");
            }
        })
        .catch(err => {
            toast.error('Error in getting sleep intake');
            console.log(err);
        });
    };
    
    return (
            <div className='popupout'>
                <div className='popupbox'>
                    <button className='close' onClick={() => setShowSleepIntakePopup(false)}>
                        <AiOutlineClose />
                    </button>

                    <TextField
                        id='date'
                        type='date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <TextField
                        id='durationInHrs'
                        label='Duration (in hours)'
                        type='number'
                        value={durationInHrs}
                        onChange={(e) => setDurationInHrs(e.target.value)}
                    />

                    <Button variant='contained' onClick={saveSleepIntake}>
                        Add Sleep Entry
                    </Button>

                    <div className='sleep-entries'>
                        {sleepEntries.map((entry, index) => (
                            <div key={index} className='sleep-entry'>
                                <p>Date: {dayjs(entry.date).format('YYYY-MM-DD')}</p>
                                <p>Duration: {entry.durationInHrs} hours</p>
                                <Button variant='outlined'
                                    onClick={() => deleteSleepEntry(entry)}
                                >
                                    Delete
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    };

    export default SleepIntakePopup;