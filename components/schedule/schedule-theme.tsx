"use client";

import { createContext, useContext } from "react";

const ScheduleThemeContext = createContext(false);

export const ScheduleThemeProvider = ScheduleThemeContext.Provider;
export const useScheduleLightMode = () => useContext(ScheduleThemeContext);
