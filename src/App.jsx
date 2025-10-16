// Filename: App.js (Corrected)
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header.jsx';
import { DroneCompanyWebsite, CareersPage, TalentSolutionsPage, LoadingScreen } from './WebsiteComponents.jsx';

function App() {
  // State to track if we've checked localStorage yet. This prevents content flashing.
  const [isInitialized, setIsInitialized] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [displayText, setDisplayText] = useState('Initializing');

  useEffect(() => {
    // This effect runs only once on mount to check for the 'hasVisited' flag.
    try {
      const hasVisited = localStorage.getItem('hasVisited');
      if (hasVisited === 'true') {
        // If they've visited, we don't need to show the loading screen.
        setShowLoading(false);
      } else {
        // If it's the first visit, we trigger the loading screen.
        setShowLoading(true);
      }
    } catch (err) {
      console.warn('localStorage access failed, skipping loading screen:', err);
      // Fail gracefully by not showing the loader if localStorage is blocked.
      setShowLoading(false);
    }
    // Mark the initialization check as complete.
    setIsInitialized(true);
  }, []); // <-- FIX: Use an empty array to run this effect only once on mount.

  useEffect(() => {
    // This effect handles the loading animation itself.
    // It only runs if showLoading is true.
    if (!showLoading) {
      return;
    }

    const interval = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + 5;

        // Update display text based on progress
        if (newProgress < 30) setDisplayText('Initializing');
        else if (newProgress < 60) setDisplayText('Calibrating');
        else if (newProgress < 90) setDisplayText('Processing');
        else setDisplayText('Finalizing');
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowLoading(false);
            try {
              // Set the flag in localStorage so the loading screen doesn't show again.
              localStorage.setItem('hasVisited', 'true');
            } catch (err) {
              console.warn('localStorage write failed:', err);
            }
          }, 350); // A short delay for the "Finalizing" text to be readable.
          return 100;
        }
        
        return newProgress;
      });
    }, 100); // The speed of the loading bar.

    // Cleanup function to prevent memory leaks.
    return () => clearInterval(interval);
  }, [showLoading]); // This effect correctly depends on 'showLoading'.

  // Before the localStorage check is complete, render nothing to avoid a content flash.
  if (!isInitialized) {
    return null; 
  }

  return (
    <Router>
      {showLoading ? (
        <LoadingScreen isLoading={showLoading} progress={progress} displayText={displayText} />
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<DroneCompanyWebsite />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/talent-solutions" element={<TalentSolutionsPage />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;