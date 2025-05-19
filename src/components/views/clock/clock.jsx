import React, { useState, useEffect, useCallback, useMemo } from "react";
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
  const [currentTime, setCurrentTime] = useState(dayjs().valueOf());
  const [status, setStatus] = useState(STATUS.LOADING);
  const [noSchoolText, setNoSchoolText] = useState(null);
  const [lunchStatus, setLunchStatus] = useState(LUNCH_STATUS.NONE);
  const [error, setError] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [nextEvent, setNextEvent] = useState(null);
  
  // Get user settings
  const { settings } = useSettings();

  // Calculate the lunch status based on current time and period
  const getLunchStatus = useCallback(() => {
    if (!period || !period.lunchPeriods) return LUNCH_STATUS.NONE;
    
    // Determine lunch type based on day type
    const lunchType = settings.dayType === "Royal" ? settings.royalLunch : settings.grayLunch;
    const userLunchPeriod = period.lunchPeriods[lunchType];
    
    if (!userLunchPeriod) return LUNCH_STATUS.NONE;
    
    if (currentTime < userLunchPeriod.startTimeUnix) {
      return LUNCH_STATUS.BEFORE;
    } else if (currentTime >= userLunchPeriod.startTimeUnix && currentTime < userLunchPeriod.endTimeUnix) {
      return LUNCH_STATUS.DURING;
    } else {
      return LUNCH_STATUS.AFTER;
    }
  }, [period, currentTime, settings]);

  // Process schedule data to add unix timestamps
  const processScheduleData = useCallback((scheduleData) => {
    if (!scheduleData || !Array.isArray(scheduleData)) return [];
    
    return scheduleData.map(period => {
      // Create base period with Unix timestamps
      const processedPeriod = {
        ...period,
        startTimeUnix: dayjs(period.startTime, "h:mm A").valueOf(),
        endTimeUnix: dayjs(period.endTime, "h:mm A").valueOf(),
      };
      
      // Process lunch periods if they exist
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

  // Fetch schedule data
  const fetchSchedule = useCallback(async () => {
    try {
      const response = await getSchedule();
      const responseData = response.data;
      let fetchedSchedule;

      if (responseData.data.Type === "Special") {
        const scheduleData = responseData.data.ScheduleData;
        const eventData = responseData.data.EventData;
        fetchedSchedule = scheduleData.data;
        setNoSchoolText(eventData.NoSchoolText || null);
      } else {
        fetchedSchedule = responseData.data.data;
      }

      const processedSchedule = processScheduleData(fetchedSchedule);
      setSchedule(processedSchedule);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch schedule:", err);
      setError("Failed to load schedule. Please try again later.");
      setSchedule([]);
    }
  }, [processScheduleData]);
  // Find current period based on time
  const updateCurrentPeriod = useCallback(() => {
    const now = dayjs().valueOf();
    setCurrentTime(now);
    
    if (!schedule || schedule.length === 0) {
      setStatus(STATUS.NO_SCHOOL);
      return;
    }

    const beforeSchool = now < schedule[0].startTimeUnix;
    const afterSchool = now > schedule[schedule.length - 1].endTimeUnix;

    if (beforeSchool) {
      setStatus(STATUS.BEFORE_SCHOOL);
      setNextEvent({
        type: "school-start",
        time: schedule[0].startTimeUnix,
        name: "School Starts"
      });
    } else if (afterSchool) {
      setStatus(STATUS.AFTER_SCHOOL);
      setNextEvent(null);
    } else {
      let currentPeriodFound = false;
      
      for (let i = 0; i < schedule.length; i++) {
        const currentPeriod = schedule[i];
        if (now >= currentPeriod.startTimeUnix && now < currentPeriod.endTimeUnix) {
          setStatus(STATUS.SCHOOL_NOW);
          setPeriod(currentPeriod);
          setNextPeriod(schedule[i + 1] || null);
          
          // Calculate remaining time in period
          const remaining = currentPeriod.endTimeUnix - now;
          setRemainingTime(remaining);
          
          currentPeriodFound = true;
          break;
        }
      }
      
      // Handle gaps between periods
      if (!currentPeriodFound) {
        // Find the next period
        for (let i = 0; i < schedule.length; i++) {
          if (now < schedule[i].startTimeUnix) {
            setStatus(STATUS.BEFORE_SCHOOL);
            setNextEvent({
              type: "period-start",
              time: schedule[i].startTimeUnix,
              name: schedule[i].periodName
            });
            break;
          }
        }
      }
    }
    
    setLoading(false);
  }, [schedule, setLoading]);

  // Format time remaining in current period
  const formatTimeRemaining = useCallback((ms) => {
    if (!ms) return "";
    const duration = dayjs.duration(ms);
    
    return `${duration.hours() > 0 ? `${duration.hours()}:` : ""}${
      duration.minutes().toString().padStart(2, '0')
    }:${duration.seconds().toString().padStart(2, '0')}`;
  }, []);

  // Time text to display in the progress component
  const timeDisplayText = useMemo(() => {
    return formatTimeRemaining(remainingTime);
  }, [remainingTime, formatTimeRemaining]);

  // Initialize schedule data and set up timer
  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  // Set up time interval update
  useEffect(() => {
    if (!schedule) return;
    
    const updateTimer = () => {
      updateCurrentPeriod();
    };
    
    // Initial update
    updateTimer();
    
    // Set interval for updates
    const timerId = setInterval(updateTimer, 500);
    
    return () => clearInterval(timerId);
  }, [schedule, updateCurrentPeriod]);

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
    // Calculate lunch status once before rendering
    const currentLunchStatus = getLunchStatus();
    
    return (
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <Progress
          genText={() => timeDisplayText}
          period={period}
          nextPeriod={nextPeriod}
          currentTime={currentTime}
          lunchStatus={currentLunchStatus}
        />
        
        {/* Optional: Add extra information below the progress circle */}
        {/* {nextPeriod && (
          <Text fontSize="lg" mt={4} opacity={0.8}>
            Next: {nextPeriod.periodName} at {nextPeriod.startTime}
          </Text>
        )} */}
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