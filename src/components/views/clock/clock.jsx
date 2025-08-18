import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import dayjs from "dayjs";
import useMedia from "../../../hooks/useMedia";
import Progress from "./progress.jsx";
import { getSchedule } from "../../../api/api.js";

import { Box, Text, VStack, CircularProgress, Skeleton } from "@chakra-ui/react";
import { useSettings } from "../../../hooks/useSettings";

// Import dayjs plugins
dayjs.extend(require("dayjs/plugin/customParseFormat"));
dayjs.extend(require("dayjs/plugin/duration"));
dayjs.extend(require("dayjs/plugin/relativeTime"));

// This file does time countdown and stuff like that.  

//From Nic, Clock is the main thing we do, so keeping that running is otp priority. 
// Its really simple, using chakra's circular progress, using the timer. 
// It's a lot of spaghetti code, and we don't really know what it all does, and its fairly easy to design except for colors. 

// `Progress.jsx` makes the progress bar and adds the text. 


// Define school status constants for better readability
const STATUS = {
  LOADING: "LOADING",
  BEFORE_SCHOOL: "BEFORE_SCHOOL",
  SCHOOL_NOW: "SCHOOL_NOW",
  AFTER_SCHOOL: "AFTER_SCHOOL",
  NO_SCHOOL: "NO_SCHOOL",
};

// Define lunch status constants
const LUNCH_STATUS = {
  NONE: "NONE",
  BEFORE: "BEFORE",
  DURING: "DURING",
  AFTER: "AFTER",
};

