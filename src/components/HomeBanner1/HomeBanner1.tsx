import React from 'react';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { AiOutlineEye } from 'react-icons/ai';
import './HomeBanner1.scss';

const HomeBanner1 = () => {

  const [data, setData] = React.useState<any>(null)

  const getData = async () => {
    // let temp = [
    //   {
    //     "name": "Calories Intake",
    //     "value": 2000,
    //     "unit": "kcal",
    //     "goal": 2500,
    //     "goalUnit": "kcal"
    //   },
    //   {
    //     "name": "Sleep",
    //     "value": 8,
    //     "unit": "hrs",
    //     "goal": 8,
    //     "goalUnit": "hrs"
    //   },
    //   {
    //     "name": "Steps",
    //     "value": 50,
    //     "unit": "steps",
    //     "goal": 10000,
    //     "goalUnit": "steps"
    //   },
    //   {
    //     "name": "Water",
    //     "value": 2000,
    //     "unit": "ml",
    //     "goal": 3000,
    //     "goalUnit": "ml"
    //   },
    //   {
    //     "name": "Weight",
    //     "value": 55,
    //     "unit": "kg",
    //     "goal": 70,
    //     "goalUnit": "kg"
    //   },
    //   {
    //     "name": "Height",
    //     "value": 170,
    //     "unit": "cm",
    //     "goal": 175,
    //     "goalUnit": "cm"
    //   },
    //   {
    //     "name": "Workout",
    //     "value": 2,
    //     "unit": "days",
    //     "goal": 6,
    //     "goalUnit": "days"
    //   }
    // ]
    // setData(temp)
    // console.log(temp)

    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/report/getreport', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.ok) {
          setData(data.data)
        }
        else {
          setData([])
        }
      })
      .catch(err => {
        console.log(err)
        setData([])
      })
  }

  React.useEffect(() => {
    getData()
  }, [])

  return (
    <div className='meters'>
      <h1 className='mainhead1'>Notebook</h1>
      {
        data?.length > 0 && data.map((item: any, index: number) => {
          return (
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
        })
      }
    </div>
  )
}

export default HomeBanner1
