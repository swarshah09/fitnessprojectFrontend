import React from 'react';
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

interface WaterIntakePopupPops {
    setShowWaterIntakePopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const WaterIntakePopup: React.FC<WaterIntakePopupPops> = ({ setShowWaterIntakePopup }) => {
    const color = '#00aaff';

    const [date, setDate] = React.useState<any>(dayjs(new Date()));
    const [amountInMilliliters, setAmountInMilliliters] = React.useState<number>(0);
    const [entries, setEntries] = React.useState<any[]>([]);
    const [cleared, setCleared] = React.useState<boolean>(false);

    React.useEffect(() => {
        getWaterEntries();
    }, [date]);

    const selectedDay = (val: any) => {
        setDate(val);
    };

    const saveWaterEntry = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/watertrack/addwaterentry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    date: date,
                    amountInMilliliters: amountInMilliliters,
                }),
            });
            const data = await response.json();
            if (data.ok) {
                toast.success('Water entry added successfully');
                getWaterEntries();
            } else {
                toast.error('Error in adding water entry');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error in adding water entry');
        }
    };

    const getWaterEntries = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/watertrack/getwaterbylimit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    limit: 10, // Adjust the limit as needed
                }),
            });
            const data = await response.json();
            if (data.ok) {
                console.log(data.data, 'water entries for date');
                setEntries(data.data);
            } else {
                toast.error('Error in getting water entries');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error in getting water entries');
        }
    };

    const deleteWaterEntry = async (entry: any) => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/watertrack/deletewaterentry', {
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
                toast.success('Water entry deleted successfully');
                getWaterEntries();
            } else {
                toast.error('Error in deleting water entry');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error in deleting water entry');
        }
    };

    return (
        <div className='popupout'>
            <div className='popupbox'>
                <button
                    className='close'
                    onClick={() => {
                        setShowWaterIntakePopup(false);
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
                    label='Amount (in milliliters)'
                    variant='outlined'
                    color='warning'
                    type='number'
                    onChange={(e) => {
                        setAmountInMilliliters(parseInt(e.target.value));
                    }}
                />

                <Button className='save' variant='contained' onClick={saveWaterEntry}>
                    Save
                </Button>

                <div className='items'>
                    {entries.map((entry: any, index: number) => (
                        <div className='item' key={index}>
                            <h3>{entry.amountInMilliliters} milliliters</h3>
                            <h3>{dayjs(entry.date).format('YYYY-MM-DD')}</h3>
                            <button onClick={() => deleteWaterEntry(entry)}>
                                <AiFillDelete />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WaterIntakePopup;
