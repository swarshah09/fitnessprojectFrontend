"use client"
import React from 'react';
import './page.scss';
import { AiOutlineClose } from 'react-icons/ai';

interface ChestPageProps {
    setShowChest: React.Dispatch<React.SetStateAction<boolean>>;
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
const ChestPage: React.FC<ChestPageProps> = ({ setShowChest }) => {
    const [workout, setWorkout] = React.useState<WorkoutData | null>(null);


    const getworkout = async () => {
        let data: any = {
            type: 'Chest',
            imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
            durationInMin: 30,
            exercises: [
                {
                    exercise: 'Flat Bench Press',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/00251205barbellbenchpresschestfix2view.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Compound chest exercise using a barbell on a flat bench.',
                },
                {
                    exercise: 'Incline Bench Press',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/00471205barbellinclinebenchpresschestfix2view.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Variation of bench press targeting upper chest muscles.'

                },
                {
                    exercise: 'Decline Bench Press',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/508e145a4dc30f62cae843c6fff1939b.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Variation of bench press targeting lower chest muscles.'
                },
                {
                    exercise: 'Chest Dips',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/b2375d9062f90b0191aa025791c4a958.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Bodyweight exercise targeting chest and triceps.'
                },
                {
                    exercise: 'Band high fly',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/55e49797b51f598bc6e223d6e5f6a08f.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Resistance band exercise mimicking chest fly movement.'
                },
                {
                    exercise: 'Band Incline Chest Fly',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/861624a8ff66e5c58c135c00d65a8898.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Resistance band exercise targeting upper chest on an inclined surface.'
                },
                {
                    exercise: 'Band Standing Chest Press',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/f89038772b3e1c3a5465abad5eeadf35.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Resistance band exercise targeting chest muscles while standing.'
                },
                {
                    exercise: 'Dumbbell Bench Press',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/667651e3f31fc0410150d6e7db08dc32.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Compound chest exercise using dumbbells on a flat bench.'
                },
                {
                    exercise: 'Dumbbell Incline Bench Press',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/4905b057e2b9927e684758145e8b2c1f.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Variation of dumbbell bench press targeting upper chest on an inclined bench.'
                },
                {
                    exercise: 'Dumbbell Decline Bench Press',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/4be7b7fa764dacae9886da9e59124f36.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Variation of dumbbell bench press targeting lower chest on a declined bench.'
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
                    setShowChest(false)
                }}>
                <AiOutlineClose />
            </button>
            <h1 className='mainhead1'>Chest Day</h1>
            <div className='workout__exercises'>
                {
                    workout?.exercises.map((item: any, index: number) => {
                        return (
                            <div className={
                                index % 2 === 0 ? 'workout__exercise' : 'workout__exercise workout__exercise--reverse'
                            }>
                                <h3>{index + 1}</h3>
                                <div className='workout__exercise__image'>
                                    <video src={item.videoUrl} controls/>
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

export default ChestPage;
