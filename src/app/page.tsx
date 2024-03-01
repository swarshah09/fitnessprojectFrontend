"use client"
import React, { useState } from 'react';
import WelcomePage from '@/components/WelcomePage/WelcomePage';
import HomeBanner1 from '@/components/HomeBanner1/HomeBanner1';
import HomeBanner2 from '@/components/HomeBanner2/HomeBanner2';

export default function Home() {
  const [isStarted, setIsStarted] = useState(false); // State variable to track if "Get Started" is clicked

  // Function to handle "Get Started" click
  const handleGetStarted = () => {
    setIsStarted(true); // Update the state to indicate that the user has started
  };

  return (
    <main>
      {/* Render WelcomePage if "Get Started" is not clicked, otherwise render home page components */}
      {!isStarted ? (
        <WelcomePage onGetStarted={handleGetStarted} />
      ) : (
        <>
          <HomeBanner2 />
          <HomeBanner1 />
        </>
      )}
    </main>
  );
}
