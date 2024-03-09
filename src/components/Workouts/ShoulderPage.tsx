"use client"
import React from 'react';
import './page.scss';
import { AiOutlineClose } from 'react-icons/ai';

interface ShoulderPageProps {
    setShowShoulder: React.Dispatch<React.SetStateAction<boolean>>;
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

const ShoulderPage: React.FC<ShoulderPageProps> = ({ setShowShoulder }) => {
    const [workout, setWorkout] = React.useState<WorkoutData | null>(null);

    const getworkout = async () => {
        let data: any = {
            type: 'Shoulder',
            imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
            durationInMin: 30,
            exercises: [
                {
                    exercise: 'Lever Shoulder Press',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/08691205levershoulderpressplateloadedversion2shouldersview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Compound Shoulder exercise using a barbell on a flat bench.',
                },
                {
                    exercise: 'Dumbbell Chest Supported Lateral Raises',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/36851205preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Variation of bench press targeting upper Shoulder muscles.'

                },
                {
                    exercise: 'Dumbbell Seated Shoulder Press',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/04041205dumbbellseatedshoulderpressparallelgripshoview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Variation of bench press targeting lower Shoulder muscles.'
                },
                {
                    exercise: 'Dumbbell Seated Alternate Shoulder Press',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/35461205preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Bodyweight exercise targeting Shoulder and triceps.'
                },
                {
                    exercise: 'Shoulder Grip Pull-up',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/17631205preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Resistance band exercise mimicking Shoulder fly movement.'
                },
                {
                    exercise: 'Smith Seated Shoulder Press',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/432784db87b0d6bd55ea9214b92917ef.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Resistance band exercise targeting upper Shoulder on an inclined surface.'
                },
                {
                    exercise: 'Smith Standing Shoulder Press',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/520650844e8430a03902c9ab19f60f41.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Resistance band exercise targeting Shoulder muscles while standing.'
                },
                {
                    exercise: 'Dumbbell Seated Shoulder Press',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/04051205dumbbellseatedshoulderpressshouldersfix2view.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Compound Shoulder exercise using dumbbells on a flat bench.'
                },
                {
                    exercise: 'Lever Seated Shoulder Press',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/14541205leverseatedshoulderpressshouldersfixview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Variation of dumbbell bench press targeting upper Shoulder on an inclined bench.'
                },
                {
                    exercise: 'Cable Shoulder 90 degrees External Rotation',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/50871205preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Variation of dumbbell bench press targeting lower Shoulder on a declined bench.'
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
                    setShowShoulder(false)
                }}>
                <AiOutlineClose />
            </button>
            <h1 className='mainhead1'>Shoulder</h1>
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

export default ShoulderPage;
