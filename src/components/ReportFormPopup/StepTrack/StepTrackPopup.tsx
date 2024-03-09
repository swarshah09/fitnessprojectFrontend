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

interface StepTrackPopupProps {
    setShowStepTrackPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const StepTrackPopup: React.FC<StepTrackPopupProps> = ({ setShowStepTrackPopup }) => {
    const color = '#ffc20e';

    const [date, setDate] = React.useState<any>(dayjs(new Date()));
    const [steps, setSteps] = React.useState<number>(0);
    const [items, setItems] = React.useState<any>([]);

    const [cleared, setCleared] = React.useState<boolean>(false);
    React.useEffect(() => {
        if (cleared) {
            const timeout = setTimeout(() => {
                setCleared(false);
            }, 1500);

            return () => clearTimeout(timeout);
        }
        return () => { };
    }, [cleared]);

    const selectedDay = (val: any) => {
        setDate(val);
    };

    const saveStepEntry = async () => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/steptrack/addstepentry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                date: date.format('YYYY-MM-DD'),
                steps: steps,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    toast.success('Step Entry Added successfully');
                    getStepsByDate();
                } else {
                    toast.error('Error in adding Step Entry');
                }
            })
            .catch((err) => {
                toast.error('Error in adding Step Entry');
                console.log(err);
            });
    };

    const getStepsByDate = async () => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/steptrack/getstepsbydate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                date: date,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    console.log(data.data, 'step entries for date');
                    setItems(data.data);
                } else {
                    toast.error('Error in getting Step Entries');
                }
            })
            .catch((err) => {
                toast.error('Error in getting Step Entries');
                console.log(err);
            });
    };

    const deleteStepEntry = async (date: string) => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/steptrack/deletestepentry', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                date: date,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    toast.success('Step Entry deleted successfully');
                    getStepsByDate();
                } else {
                    toast.error('Error in deleting Step Entry');
                }
            })
            .catch((err) => {
                toast.error('Error in deleting Step Entry');
                console.log(err);
            });
    };

    React.useEffect(() => {
        getStepsByDate();
    }, [date]);

    return (
        <div className="popupout">
            <div className="popupbox">
                <button
                    className="close"
                    onClick={() => {
                        setShowStepTrackPopup(false);
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
                            <Alert sx={{ position: 'absolute', bottom: 0, right: 0 }} severity="success">
                                Field cleared!
                            </Alert>
                        )}
                    </Box>
                </LocalizationProvider>

                <TextField
                    id="outlined-basic"
                    label="Steps count"
                    variant="outlined"
                    type="number"
                    color="warning"
                    onChange={(e) => setSteps(parseInt(e.target.value))}
                />

                <Button className="save" variant="contained" onClick={saveStepEntry}>
                    Save
                </Button>

                <div className="items">
                    {items.map((item: any, index: number) => (
                        <div className="item" key={index}>
                            <h3>{item.steps} steps on {item.date}</h3>
                            <button
                                onClick={() => {
                                    deleteStepEntry(item.date);
                                }}
                            >
                                <AiFillDelete />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StepTrackPopup;
