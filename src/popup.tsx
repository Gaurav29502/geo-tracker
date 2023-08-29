import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Lottie from 'react-lottie';
import './popup.css';
import countryCodeToName from './countryCodes';
import animationData from './lottiefiles/opening.json'
import OpeningAnimation from './OpeningAnimation';
require('dotenv').config()

const IndexPopup = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const IPINFO_API_ENDPOINT = 'https://ipinfo.io';
  const IPINFO_API_TOKEN = process.env.PLASMO_PUBLIC_IPINFO_API_TOKEN;

  const [loading, setLoading] = useState(false);
  const [ipAddress, setIpAddress] = useState('');
  const [location, setLocation] = useState('');
  const [animationCompleted, setAnimationCompleted] = useState(false);

  const handleAnimationComplete = () => {
    setAnimationCompleted(true);
  };

  const getLocation = async (ipAddress: string) => {
    try {
      const response = await axios.get(`${IPINFO_API_ENDPOINT}/${ipAddress}?token=${IPINFO_API_TOKEN}`);
      const { city, country } = response.data;
      const countryName = countryCodeToName[country] || 'Unknown Country';
      return { city, country: countryName };
    } catch (error) {
      console.error('Error fetching location:', error);
      throw error;
    }
  };
  

  const showLocation = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.ipify.org?format=json');
      const { ip } = response.data;
      setIpAddress(ip);
      const { country, city } = await getLocation(ip);
      setLocation(`Your country is ${country} and city is ${city}.`);
    } catch (error) {
      console.error('Error fetching IP or location:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-container">
    {!animationCompleted ? (
      <OpeningAnimation onAnimationComplete={handleAnimationComplete} />
    ) : (
      <React.Fragment>
        <Lottie options={defaultOptions} height={200} width={200} />
        <button
          className={`btn ${loading ? 'btn-loading' : ''}`}
          onClick={showLocation}
          disabled={loading}
        >
          {loading ? <div className="loading-circle"></div> : 'Show my location'}
        </button>
        {location && <p className="location-info">{location}</p>}
      </React.Fragment>
    )}
  </div>
  );
};

export default IndexPopup
