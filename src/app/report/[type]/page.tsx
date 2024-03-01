"use client";
import React, { useEffect, useState } from 'react';
import './ReportPage.scss';
import { AiFillEdit } from 'react-icons/ai';
import CaloriIntakePopup from '@/components/ReportFormPopup/CalorieIntake/CalorieIntakePopup';
import dayjs from 'dayjs';
import { usePathname } from 'next/navigation';

const Page = () => {
    const pathname = usePathname();
    console.log(pathname);
    const [reportData, setReportData] = useState<any[]>([]);
    const [showCalorieIntakePopup, setShowCalorieIntakePopup] = useState<boolean>(false);
    const totalCalorieIntake = reportData.reduce((total, item) => total + parseFloat(item.calorieIntake || 0), 0);


    const fetchData = async () => {
        try {
            let responseData;
            if (pathname === '/report/Calorie%20Intake') {
                responseData = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/calorieintake/getcalorieintakebylimit', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ limit: 10 })
                });
            } else {
                // Fetch data for other reports
                alert('Fetch data for other reports');
                return;
            }

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
                    console.log(data.data)
                } else {
                    setReportData([]);
                }
            } else {
                console.error('Failed to fetch data:', responseData.statusText);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='reportpage'>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Calorie Intake (kcal)</th>
                    </tr>
                </thead>
                <tbody>
                    {reportData.map((item: any, index: number) => (
                        <tr key={index}>
                            <td>{dayjs(item.date).format('YYYY-MM-DD')}</td>
                            <td>{item.item}</td>
                            <td>{item.quantity}</td>
                            <td>{item.calorieIntake} kcal</td>
                        </tr>
                    ))}
                    {/* Total Calorie Intake row */}
                    <tr>
                        <td colSpan={3}>Total Calorie Intake:</td>
                        <td>{totalCalorieIntake} kcal</td>
                    </tr>
                </tbody>
            </table>
    
            <button
                className='editbutton'
                onClick={() => {
                    setShowCalorieIntakePopup(true);
                }}
            >
                <AiFillEdit />
            </button>
    
            {showCalorieIntakePopup && <CaloriIntakePopup setShowCalorieIntakePopup={setShowCalorieIntakePopup} />}
        </div>
    );
}

export default Page;
