import React, { useState, useEffect } from "react";

export const useAlert = (response) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (response.type === "success") {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  }, [response]);

  return { showAlert, setShowAlert };
};
