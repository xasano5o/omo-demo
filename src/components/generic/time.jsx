import React, { useEffect, useState } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const targetTime = new Date();
    targetTime.setHours(6, 23, 59, 59); // Set the target time to 6:23:59
    const now = new Date();

    // If the current time is after the target time, set the target time to the next day
    if (now >= targetTime) {
      targetTime.setDate(now.getDate() + 1);
    }

    const timeDiff = targetTime - now;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className='flex items-center '>
        <span className='flex flex-col items-center'>{timeLeft.days}&nbsp;:&nbsp; <span>k</span></span>
        <span className='flex flex-col items-center'>{timeLeft.hours}&nbsp;:&nbsp; <span>s</span></span>
        <span className='flex flex-col items-center'>{timeLeft.minutes}&nbsp;:&nbsp; <span>m</span></span>
        <span className='flex flex-col items-center'>{timeLeft.seconds} <span>s</span></span>
      </div>


    </div>
  );
};

export default CountdownTimer;
