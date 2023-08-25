import React, { createContext, useContext, useEffect, useState } from "react";
import { CustomAlert } from "../../components";
const AlertsContext = createContext();

export const AlertsProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  useEffect(() => {
    if (isAlertVisible) {
      setTimeout(() => {
        setIsAlertVisible(false);
        setData({});
      }, 3000);
    }
  }, [data]);

  const showAlert = (type, message) => {
    setData({ type, message });
    setIsAlertVisible(true);
  };

  return (
    <AlertsContext.Provider value={{ showAlert, data, isAlertVisible }}>
      {isAlertVisible && <CustomAlert data={data} />}
      {children}
    </AlertsContext.Provider>
  );
};

export const useAlerts = () => {
  return useContext(AlertsContext);
};
