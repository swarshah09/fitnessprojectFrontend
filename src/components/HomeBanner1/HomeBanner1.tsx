import React, { useState, useEffect } from 'react';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { AiOutlineEye } from 'react-icons/ai';
import './HomeBanner1.scss';
import { HiOutlineArrowSmallDown } from "react-icons/hi2";

const HomeBanner1 = () => {
  const [data, setData] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  useEffect(() => {
    // Check login status when component mounts
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    // Check user login status
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/checklogin', {
        method: 'POST',
        credentials: 'include',
      });
      const result = await response.json();
      if (result.ok) {
        setIsLoggedIn(true); // Set isLoggedIn to true if user is logged in
      } else {
        setIsLoggedIn(false); // Set isLoggedIn to false if user is not logged in
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  const getData = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/report/getreport', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      if (data.ok) {
        setData(data.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      getData(); // Fetch data only if user is logged in
    }
  }, [isLoggedIn]);

  return (
    <div className='meters'>
      {/* Conditionally render the message based on login status */}
      {!isLoggedIn && <p><HiOutlineArrowSmallDown /> Refresh after login</p>}
      {isLoggedIn && data?.length > 0 && data.map((item: any, index: number) => (
        <div className='card' key={index}>
          <div className='card-header'>
            <div className='card-header-box'>
              <div className='card-header-box-name'>{item.name}</div>
              <div className='card-header-box-value'>{parseInt(item.value)} {item.unit}</div>
            </div>
            <div className='card-header-box'>
              <div className='card-header-box-name'>Target</div>
              <div className='card-header-box-value'>{parseInt(item.goal)} {item.goalUnit}</div>
            </div>
          </div>

          <CircularProgress className='cp' value={(item.value / item.goal) * 100} size='150px' thickness='12px' color='var(--col1)' >
            <CircularProgressLabel className='label'>
              {Math.round((item.value / item.goal) * 100)}%
            </CircularProgressLabel>

            <div className="textincircle">
              <span>
                {
                  parseInt(item.value)
                }
              </span>

              <span> / </span>
              <span>
                {
                  parseInt(item.goal)
                }
              </span>
            </div>
          </CircularProgress>

          <button
            onClick={() => {
              window.location.href = `/report/${item.name}`
            }}
          >Show Report <AiOutlineEye /></button>
        </div>
      )
      )
      }
    </div>
  )
}

export default HomeBanner1
