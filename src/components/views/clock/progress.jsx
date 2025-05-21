import React, { useEffect, useState, useCallback } from "react"; // Added useCallback
import { CircularProgress, CircularProgressLabel, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import useMedia from "../../../hooks/useMedia";
// useSettings is not strictly needed in Progress anymore if lunchType is passed from Clock

dayjs.extend(require("dayjs/plugin/customParseFormat"));
dayjs.extend(require("dayjs/plugin/duration"));

// Pass userLunchType as a prop
const Progress = ({ genText, period, nextPeriod, lunchStatus, currentTime, userLunchType }) => {
  const mobile = useMedia(["(min-width: 750px)", "(max-width: 750px)"], [false, true]);

  // No longer need local state for lunchText, use userLunchType prop directly
  // const [lunchText, setLunchText] = useState("");
  // const {settings, updateSettings} = useSettings(); // No longer needed here

  // useEffect(() => {
  //   const dayType = settings.dayType;
  //   setLunchText(dayType === "Royal" ? settings.royalDay : settings.grayDay);
  // }, [settings]);


  const genPercent = useCallback(() => { // Wrap in useCallback for performance
    if (!period) return 0;

    let range, diffFromStart;
    let targetPeriod = period; // Default to the current period

    // If there are lunch periods and a specific userLunchType is provided
    if (period.lunchPeriods && userLunchType && period.lunchPeriods[userLunchType]) {
      const userLunchPeriod = period.lunchPeriods[userLunchType];

      switch (lunchStatus) { // Use lunchStatus directly as a string
        case "DURING":
          // Progress within the user's specific lunch period
          range = userLunchPeriod.endTimeUnix - userLunchPeriod.startTimeUnix;
          diffFromStart = currentTime - userLunchPeriod.startTimeUnix;
          targetPeriod = userLunchPeriod; // Set target to lunch period for percentage calculation
          break;
        case "BEFORE":
          // Progress from the start of the current period until the start of lunch
          range = userLunchPeriod.startTimeUnix - period.startTimeUnix;
          diffFromStart = currentTime - period.startTimeUnix;
          break;
        case "AFTER":
          // Progress from the end of lunch until the end of the current period
          range = period.endTimeUnix - userLunchPeriod.endTimeUnix;
          diffFromStart = currentTime - userLunchPeriod.endTimeUnix;
          // Ensure diffFromStart doesn't go negative if currentTime is exactly at lunch end
          if (diffFromStart < 0) diffFromStart = 0;
          break;
        default:
          // No specific lunch status, treat as a regular period
          range = period.endTimeUnix - period.startTimeUnix;
          diffFromStart = currentTime - period.startTimeUnix;
      }
    } else {
      // No lunch periods or userLunchType, calculate for the entire period
      range = period.endTimeUnix - period.startTimeUnix;
      diffFromStart = currentTime - period.startTimeUnix;
    }

    // Handle division by zero for very short periods or if range is 0 for some reason
    if (range <= 0) return 100; // Or 0, depending on desired behavior for zero-length periods

    const percentage = (diffFromStart / range) * 100;
    return Math.min(100, Math.max(0, percentage)); // Clamp between 0 and 100
  }, [period, currentTime, lunchStatus, userLunchType]); // Add dependencies

  const renderTimerText = () => {
    if (!period) return "Loading...";

    return (
      <>
        <Text marginBottom={0} fontSize={mobile ? "3rem" : "80px"}>
          {genText()}
        </Text>
        <Text
          fontSize={mobile ? "1.3rem" : "1.5rem"}
          marginTop="0"
          wordSpacing="3px"
        >
          {period.lunchPeriods && userLunchType // Use userLunchType for display
            ? {
              DURING: `Until ${userLunchType} Lunch Ends`,
              BEFORE: `Until ${userLunchType} Lunch`,
              AFTER: nextPeriod ? `Until ${period.periodName} Ends` : `Until School Ends`,
            }[lunchStatus] // Use lunchStatus directly
            : `Until ${period.periodName} Ends`}
        </Text>
      </>
    );
  };
  return (
    <div>
      <CircularProgress
        trackColor="var(--background-secondary)"
        color="var(--color-primary)"
        thickness={3.5}
        size={mobile ? window.innerWidth * 0.85 : 580}
        value={genPercent()}
        capIsRound={true}
      >
        <CircularProgressLabel fontSize={50}>
          {renderTimerText()}
        </CircularProgressLabel>
      </CircularProgress>
    </div>
  );
};

export default Progress;