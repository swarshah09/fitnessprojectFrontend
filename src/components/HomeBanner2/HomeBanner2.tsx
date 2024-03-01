import React from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react';
import './HomeBanner2.scss'

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';

// // import required modules
// import { Pagination } from 'swiper/modules';

const HomeBanner2 = () => {
    const [workouts, setWorkouts] = React.useState<any[] | null>(null)

    const getworkouts = async () => {
        let data: any = [
            {
                type: 'Chest',
                imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
                durationInMin: 30
            },
            {
                type: 'Abs',
                imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWJzJTIwd29ya291dHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
                durationInMin: 90
            },
            {
                type: 'Shoulder',
                imageUrl: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
                durationInMin: 40
            },
            {
                type: 'Back',
                imageUrl: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFjayUyMHdvcmtvdXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
                durationInMin: 70
            },
            {
                type: 'Biceps',
                imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
                durationInMin: 50
            },
            {
                type: 'Triceps',
                imageUrl: 'https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJpY2Vwc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
                durationInMin: 60
            },

            {
                type: 'Legs',
                imageUrl: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGVnJTIwd29ya291dHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
                durationInMin: 80
            },

            {
                type: 'Cardio',
                imageUrl: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2FyZGlvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
                durationInMin: 100
            },
            {
                type: 'Forearms',
                imageUrl: 'https://images.unsplash.com/photo-1591940742878-13aba4b7a34e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9yZWFybXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
                durationInMin: 110
            },
            {
                type: 'Gluteus',
                imageUrl: 'https://img.freepik.com/free-photo/healthy-young-sportswoman-doing-exercises-all-fours-arching-back-straightening-leg-up-concept-sport-fitness-lifestyle_639032-901.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699056000&semt=ais',
                durationInMin: 50
            },
            {
                type: 'Functional Exercise',
                imageUrl: 'https://www.spartan.com/cdn/shop/articles/210427-BDoscher-MerchTraining-274_1200x.jpg?v=1633447393',
                durationInMin: 60
            },
            {
                type: 'Stretching',
                imageUrl: 'https://media.istockphoto.com/id/1344890104/photo/young-african-american-sportsman-sitting-on-floor-and-doing-stretching-exercise-indoors.jpg?s=612x612&w=0&k=20&c=ac3dVK5kETFJGCjbqsLE9GAyeV7q53h1ZWimBeGTcu0=',
                durationInMin: 20
            }
        ]
        setWorkouts(data)
    }
    React.useEffect(() => {
        getworkouts()
    }, [])

    return (
        <div>
            <h1 className='mainhead1'>W<span>o</span>rk<span>o</span>uts</h1>
            <div className='workout'>
                {
                    workouts && workouts.map((item, index) => {
                        return (
                            <div className='swiper-slide'
                                style={{
                                    backgroundImage: `url(${item.imageUrl})`,
                                }}
                                onClick={() => {
                                    window.location.href = `/workout/${item.type}`
                                }}
                            >
                                <div className='swiper-slide-content'>
                                    <h2>{item.type}</h2>
                                    <p>{item.durationInMin} min</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default HomeBanner2