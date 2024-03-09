"use client"
import React from 'react';
import './page.scss';
import { AiOutlineClose } from 'react-icons/ai';

interface TricepsPageProps {
    setShowTriceps: React.Dispatch<React.SetStateAction<boolean>>;
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

const TricepsPage: React.FC<TricepsPageProps> = ({ setShowTriceps }) => {
    const [workout, setWorkout] = React.useState<WorkoutData | null>(null);

    const getworkout = async () => {
        let data: any = {
            type: 'Triceps',
            imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
            durationInMin: 30,
            exercises: [
                {
                    exercise: 'Band High Pulley Overhead Triceps Extension',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/58771205bandhighpulleyoverheadtricepsextensionupperarmsview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Compound Triceps exercise using a barbell on a flat bench.',
                },
                {
                    exercise: 'EZ Barbell Lying Triceps Extension',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/58731205ezbarbelllyingtricepsextensionmaleupperarmsview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Variation of bench press targeting upper Triceps muscles.'

                },
                {
                    exercise: 'Dumbbell Pullover',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/53301205preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Variation of bench press targeting lower Triceps muscles.'
                },
                {
                    exercise: 'Triceps Dips',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/b2375d9062f90b0191aa025791c4a958.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Bodyweight exercise targeting Triceps and triceps.'
                },
                {
                    exercise: 'Band Overhead Triceps Extension',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/41391205bandoverheadtricepsextensionversion2upperview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Resistance band exercise mimicking Triceps fly movement.'
                },
                {
                    exercise: 'Dumbbells Seated Triceps Extension',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/21891205dumbbellsseatedtricepsextensionupperarmsview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Resistance band exercise targeting upper Triceps on an inclined surface.'
                },
                {
                    exercise: 'Band Triceps Kickback',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/41431205bandtricepskickbackupperarmsview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Resistance band exercise targeting Triceps muscles while standing.'
                },
                {
                    exercise: 'Cable Triceps Pushdown',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/16051205cabletricepspushdownszbarupperarmsview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Compound Triceps exercise using dumbbells on a flat bench.'
                },
                {
                    exercise: 'Cable Reverse Grip Triceps Pushdown',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/b5d511ac24d27f87a16a0c63cb046860.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Variation of dumbbell bench press targeting upper Triceps on an inclined bench.'
                },
                {
                    exercise: 'Cable Triceps Pushdown ',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/990abe9718c1ef91f4878df618255845.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Variation of dumbbell bench press targeting lower Triceps on a declined bench.'
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
                    setShowTriceps(false)
                }}>
                <AiOutlineClose />
            </button>
            <h1 className='mainhead1'>Triceps</h1>
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

export default TricepsPage;
