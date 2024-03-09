"use client"
import React from 'react';
import './page.scss';
import { AiOutlineClose } from 'react-icons/ai';

interface GluteusPageProps {
    setShowGluteus: React.Dispatch<React.SetStateAction<boolean>>;
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

const GluteusPage: React.FC<GluteusPageProps> = ({ setShowGluteus }) => {
    const [workout, setWorkout] = React.useState<WorkoutData | null>(null);

    const getworkout = async () => {
        let data: any = {
            type: 'Gluteus',
            imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
            durationInMin: 30,
            exercises: [
                {
                    exercise: 'Plank Pike Slide with Towel',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/51651205preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Compound Gluteus exercise using a barbell on a flat bench.',
                },
                {
                    exercise: 'Curtsy Lunge Slide with Towel',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/51501205preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Variation of bench press targeting upper Gluteus muscles.'

                },
                {
                    exercise: 'Crab Pose',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/50541205preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Variation of bench press targeting lower Gluteus muscles.'
                },
                {
                    exercise: 'Landmine One Leg Stiff Leg Deadlift',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/53071205preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Bodyweight exercise targeting Gluteus and triceps.'
                },
                {
                    exercise: 'Kettlebell Sumo Squat off Stepbox',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/53051205preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Resistance band exercise mimicking Gluteus fly movement.'
                },
                {
                    exercise: 'Trap Bar Squat',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/53041205preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Resistance band exercise targeting upper Gluteus on an inclined surface.'
                },
                {
                    exercise: 'Balance Board ',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/53021205preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Resistance band exercise targeting Gluteus muscles while standing.'
                },
                {
                    exercise: 'Plank to Pike',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/48781205preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Compound Gluteus exercise using dumbbells on a flat bench.'
                },
                {
                    exercise: 'Front Plank to Toe Tap',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/40231205preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Variation of dumbbell bench press targeting upper Gluteus on an inclined bench.'
                },
                {
                    exercise: 'Elliptical lateral Walk',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/21941205preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Variation of dumbbell bench press targeting lower Gluteus on a declined bench.'
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
                    setShowGluteus(false)
                }}>
                <AiOutlineClose />
            </button>
            <h1 className='mainhead1'>Gluteus</h1>
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

export default GluteusPage;
