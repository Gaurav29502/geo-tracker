import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import openingAnimationData from './lottiefiles/opening.json';
import './OpeningAnimation.css';

const OpeningAnimation = ({ onAnimationComplete }) => {
  const [animationVisible, setAnimationVisible] = useState(true);

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setAnimationVisible(false);
      onAnimationComplete();
    }, 3000); // 3 seconds

    return () => clearTimeout(animationTimeout);
  }, [onAnimationComplete]);

  return (
    <div className={`opening-animation ${animationVisible ? 'visible' : 'hidden'}`}>
      <Lottie
        options={{
          loop: false,
          autoplay: true,
          animationData: openingAnimationData,
        }}
      />
    </div>
  );
};

export default OpeningAnimation;
