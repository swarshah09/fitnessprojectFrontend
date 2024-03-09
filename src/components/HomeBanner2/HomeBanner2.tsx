import React from 'react';
import './HomeBanner2.scss';
import ChestPage from '../Workouts/ChestPage';
import AbsPage from '../Workouts/AbsPage';
import BackPage from '../Workouts/BackPage';
import BicepsPage from '../Workouts/BicepsPage';
import TricepsPage from '../Workouts/TricepsPage';
import ShoulderPage from '../Workouts/ShoulderPage';
import LegsPage from '../Workouts/LegsPage';
import GluteusPage from '../Workouts/GluteusPage';
import StretchingPage from '../Workouts/StretchingPage';

const HomeBanner2 = () => {
    const [showChest, setShowChest] = React.useState<boolean>(false);
    const [showAbs, setShowAbs] = React.useState<boolean>(false);
    const [showBack, setShowBack] = React.useState<boolean>(false);
    const [showBiceps, setShowBiceps] = React.useState<boolean>(false);
    const [showTriceps, setShowTriceps] = React.useState<boolean>(false);
    const [showShoulder, setShowShoulder] = React.useState<boolean>(false);
    const [showLegs, setShowLegs] = React.useState<boolean>(false);
    const [showGluteus, setShowGluteus] = React.useState<boolean>(false);
    const [showStretching, setShowStretching] = React.useState<boolean>(false);

    return (
        <div>
            <h1 className='mainhead1'>W<span>o</span>rk<span>o</span>uts</h1>
            <div className='workout'>
                <div className="row1">
                    <div
                        className="window"
                        onClick={() => {
                            setShowChest(true);
                        }}
                    >
                        <p>Chest</p>
                    </div>

                    {showChest && <ChestPage setShowChest={setShowChest} />}
                    <div
                        className="window2"
                        onClick={() => {
                            setShowAbs(true);
                        }}
                    >
                        <p>Abs</p>
                    </div>
                    {showAbs && <AbsPage setShowAbs={setShowAbs} />}
                    <div
                        className="window3"
                        onClick={() => {
                            setShowBack(true);
                        }}
                    >
                        <p>Back</p>
                    </div>
                    {showBack && <BackPage setShowBack={setShowBack} />}
                </div>
                {/* *********************************************************************************** */}
                <div className="row2">
                    <div
                        className="window4"
                        onClick={() => {
                            setShowBiceps(true);
                        }}
                    >
                        <p>Biceps</p>
                    </div>

                    {showBiceps && <BicepsPage setShowBiceps={setShowBiceps} />}
                    <div
                        className="window5"
                        onClick={() => {
                            setShowTriceps(true);
                        }}
                    >
                        <p>Triceps</p>
                    </div>
                    {showTriceps && <TricepsPage setShowTriceps={setShowTriceps} />}
                    <div
                        className="window6"
                        onClick={() => {
                            setShowShoulder(true);
                        }}
                    >
                        <p>Shoulder</p>
                    </div>
                    {showShoulder && <ShoulderPage setShowShoulder={setShowShoulder} />}
                </div>
                {/* *********************************************************************************** */}
                <div className="row3">
                    <div
                        className="window7"
                        onClick={() => {
                            setShowLegs(true);
                        }}
                    >
                        <p>Legs</p>
                    </div>

                    {showLegs && <LegsPage setShowLegs={setShowLegs} />}
                    <div
                        className="window8"
                        onClick={() => {
                            setShowGluteus(true);
                        }}
                    >
                        <p>Gluteus</p>
                    </div>
                    {showGluteus && <GluteusPage setShowGluteus={setShowGluteus} />}
                    <div
                        className="window9"
                        onClick={() => {
                            setShowStretching(true);
                        }}
                    >
                        <p>Stretching</p>
                    </div>
                    {showStretching && <StretchingPage setShowStretching={setShowStretching} />}
                </div>
            </div>
        </div>
    );
};

export default HomeBanner2;
