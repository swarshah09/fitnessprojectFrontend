"use client"
import React from 'react';
import './page.scss';
import { AiOutlineClose } from 'react-icons/ai';

interface BicepsPageProps {
    setShowBiceps: React.Dispatch<React.SetStateAction<boolean>>;
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

const BicepsPage: React.FC<BicepsPageProps> = ({ setShowBiceps }) => {
    const [workout, setWorkout] = React.useState<WorkoutData | null>(null);

    const getworkout = async () => {
        let data: any = {
            type: 'Biceps',
            imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
            durationInMin: 30,
            exercises: [
                {
                    exercise: 'Dumbbell Standing Inner Biceps Curl',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/23211205preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Compound Biceps exercise using a barbell on a flat bench.',
                },
                {
                    exercise: 'Dumbbell Alternate Biceps Curl',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/f608401abdbde576ede4bc1506429c9d.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Variation of bench press targeting upper Biceps muscles.'

                },
                {
                    exercise: 'Dumbbell Incline Inner Biceps Curl',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/03221205preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Variation of bench press targeting lower Biceps muscles.'
                },
                {
                    exercise: 'Barbell Curl',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/485a28a82ad03e192b9ddd6a7a48ed2a.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Bodyweight exercise targeting Biceps and triceps.'
                },
                {
                    exercise: 'Dumbbell Alternate Biceps Curl',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/cc03ca615b19ce6b65307ca1695cee98.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Resistance band exercise mimicking Biceps fly movement.'
                },
                {
                    exercise: 'Dumbbell Standing Single Arm Cross Raise',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/b92e8a9f74e1b16f82f5385d65ed75a3.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Resistance band exercise targeting upper Biceps on an inclined surface.'
                },
                {
                    exercise: 'Band Standing Biceps Press',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/f89038772b3e1c3a5465abad5eeadf35.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Resistance band exercise targeting Biceps muscles while standing.'
                },
                {
                    exercise: 'Dumbbell Revers grip Biceps Curl',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/69f45f6014dcd03ec3e668a6717c3418.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Compound Biceps exercise using dumbbells on a flat bench.'
                },
                {
                    exercise: 'Cable Biceps Curl',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/14f53f6983f1355369f40ca4ba19923d.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Variation of dumbbell bench press targeting upper Biceps on an inclined bench.'
                },
                {
                    exercise: 'EZ-Barbell Standing Wide Grip Biceps Curl',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/e1596fca38f4097625fc6cd0f1023c68.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Variation of dumbbell bench press targeting lower Biceps on a declined bench.'
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
                    setShowBiceps(false)
                }}>
                <AiOutlineClose />
            </button>
            <h1 className='mainhead1'>Biceps</h1>
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

export default BicepsPage;
