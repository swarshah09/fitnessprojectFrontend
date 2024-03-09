"use client"
import React from 'react';
import './page.scss';
import { AiOutlineClose } from 'react-icons/ai';

interface LegsPageProps {
    setShowLegs: React.Dispatch<React.SetStateAction<boolean>>;
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

const LegsPage: React.FC<LegsPageProps> = ({ setShowLegs }) => {
    const [workout, setWorkout] = React.useState<WorkoutData | null>(null);

    const getworkout = async () => {
        let data: any = {
            type: 'Legs',
            imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
            durationInMin: 30,
            exercises: [
                {
                    exercise: 'Lever Seated One Leg Curl',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/15861205preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Compound Legs exercise using a barbell on a flat bench.',
                },
                {
                    exercise: 'Lever Standing Single Leg Curl',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/51811205preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Variation of bench press targeting upper Legs muscles.'

                },
                {
                    exercise: 'Dumbbell Single Leg Split Squat',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/04101205dumbbellsinglelegsplitsquatthighsview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Variation of bench press targeting lower Legs muscles.'
                },
                {
                    exercise: 'Sled Narrow Stance Leg Press',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/77e983e85cd28332a824773b1b9aac6c.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Bodyweight exercise targeting Legs and triceps.'
                },
                {
                    exercise: 'Dumbbell Single Leg Step-Up',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/29251205preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Resistance band exercise mimicking Legs fly movement.'
                },
                {
                    exercise: 'Dumbbell Standing Single Leg Calf Raise',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/37131205preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Resistance band exercise targeting upper Legs on an inclined surface.'
                },
                {
                    exercise: 'Roll Seated Single Leg Shoulder Flexor Depresor Retractor',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/22091205preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Resistance band exercise targeting Legs muscles while standing.'
                },
                {
                    exercise: 'Sled Calf Press On Leg Press',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/13911205sledcalfpressonlegpresscalvesfixview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Compound Legs exercise using dumbbells on a flat bench.'
                },
                {
                    exercise: 'Self Assisted Inverse Leg Curl',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/3794df98f99c8092e4154c4515d64d8b.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Variation of dumbbell bench press targeting upper Legs on an inclined bench.'
                },
                {
                    exercise: 'Smith Single Leg Split Squat',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/07681205smithsinglelegsplitsquatthighsview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Variation of dumbbell bench press targeting lower Legs on a declined bench.'
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
                    setShowLegs(false)
                }}>
                <AiOutlineClose />
            </button>
            <h1 className='mainhead1'>Legs Day</h1>
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

export default LegsPage;
