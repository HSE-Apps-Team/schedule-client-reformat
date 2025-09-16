import React, { createContext, useContext, useEffect, useState } from 'react';

// Device types
export const DEVICE_TYPES = {
  DESKTOP: 0,
  MOBILE_LANDSCAPE: 1,
  MOBILE_PORTRAIT: 2,
};


const DeviceTypeContext = createContext();


function getDeviceType() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  // You can adjust these breakpoints as needed
  if (width >= 1250) {
    return DEVICE_TYPES.DESKTOP;
  } else if (width > height) {
    return DEVICE_TYPES.MOBILE_LANDSCAPE;
  } else {
    return DEVICE_TYPES.MOBILE_PORTRAIT;
  }
}

export const DeviceTypeProvider = ({ children }) => {
  const [deviceType, setDeviceType] = useState(getDeviceType());

  useEffect(() => {
    function handleResize() {
      setDeviceType(getDeviceType());
    }
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return (
    <DeviceTypeContext.Provider value={{ deviceType }}>
      {children}
    </DeviceTypeContext.Provider>
  );
};

export const useDeviceType = () => {
  const context = useContext(DeviceTypeContext);
  if (!context) {
    throw new Error("useDeviceType must be used within a DeviceTypeProvider");
  }
  return context;
};
