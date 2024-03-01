import React from 'react'
import '../popup.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AiFillDelete, AiOutlineClose } from 'react-icons/ai'
import { TimeClock } from '@mui/x-date-pickers/TimeClock';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { toast } from 'react-toastify';
import { TimePicker } from '@mui/x-date-pickers';

interface CaloriIntakePopupProps {
  setShowCalorieIntakePopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const CalorieIntakePopup: React.FC<CaloriIntakePopupProps> = ({ setShowCalorieIntakePopup }) => {
  const color = '#ffc20e'

  const [date, setDate] = React.useState<any>(dayjs(new Date()))
  const [time, setTime] = React.useState<any>(dayjs(new Date()))

  const [calorieIntake, setCalorieIntake] = React.useState<any>({
    item: '',
    date: '',
    quantity: '',
    quantitytype: 'g'
  })
  const [items, setItems] = React.useState<any>([])

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
    setDate(val)
  };

  const saveCalorieIntake = async () => {
    let tempdate = date.format('YYYY-MM-DD');
    let temptime = time.format('HH:mm:ss');
    let tempdatetime = tempdate + ' ' + temptime;
    let finaldatetime = new Date(tempdatetime);

    console.log(finaldatetime + 'finaldatetime')

    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/calorieintake/addcalorieintake', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'auth-token': localStorage.getItem('auth-token') || ''
      },
      credentials: 'include',
      body: JSON.stringify({
        item: calorieIntake.item,
        date: finaldatetime,
        quantity: calorieIntake.quantity,
        quantitytype: calorieIntake.quantitytype,
      })
    })

      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          toast.success('Calotie Intake Added successfully')
          getCalotieIntake()
        }
        else {
          toast.error('Error in adding Calorie Intake')
        }
      })
      .catch(err => {
        toast.error('Error in adding Calorie Intake')
        console.log(err)
      })
  }

  const getCalotieIntake = async () => {
    setItems([])
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/calorieintake/getcalorieintakebydate', {
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
          console.log(data.data, 'calorie intake data for date')
          setItems(data.data)
        }
        else {
          toast.error('Error in getting Calorie Intake')
        }
      })
      .catch(err => {
        toast.error('Error in getting Calorie Intake')
        console.log(err)
      })
  }

  const deleteCalorieIntake = async (item: any) => { 
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/calorieintake/deletecalorieintake', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        item: item.item,
        date: item.date,
      })
    })
    .then(res => res.json())
      .then(data => {
        if (data.ok) {
          toast.success('Calotie Intake item deleted successfully')
          getCalotieIntake()
        }
        else {
          toast.error('Error in deleting Calorie Intake')
        }
      })
      .catch(err => {
        toast.error('Error in deleting Calorie Intake')
        console.log(err)
      })
  }

  React.useEffect(() => {
    getCalotieIntake()
  }, [date])

  return (
    <div className='popupout'>
      <div className='popupbox'>
        <button className='close'
          onClick={() => {
            setShowCalorieIntakePopup(false)
          }}
        >
          <AiOutlineClose />
        </button>

        {/* for the date part */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              // justifyContent: 'center',
              position: 'relative',
            }}
          >
            <DemoItem label="">
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
            </DemoItem>

            {cleared && (
              <Alert
                sx={{ position: 'absolute', bottom: 0, right: 0 }}
                severity="success"
              >
                Field cleared!
              </Alert>
            )}
          </Box>
        </LocalizationProvider>
        {/* and it is ending here */}

        <TextField id="outlined-basic" label="Food item name" variant="outlined" color="warning"
          onChange={(e) => {
            setCalorieIntake({ ...calorieIntake, item: e.target.value })
          }} />

        <TextField id="outlined-basic" label="Food item amount (in gms)" variant="outlined" color="warning" type='number'
          onChange={(e) => {
            setCalorieIntake({ ...calorieIntake, quantity: e.target.value })
          }} />

        <div className='timebox'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker value={time}
              onChange={(newValue) => setTime(newValue)}
            />
          </LocalizationProvider>
        </div>

        <Button className='save' variant="contained" onClick={saveCalorieIntake}>
          Save
        </Button>

        <div className='items'>
          {items.map((item: any, index: number) => (
            <div className='item' key={index}>
              <h3>{item.item}</h3>
              <h3>{item.quantity} {item.quantitytype}</h3>
              <button
                onClick={() => {
                  deleteCalorieIntake(item);
                }}
              >
                <AiFillDelete />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default CalorieIntakePopup;
