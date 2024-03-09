// ProfilePage.tsx

import React, { useEffect, useState } from 'react';
import './Profile.scss'; // You can style your profile page here
import maleImage from '../../assets/male.png';
import femaleImage from '../../assets/female.png';
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';

interface ProfilePageProps {
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

interface User {
  name: string;
  email: string;
  weight: { weight: number; date: Date }[];
  height: { height: number; date: Date }[];
  gender: string;
  dob: Date; // Add dob field
  goal: string;
  activityLevel: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ setShowProfile }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch user details from the backend upon login
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/user', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          // Handle error
          console.error('Failed to fetch user details');
        }
      } catch (error) {
        // Handle error
        console.error('Failed to fetch user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  return (
    <div className="profile-page">
      <button className="close" onClick={handleCloseProfile}>
        <AiOutlineClose />
      </button>
      {user ? (
        <div className="profile-details">
          <div className="profile-header">
            {user.gender === 'male' && <Image className="img" src={maleImage} alt="Male" />}
            {user.gender === 'female' && <Image className="img" src={femaleImage} alt="Female" />}
            <h1>Hello, {user.name}!</h1>
            <p>Email: {user.email}</p>
          </div>

          <div className="profile-body">
            <h5>Weight</h5>
            <p>{user.weight.length > 0 ? user.weight[user.weight.length - 1].weight : 'N/A'} kg</p>
            <h5>Height</h5>
            <p>{user.height.length > 0 ? user.height[user.height.length - 1].height : 'N/A'} cm</p>
            <h5>Gender</h5>
            <p>{user.gender}</p>
            <h5>Date of Birth</h5>
            <p>{user.dob ? new Date(user.dob).toLocaleDateString() : 'N/A'}</p> {/* Display date of birth */}
            <h5>Goal</h5>
            <p>{user.goal}</p>
            <h5>Activity Level</h5>
            <p>{user.activityLevel}</p>
          </div>
        </div>
      ) : (
        <div className="wrapper">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
          <p>LogIn to get your deatils!</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
