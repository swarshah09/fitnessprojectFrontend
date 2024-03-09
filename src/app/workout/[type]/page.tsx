"use client"
import React from 'react';
import './workoutPage.scss';
// import { useSearchParams } from 'next/navigation';

interface Exercise {
    name: string;
    videoUrl: string;
    sets: number;
    reps: number;
    description: string;
}

interface WorkoutData {
    name: string;
    exercises: Exercise[];
}

const Page = () => {
    const [workout, setWorkout] = React.useState<WorkoutData | null>(null);
    // const searchParams = useSearchParams();
    const [data, setData] = React.useState<WorkoutData | null>(null);

    // const workoutId = searchParams.get('id');

    // const getWorkout = async () => {
    //     fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/workoutplans/workouts/' + workoutId, {
    //         method: 'GET',
    //         credentials: 'include',
    //     })
    //         .then(res => res.json())
    //         .then((responseData: { ok: boolean; data: WorkoutData }) => {
    //             if (responseData.ok) {
    //                 setData(responseData.data);
    //             } else {
    //                 setData(null);
    //             }
    //         })
    //         .catch(err => {
    //             console.error(err);
    //             setData(null);
    //         });
    // };

    // React.useEffect(() => {
    //     getWorkout();
    // }, []);

    return (
        <>
            {data && (
                <div className='workout'>
                    <h1 className='mainhead1'> {data?.name} Day</h1>
                    <div className='workout__exercises'>
                        {data.exercises.map((item: Exercise, index: number) => (
                            <div
                                className={
                                    index % 2 === 0
                                        ? 'workout__exercise'
                                        : 'workout__exercise workout__exercise--reverse'
                                }
                                key={index}
                            >
                                <h3>{index + 1}</h3>
                                <div className='workout__exercise__image'>
                                    <video src={item.videoUrl} loop autoPlay />
                                </div>
                                <div className='workout__exercise__content'>
                                    <h2>{item.name}</h2>
                                    <span>
                                        {item.sets} sets X {item.reps} reps
                                    </span>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Page;
