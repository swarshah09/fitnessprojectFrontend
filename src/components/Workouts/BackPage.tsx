import React from 'react';
import './page.scss';
import { AiOutlineClose } from 'react-icons/ai';

interface BackPageProps {
    setShowBack: React.Dispatch<React.SetStateAction<boolean>>;
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

const BackPage: React.FC<BackPageProps> = ({ setShowBack }) => {

    const [workout, setWorkout] = React.useState<WorkoutData | null>(null);

    const getworkout = async () => {
        let data: any = {
            type: 'Back',
            imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
            durationInMin: 30,
            exercises: [
                {
                    exercise: 'Assisted Parallel Close-Grip Pull-up',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/00151205preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Compound chest exercise using a barbell on a flat bench.',
                },
                {
                    exercise: 'Cable Bar Lateral Pulldown',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/80913257afaf68f92bd20b283330380c.mp4',
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
                    exercise: 'Cable Seated Row with V-bar',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/26611205cableseatedrowwithvbarbackfixview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Bodyweight exercise targeting chest and triceps.'
                },
                {
                    exercise: 'Cable Standing Lat Pushdown ',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/12291205cablestandinglatpushdownropeequipmentbackview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Resistance band exercise mimicking chest fly movement.'
                },
                {
                    exercise: 'Dumbbell Bent-Over Row',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/fce91eef7479949fb438ab4706120aaf.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Resistance band exercise targeting upper chest on an inclined surface.'
                },
                {
                    exercise: 'Dumbbell Lying Rear Delt Row',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/fce91eef7479949fb438ab4706120aaf.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Resistance band exercise targeting chest muscles while standing.'
                },
                {
                    exercise: 'Cable Seated Wide-grip Row',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/02181205cableseatedwidegriprowbackfixview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Compound chest exercise using dumbbells on a flat bench.'
                },
                {
                    exercise: 'Landmine Bent over Row with V-bar',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/32001205preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Variation of dumbbell bench press targeting upper chest on an inclined bench.'
                },
                {
                    exercise: 'Dumbbell Bent-over Row',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/02921205dumbbellbentoverrowbackfixview.mp4',
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
    return(
        <div className='main'>
            <button className='close'
                onClick={() => {
                    setShowBack(false)
                }}>
                <AiOutlineClose />
            </button>
            <h1 className='mainhead1'>Back Day</h1>
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

export default BackPage;
