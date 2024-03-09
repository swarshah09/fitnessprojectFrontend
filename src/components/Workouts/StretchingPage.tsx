"use client"
import React from 'react';
import './page.scss';
import { AiOutlineClose } from 'react-icons/ai';

interface StretchingPageProps {
    setShowStretching: React.Dispatch<React.SetStateAction<boolean>>;
}
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

const StretchingPage: React.FC<StretchingPageProps> = ({ setShowStretching }) => {
    const [workout, setWorkout] = React.useState<WorkoutData | null>(null);

    const getworkout = async () => {
        let data: any = {
            type: 'Stretching',
            imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
            durationInMin: 30,
            exercises: [
                {
                    exercise: 'Cobra Lookback',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/81581201preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Compound Stretching exercise using a barbell on a flat bench.',
                },
                {
                    exercise: 'Child to Cobra Pose',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/79521201preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Variation of bench press targeting upper Stretching muscles.'

                },
                {
                    exercise: 'Double Pigeon Pose',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/58901201doublepigeonposefemalestretchingview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Variation of bench press targeting lower Stretching muscles.'
                },
                {
                    exercise: 'Deep Squat Turn',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/79081201preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Bodyweight exercise targeting Stretching and triceps.'
                },
                {
                    exercise: 'Down Dog Knee to Nose',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/62891201downdogkneetonosefemalestretchingview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Resistance band exercise mimicking Stretching fly movement.'
                },
                {
                    exercise: 'Eagle Arms',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/61691201eaglearmsfemalestretchingview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Resistance band exercise targeting upper Stretching on an inclined surface.'
                },
                {
                    exercise: 'Easy Pose',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/81551201preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Resistance band exercise targeting Stretching muscles while standing.'
                },
                {
                    exercise: 'Easy Yoga Pose',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/78341201preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Compound Stretching exercise using dumbbells on a flat bench.'
                },
                {
                    exercise: 'High Lunge to Warrior I Pose',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/79701201preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Variation of dumbbell bench press targeting upper Stretching on an inclined bench.'
                },
                {
                    exercise: 'Reverse Warrior Pose ',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/59131201reversewarriorposefemalestretchingview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Variation of dumbbell bench press targeting lower Stretching on a declined bench.'
                }
            ]
        }
        setWorkout(data)
    }
    React.useEffect(() => {
        getworkout()
    }, [])
    return (
        <div className='main'>
            <button className='close'
                onClick={() => {
                    setShowStretching(false)
                }}>
                <AiOutlineClose />
            </button>
            <h1 className='mainhead1'>Stretching</h1>
            <div className='workout__exercises'>
                {
                    workout?.exercises.map((item: any, index: number) => {
                        return (
                            <div className={
                                index % 2 === 0 ? 'workout__exercise' : 'workout__exercise workout__exercise--reverse'
                            }>
                                <h3>{index + 1}</h3>
                                <div className='workout__exercise__image'>
                                    <video src={item.videoUrl} loop autoPlay/>
                                </div>
                                <div className='workout__exercise__content'>
                                    <h2>{item.exercise}</h2>
                                    <span>{item.sets} sets X {item.reps} reps</span>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default StretchingPage;
