import React, { useState, useEffect } from "react";

export const useAlert = () => {
  const [data, setData] = useState({
    type: "",
    message: "",
  });
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  useEffect(() => {
    if (isAlertVisible) {
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 3000);
    }
  }, [data]);

  const show = (type, message) => {
    setData({ type, message });
    setIsAlertVisible(true);
  };
  return { show, data, isAlertVisible };
};
