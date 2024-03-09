// page.tsx
"use client"
import React, { useEffect, useState } from 'react';
import './ReportPage.scss';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import dayjs from 'dayjs';
import { usePathname } from 'next/navigation';
import CaloriIntakePopup from '@/components/ReportFormPopup/CalorieIntake/CalorieIntakePopup';
import SleepIntakePopup from '@/components/ReportFormPopup/SleepTrack/SleepTrackPopup';
import StepTrackPopup from '@/components/ReportFormPopup/StepTrack/StepTrackPopup';// Import the StepTrackPopup component
import WaterIntakePopup from '@/components/ReportFormPopup/WaterTrack/WaterIntakePopup';
import WorkoutPlanPopup from '@/components/ReportFormPopup/WorkoutPlans/WorkoutPlanPopup';

const Page = () => {
    const pathname = usePathname();
    console.log(pathname);
    const [reportData, setReportData] = useState<any[]>([]);
    const [sleepEntries, setSleepEntries] = useState<any[]>([]);
    const [stepEntries, setStepEntries] = useState<any[]>([]); // State for StepTrack entries
    const [waterEntries, setWaterEntries] = useState<any[]>([]); // State for WaterIntake entries
    const [workoutEntries, setWorkoutEntries] = useState<any[]>([]); // State for Workout entries

    const [showCalorieIntakePopup, setShowCalorieIntakePopup] = useState<boolean>(false);
    const [showSleepIntakePopup, setShowSleepIntakePopup] = useState<boolean>(false);
    const [showStepTrackPopup, setShowStepTrackPopup] = useState<boolean>(false);
    const [showWaterIntakePopup, setShowWaterIntakePopup] = useState<boolean>(false); // State to control the WaterIntakePopup visibility
    const [showWorkoutPlanPopup, setShowWorkoutPlanPopup] = useState<boolean>(false); // State to control the WorkoutPlanPopup visibility

    const fetchData = async () => {
        try {
            let responseData;
            // -------------------------------------calorie intake-----------------------------------------------
            if (pathname === '/report/Calorie%20Intake') {
                responseData = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/calorieintake/getcalorieintakebylimit', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ limit: 10 })
                });
                if (responseData.ok) {
                    const data = await responseData.json();
                    if (data.data && data.data.length > 0) {
                        const formattedData = data.data.map((item: any) => ({
                            date: item.date,
                            item: item.item,
                            quantity: item.quantity,
                            calorieIntake: item.calorieIntake || '-'
                        }));
                        setReportData(formattedData);
                    } else {
                        setReportData([]);
                    }
                } else {
                    console.error('Failed to fetch data:', responseData.statusText);
                }
                // --------------------------------------sleep-------------------------------------------- 
            } else if (pathname === '/report/Sleep') {
                responseData = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/sleepintake/getsleepbylimit', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ limit: 10 })
                });
                if (responseData.ok) {
                    const data = await responseData.json();
                    if (data.data && data.data.length > 0) {
                        setSleepEntries(data.data);
                    } else {
                        setSleepEntries([]);
                    }
                } else {
                    console.error('Failed to fetch data:', responseData.statusText);
                }
                // ----------------------------------------step--------------------------------------------
            } else if (pathname === '/report/Steps') {
                responseData = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/steptrack/getstepsbydate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        date: new Date(), // Fetch for today's date, you can adjust this if needed
                    }),
                });
                if (responseData.ok) {
                    const data = await responseData.json();
                    if (data.ok) {
                        setStepEntries(data.data);
                    } else {
                        console.error('Error:', data.message);
                    }
                } else {
                    console.error('Network response was not ok');
                }
            }
            // --------------------------------------water---------------------------------------------
            else if (pathname === '/report/Water') {
                responseData = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/waterintake/getwaterbylimit', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ limit: 10 })
                });
                if (responseData && responseData.ok) {
                    const data = await responseData.json();
                    if (data.data && data.data.length > 0) {
                        setWaterEntries(data.data);
                    } else {
                        setWaterEntries([]);
                    }
                } else if (responseData) {
                    console.error('Failed to fetch data:', responseData.statusText);
                }
            }
            // --------------------------------------workout--------------------------------------------
            else if (pathname === '/report/Workout') {
                responseData = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/workoutplan/getworkoutsbylimit', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ limit: 10 })
                });
                if (responseData && responseData.ok) {
                    const data = await responseData.json();
                    if (data.data && data.data.length > 0) {
                        setWorkoutEntries(data.data);
                    } else {
                        setWorkoutEntries([]);
                    }
                } else if (responseData) {
                    console.error('Failed to fetch data:', responseData.statusText);
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [pathname]);

    return (
        <div className='reportpage'>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        {/* Render different headers based on the pathname */}
                        {pathname === '/report/Calorie%20Intake' && <th>Item</th>}
                        {pathname === '/report/Calorie%20Intake' && <th>Quantity</th>}
                        {pathname === '/report/Calorie%20Intake' && <th>Total</th>}
                        {pathname === '/report/Steps' && <th>Steps</th>}
                        {pathname === '/report/Sleep' && <th>Duration (hours)</th>}
                        {pathname === '/report/Water' && <th>Amount (ml)</th>}
                        {pathname === '/report/Workout' && <th>Exercise</th>} {/* Header for workout entries */}
                        {pathname === '/report/Workout' && <th>Duration (minutes)</th>} {/* Header for workout entries */}
                    </tr>
                </thead>
                <tbody>
                    {pathname === '/report/Calorie%20Intake' && reportData.map((item: any, index: number) => (
                        <tr key={index}>
                            <td>{dayjs(item.date).format('YYYY-MM-DD')}</td>
                            <td>{item.item}</td>
                            <td>{item.quantity}</td>
                            <td>{item.calorieIntake} kcal</td>
                        </tr>
                    ))}
                    {pathname === '/report/Sleep' && sleepEntries.map((entry, index) => (
                        <tr key={index}>
                            <td>{dayjs(entry.date).format('YYYY-MM-DD')}</td>
                            <td>{entry.durationInHrs}</td>
                        </tr>
                    ))}
                    {pathname === '/report/Steps' && stepEntries.map((entry, index) => (
                        <tr key={index}>
                            <td>{dayjs(entry.date).format('YYYY-MM-DD')}</td>
                            <td>{entry.steps} steps</td>
                        </tr>
                    ))}
                    {pathname === '/report/Water' && waterEntries.map((entry, index) => (
                        <tr key={index}>
                            <td>{dayjs(entry.date).format('YYYY-MM-DD')}</td>
                            <td>{entry.amountInMilliliters} ml</td>
                        </tr>
                    ))}
                    {pathname === '/report/Workout' && workoutEntries.map((entry, index) => (
                        <tr key={index}>
                            <td>{dayjs(entry.date).format('YYYY-MM-DD')}</td>
                            <td>{entry.exercise}</td>
                            <td>{entry.durationInMinutes} minutes</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                className='editbutton'
                onClick={() => {
                    if (pathname === '/report/Calorie%20Intake') {
                        setShowCalorieIntakePopup(true);
                    } else if (pathname === '/report/Sleep') {
                        setShowSleepIntakePopup(true);
                    } else if (pathname === '/report/Steps') {
                        setShowStepTrackPopup(true);
                    } else if (pathname === '/report/Water') {
                        setShowWaterIntakePopup(true);
                    } else if (pathname === '/report/Workout') {
                        setShowWorkoutPlanPopup(true);
                    }
                }}
            >
                <AiFillEdit />
            </button>

            {showCalorieIntakePopup && <CaloriIntakePopup setShowCalorieIntakePopup={setShowCalorieIntakePopup} />}
            {showSleepIntakePopup && <SleepIntakePopup setShowSleepIntakePopup={setShowSleepIntakePopup} />}
            {showStepTrackPopup && <StepTrackPopup setShowStepTrackPopup={setShowStepTrackPopup} />}
            {showWaterIntakePopup && <WaterIntakePopup setShowWaterIntakePopup={setShowWaterIntakePopup} />}
            {showWorkoutPlanPopup && <WorkoutPlanPopup setShowWorkoutPlanPopup={setShowWorkoutPlanPopup} />}
        </div>
    );
}

export default Page;