const Clock = ({ loading, setLoading }) => {
  // Responsive layout hook
  const mobile = useMedia(["(min-width: 750px)", "(max-width: 750px)"], [false, true]);

  // State
  const [schedule, setSchedule] = useState(null);
  const [period, setPeriod] = useState(null);
  const [nextPeriod, setNextPeriod] = useState(null);
  const [currentTime, setCurrentTime] = useState(dayjs().valueOf()); // Keep this as state for re-renders
  const [status, setStatus] = useState(STATUS.LOADING);
  const [noSchoolText, setNoSchoolText] = useState(null);
  const [lunchStatus, setLunchStatus] = useState(LUNCH_STATUS.NONE);
  const [error, setError] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [nextEvent, setNextEvent] = useState(null);
  const [day, setDay] = useState("blueDay");

  // Ref for tracking found next period (can keep, it's not hurting anything)
  const nextPeriodFoundRef = useRef(false);


  // Get user settings
  const { settings } = useSettings();
  // Determine the user's selected lunch type (e.g., "A", "B", "C")
  const userLunchType = useMemo(() => {
    // Early return if settings aren't loaded
    if (!settings) return null;

    // Use a stable reference to day to prevent dependency issues
    const currentDay = day;
    console.log(day)
    const isBlueDay = currentDay === "Royal";

    let type;
    // Modern settings format
    if (settings.blueDayLunch && settings.grayDayLunch) {
      type = isBlueDay
        ? settings.blueDayLunch.toUpperCase()
        : settings.grayDayLunch.toUpperCase();
    }
    // Legacy settings format fallback
    else {
      type = isBlueDay
        ? settings.royalLunch
        : settings.grayLunch;
    }

    return type;
  }, [settings, day]);

  // Calculate the lunch status based on current time and period
  // This useCallback still needs period and userLunchType.
  // It takes the current period and a time value as arguments,
  // ensuring it's "pure" regarding its dependencies.
  const getLunchStatus = useCallback((currentPeriod, time) => {
    if (!currentPeriod || !currentPeriod.lunchPeriods || !userLunchType) {
      return LUNCH_STATUS.NONE;
    }

    const userLunchPeriod = currentPeriod.lunchPeriods[userLunchType];
    if (!userLunchPeriod) {
      return LUNCH_STATUS.NONE;
    }

    if (time < userLunchPeriod.startTimeUnix) {
      return LUNCH_STATUS.BEFORE;
    } else if (time >= userLunchPeriod.startTimeUnix && time < userLunchPeriod.endTimeUnix) {
      return LUNCH_STATUS.DURING;
    } else {
      return LUNCH_STATUS.AFTER;
    }
  }, [userLunchType]); // Only depends on userLunchType, which is memoized.

  // Process schedule data to add unix timestamps
  const processScheduleData = useCallback((scheduleData) => {
    if (!scheduleData || !Array.isArray(scheduleData)) return [];

    return scheduleData.map(period => {
      const processedPeriod = {
        ...period,
        startTimeUnix: dayjs(period.startTime, "h:mm A").valueOf(),
        endTimeUnix: dayjs(period.endTime, "h:mm A").valueOf(),
      };

      if (period.lunchPeriods) {
        processedPeriod.lunchPeriods = Object.entries(period.lunchPeriods).reduce((acc, [key, value]) => {
          acc[key] = {
            ...value,
            startTimeUnix: dayjs(value.startTime, "h:mm A").valueOf(),
            endTimeUnix: dayjs(value.endTime, "h:mm A").valueOf(),
          };
          return acc;
        }, {});
      }
      return processedPeriod;
    });
  }, []);

 const formatTimeRemaining = useCallback((ms) => {
    if (ms === null || ms === undefined || ms < 0) return "00:00";
    const duration = dayjs.duration(ms);

    return `${duration.hours() > 0 ? `${duration.hours()}:` : ""}${
      duration.minutes().toString().padStart(2, '0')
    }:${duration.seconds().toString().padStart(2, '0')}`;
  }, []);

  // Fetch schedule data
  const fetchSchedule = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getSchedule();
      const responseData = response.data;
      let fetchedSchedule;

      if (responseData?.data?.Type) {
        console.log("Day:", responseData.data.Type);
        setDay(responseData.data.Type);
      }
      

      if (responseData?.data?.Type === "Special") {
        const scheduleData = responseData.data.ScheduleData;
        const eventData = responseData.data.EventData || {};
        fetchedSchedule = scheduleData?.data || [];
        setNoSchoolText(eventData.NoSchoolText || null);
      } else {
        fetchedSchedule = responseData?.data?.data || [];
      }

      const processedSchedule = processScheduleData(fetchedSchedule);
      setSchedule(processedSchedule);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch schedule:", err);
      setError("Failed to load schedule. Please try again later.");
      setSchedule([]);
    } finally {
      setLoading(false);
    }
  }, [processScheduleData, setLoading]); // `setLoading` is a stable React dispatch function, safe dependency.


  const getTitleText = useCallback((remaining, currentPeriod, currentTime) => {
    if (!currentPeriod) return `${formatTimeRemaining(remaining)} remaining`;
    
    const currentLunchStatus = getLunchStatus(currentPeriod, currentTime);
    const userSpecificLunchPeriod = currentPeriod.lunchPeriods ? currentPeriod.lunchPeriods[userLunchType] : null;
    
    if (userSpecificLunchPeriod && currentLunchStatus === LUNCH_STATUS.DURING) {
      // Calculate time until lunch ends
      const lunchRemaining = userSpecificLunchPeriod.endTimeUnix - currentTime;
      return `${formatTimeRemaining(lunchRemaining)} until lunch ends`;
    } else if (userSpecificLunchPeriod && currentLunchStatus === LUNCH_STATUS.BEFORE) {
      // Calculate time until lunch starts
      const timeToLunch = userSpecificLunchPeriod.startTimeUnix - currentTime;
      return `${formatTimeRemaining(timeToLunch)} until lunch starts`;
    } else {
      return `${formatTimeRemaining(remaining)} until ${currentPeriod.periodName} ends`;
    }
  }, [formatTimeRemaining, getLunchStatus, userLunchType]);



  // This is the core logic that updates all period-related states.
  // It now depends on `schedule` and `getLunchStatus` (which are stable callbacks/states).
  // `setCurrentTime` is called inside, which causes a re-render.
  const updatePeriodAndStatus = useCallback(() => {
    const now = dayjs().valueOf();
    setCurrentTime(now); // This is crucial for triggering re-renders for the timer display.

    if (!schedule || schedule.length === 0) {
      setStatus(STATUS.NO_SCHOOL);
      setPeriod(null);
      setNextPeriod(null);
      setNextEvent(null);
      setLunchStatus(LUNCH_STATUS.NONE);
      setRemainingTime(null);
      return;
    }

    const firstPeriodStart = schedule[0].startTimeUnix;
    const lastPeriodEnd = schedule[schedule.length - 1].endTimeUnix;

    if (now < firstPeriodStart) {
      setStatus(STATUS.BEFORE_SCHOOL);
      setPeriod(null);
      setNextPeriod(schedule[0]);
      setNextEvent({
        type: "school-start",
        time: schedule[0].startTimeUnix,
        name: "School Starts"
      });
      setLunchStatus(LUNCH_STATUS.NONE);
      setRemainingTime(firstPeriodStart - now); // Remaining till school starts
    } else if (now > lastPeriodEnd) {
      setStatus(STATUS.AFTER_SCHOOL);
      setPeriod(null);
      setNextPeriod(null);
      setNextEvent(null);
      setLunchStatus(LUNCH_STATUS.NONE);
      setRemainingTime(null); // No remaining time for school
    } else {
      let currentPeriodFound = false;
      for (let i = 0; i < schedule.length; i++) {
        const currentSchedPeriod = schedule[i]; // Renamed to avoid conflict with `period` state
        if (now >= currentSchedPeriod.startTimeUnix && now < currentSchedPeriod.endTimeUnix) {
          setStatus(STATUS.SCHOOL_NOW);
          setPeriod(currentSchedPeriod);
          setNextPeriod(schedule[i + 1] || null);
          const remaining = currentSchedPeriod.endTimeUnix - now;
          setRemainingTime(remaining);

          if (currentSchedPeriod.lunchPeriods) {
            setLunchStatus(getLunchStatus(currentSchedPeriod, now));
          } else {
            setLunchStatus(LUNCH_STATUS.NONE);
          }
          setNextEvent({
            type: "period-end",
            time: currentSchedPeriod.endTimeUnix,
            name: `${currentSchedPeriod.periodName} ends`
          });
  
          currentPeriodFound = true;
          break;
        }
      }

      if (!currentPeriodFound) {
        // We are in a gap between periods (e.g., passing period)
        setPeriod(null);
        setLunchStatus(LUNCH_STATUS.NONE); // No lunch during passing
        setRemainingTime(null); // Will be calculated by nextEvent logic

        for (let i = 0; i < schedule.length; i++) {
          if (now < schedule[i].startTimeUnix) {
            setStatus(STATUS.BEFORE_SCHOOL); // Treat passing as "before next period"
            setNextPeriod(schedule[i]);
            setNextEvent({
              type: "period-start",
              time: schedule[i].startTimeUnix,
              name: schedule[i].periodName
            });
            setRemainingTime(schedule[i].startTimeUnix - now); // Remaining till next period
            break;
          }
        }
      }
    }

    // Move title update logic here to always run regardless of period state
    if (settings?.showTimerInTitle) {
      if (period) {
        const remaining = period.endTimeUnix - now;
        document.title = getTitleText(remaining, period, now);
      } else if (remainingTime !== null) {
        document.title = `${formatTimeRemaining(remainingTime)} remaining`;
      } else {
        document.title = "HSE Schedule";
      }
    } else {
      document.title = "HSE Schedule";
    }

  }, [schedule, getLunchStatus, settings, getTitleText, formatTimeRemaining]); // Dependencies are stable: schedule (when fetched), getLunchStatus (memoized)

  // Format time remaining in current period or until next event


  // Text to display in the progress component (now depends on currentTime state directly)
  const timeDisplayText = useMemo(() => {
    let relevantEndTime = null;
    let relevantStartTime = null; // Used for progress calculation if needed

    if (status === STATUS.SCHOOL_NOW && period) {
      // Logic for current period and potential lunch
      const currentLunchStatus = getLunchStatus(period, currentTime); // Pass currentTime state
      const userSpecificLunchPeriod = period.lunchPeriods ? period.lunchPeriods[userLunchType] : null;

      if (userSpecificLunchPeriod) {
        if (currentLunchStatus === LUNCH_STATUS.DURING) {
          relevantEndTime = userSpecificLunchPeriod.endTimeUnix;
        } else if (currentLunchStatus === LUNCH_STATUS.BEFORE) {
          relevantEndTime = userSpecificLunchPeriod.startTimeUnix;
        } else if (currentLunchStatus === LUNCH_STATUS.AFTER) {
          relevantEndTime = period.endTimeUnix;
        } else {
          relevantEndTime = period.endTimeUnix;
        }
      } else {
        relevantEndTime = period.endTimeUnix;
      }
    } else if (nextEvent) {
      relevantEndTime = nextEvent.time;
    }

    if (relevantEndTime !== null) {
      return formatTimeRemaining(relevantEndTime - currentTime);
    }
    return "";
  }, [formatTimeRemaining, period, currentTime, status, nextEvent, getLunchStatus, userLunchType]); // currentTime is a dependency here

  // Initial schedule data fetch on component mount
  useEffect(() => {
    let isMounted = true;
    const initializeSchedule = async () => {
      if (isMounted) {
        await fetchSchedule();
      }
    };
    initializeSchedule();
    return () => {
      isMounted = false;
    };
  }, [fetchSchedule]); // `WorkspaceSchedule` is a stable useCallback

  // Set up time interval update
  useEffect(() => {
    if (!schedule) return; // Don't start timer until schedule is loaded

    // This interval will directly call updatePeriodAndStatus,
    // which in turn updates `currentTime` state, triggering re-renders
    // for components that depend on `currentTime`.
    const timerId = setInterval(() => {
      updatePeriodAndStatus();
    }, 500); // Update every 500ms for smoothness

    // Initial run to set state immediately on schedule load
    updatePeriodAndStatus();

    // Cleanup on unmount
    return () => clearInterval(timerId);
  }, [schedule, updatePeriodAndStatus]); // `schedule` and `updatePeriodAndStatus` are stable dependencies for this useEffect

  // Loading state
  if (loading) {
    return null;
  }

  // Error state
  if (error) {
    return (
      <Box textAlign="center" p={5}>
        <Text fontSize="xl" color="red.500" mb={4}>
          {error}
        </Text>
        <Text fontSize="md">
          Check your internet connection and try refreshing the page.
        </Text>
      </Box>
    );
  }

  // During school hours - show progress
  if (status === STATUS.SCHOOL_NOW) {
    // getLunchStatus is called here for the Progress component,
    // ensuring the `lunchStatus` prop is always up-to-date with current time.
    const currentLunchStatusForProgress = getLunchStatus(period, currentTime);
    return (
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <Progress
          genText={() => timeDisplayText}
          period={period}
          nextPeriod={nextPeriod}
          currentTime={currentTime} // Pass currentTime state here
          lunchStatus={currentLunchStatusForProgress}
          userLunchType={userLunchType}
        />
      </Box>
    );
  }

  // Before or after school - show appropriate message
  return (
    <VStack spacing={4} textAlign="center" p={4}>
      <Text fontSize="2xl" fontWeight="medium" mb={2}>
        {noSchoolText || (status === STATUS.BEFORE_SCHOOL ? "School hasn't started yet" : "School day has ended")}
      </Text>

      <Text fontSize="4xl" fontWeight="bold">
        {dayjs(currentTime).format("h:mm A")}
      </Text>

      {nextEvent && (
        <VStack spacing={2} mt={2}>
          <Text fontSize="md">
            {nextEvent.name} in {dayjs(nextEvent.time).fromNow(true)}
          </Text>
          <Text fontSize="md">
            ({dayjs(nextEvent.time).format("h:mm A")})
          </Text>
        </VStack>
      )}
    </VStack>
  );
};

export default Clock;