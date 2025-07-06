'use client'; 

import React, { useState, useEffect } from 'react';

export default function GreetingsDisplay(): JSX.Element {
  const [greeting, setGreeting] = useState<string>('');

  useEffect(() => {
    const updateGreeting = (): void => {
      const now: Date = new Date();
      const hour: number = now.getHours();

      let newGreeting: string = '';
      if (hour >= 5 && hour < 12) {
        newGreeting = 'Good morning';
      } else if (hour >= 12 && hour < 18) {
        newGreeting = 'Good afternoon';
      } else {
        newGreeting = 'Good evening';
      }
      setGreeting(newGreeting);
    };

    updateGreeting();
    const intervalId: NodeJS.Timeout = setInterval(updateGreeting, 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (!greeting) {
    return <></>; 
  }

  return (
    <h1 className="font-serif font-medium text-white">
      {greeting}, User
    </h1>
  );
}