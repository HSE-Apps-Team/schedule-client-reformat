import React, { useEffect, useState } from "react";
import { CircularProgress, CircularProgressLabel, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import useMedia from "../../../hooks/useMedia";
import { useSettings } from "../../../hooks/useSettings";

dayjs.extend(require("dayjs/plugin/customParseFormat"));
dayjs.extend(require("dayjs/plugin/duration"));

const Progress = ({ genText, period, nextPeriod, lunchStatus, currentTime }) => {
  const mobile = useMedia(["(min-width: 750px)", "(max-width: 750px)"], [false, true]);
  const [lunchText, setLunchText] = useState("");

  const {settings, updateSettings} = useSettings();

  useEffect(() => {
    const dayType = settings.dayType;
    setLunchText(dayType === "Royal" ? settings.royalDay : settings.grayDay);
  }, [settings]);

  const genPercent = () => {
    if (!period) return 0;

    let range, diffFromStart;

    if (period.lunchPeriods) {
      const userLunchPeriod = period.lunchPeriods[lunchText];

      switch (lunchStatus()) {
        case "DURING":
          range = userLunchPeriod.endTimeUnix - userLunchPeriod.startTimeUnix;
          diffFromStart = currentTime - userLunchPeriod.startTimeUnix;
          break;
        case "BEFORE":
          range = userLunchPeriod.startTimeUnix - period.startTimeUnix;
          diffFromStart = currentTime - period.startTimeUnix;
          break;
        case "AFTER":
          range = period.endTimeUnix - userLunchPeriod.endTimeUnix;
          diffFromStart = currentTime - userLunchPeriod.endTimeUnix;
          break;
        default:
          range = period.endTimeUnix - period.startTimeUnix;
          diffFromStart = currentTime - period.startTimeUnix;
      }
    } else {
      range = period.endTimeUnix - period.startTimeUnix;
      diffFromStart = currentTime - period.startTimeUnix;
    }

    return (diffFromStart / range) * 100;
  };

  const renderTimerText = () => {
    if (!period) return "Loading...";

    // if (settings.display === "Timer") {
    //   return (
    //     <Text marginBottom={0} fontSize={mobile ? "3rem" : "100px"}>
    //       {genText()}
    //     </Text>
    //   );
    // }

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
          {/* {period.lunchPeriods && lunchStatus() === "DURING"
            ? `${lunchText} Lunch`
            : period.periodName}{" "} */}
          {period.lunchPeriods
            ? {
                DURING: "Until Lunch Ends",
                BEFORE: `Until ${lunchText} Lunch`,
                AFTER: nextPeriod ? `Until ${period.periodName} Ends` : `Until School Ends`,
              }[lunchStatus()]
            : `Until ${period.periodName} Ends`}
        </Text>
      </>
    );
  };

  return (
    <div>
      <CircularProgress
        color="var(--color-primary)"
        trackColor="var(--background-secondary)"
        thickness={3.5}
        size={mobile ? window.innerWidth * 0.85 : window.innerHeight * 0.85} // This sets width, I need to fix it
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