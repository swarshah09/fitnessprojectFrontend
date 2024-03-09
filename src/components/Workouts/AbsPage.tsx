import React from 'react';
import './page.scss';
import { AiOutlineClose } from 'react-icons/ai';

interface AbsPageProps {
    setShowAbs: React.Dispatch<React.SetStateAction<boolean>>;
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

const AbsPage: React.FC<AbsPageProps> = ({ setShowAbs }) => {

    const [workout, setWorkout] = React.useState<WorkoutData | null>(null);

    const getworkout = async () => {
        let data: any = {
            type: 'Abs',
            imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
            durationInMin: 30,
            exercises: [
                {
                    exercise: 'Crunches',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/02741205crunchfloorwaistview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Abdominal exercise involving lifting the torso off the floor.',
                },
                {
                    exercise: 'Alternate Heel Touchers',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/00061205preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Core exercise targeting oblique muscles by touching heels alternately.'

                },
                {
                    exercise: 'Alternate Leg Raise',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/48261205preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Leg exercise engaging lower abdominal muscles by raising legs alternately.'
                },
                {
                    exercise: 'Band Kneeling Crunch ',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/40801205preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Abdominal exercise using resistance bands while kneeling.'
                },
                {
                    exercise: 'Elbow to Knee Sit up',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/34841205preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Core exercise involving bringing elbows to knees during a sit-up motion.'
                },
                {
                    exercise: 'Front Plank',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/04631205preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Core-strengthening exercise maintaining a straight body position supported by forearms and toes.'
                },
                {
                    exercise: 'Hanging Oblique Knee Raise',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/267eebd34ce9110c0d18135b063df326.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Hanging exercise targeting oblique muscles by raising knees to the side.'
                },
                {
                    exercise: 'Oblique Crunches Floor',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/06351205preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Abdominal exercise focusing on oblique muscles while lying on the floor.'
                },
                {
                    exercise: 'Side Plank',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/07151205preview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Core exercise involving supporting the body on one side, engaging obliques and core stabilizers.'
                },
                {
                    exercise: 'Wheel Rollout with Wall Support ',
                    videoUrl: 'https://gymvisual.com/modules/productmedia/uploads/40931205wheelrolloutwithwallsupportmalewaistview.mp4',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Abdominal exercise using a wheel while supported by a wall, engaging core muscles.'
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
                    setShowAbs(false)
                }}>
                <AiOutlineClose />
            </button>
            <h1 className='mainhead1'>Abs Day</h1>
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

export default AbsPage;
