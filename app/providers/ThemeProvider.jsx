"use client";

import { ThemeContext } from "../context/ThemeContext";
import React, { useContext, useEffect, useState } from "react";

const ThemeProvider = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    return <div className= {`h-100vh w-100vw ${theme}`} >{children}</div>;
  }
};

export default ThemeProvider;