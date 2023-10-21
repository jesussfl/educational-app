import React, { useEffect, useState } from "react";

export default useCountdownTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [countdownInterval, setCountdownInterval] = useState(null);

  const startCountdownTimer = (callback, initialTime) => {
    if (isCountdownActive) {
      return; // Evitar iniciar otro temporizador si ya está activo
    }

    setTimeRemaining(initialTime);
    setIsCountdownActive(true);
    const interval = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => {
        if (prevTimeRemaining <= 1) {
          clearInterval(interval);
          setIsCountdownActive(false);
          callback();
          return 0;
        }
        return prevTimeRemaining - 1;
      });
    }, 1000);

    setCountdownInterval(interval);
  };

  const stopCountdownTimer = () => {
    if (isCountdownActive) {
      clearInterval(countdownInterval); // Detener el temporizador usando el ID del intervalo almacenado
      setIsCountdownActive(false);
    }
  };

  return {
    timeRemaining,
    startCountdownTimer,
    stopCountdownTimer,
    isCountdownActive,
  };
};
