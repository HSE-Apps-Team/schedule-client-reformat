import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import useMedia from "../../../hooks/useMedia";
import Progress from "./progress.jsx";
import { getSchedule } from "../../../api/api.js";
import { CircularProgress, Text } from "@chakra-ui/react";
import { useSettings } from "../../../hooks/useSettings";


dayjs.extend(require("dayjs/plugin/customParseFormat"));
dayjs.extend(require("dayjs/plugin/duration"));

const Clock = () => {
  const mobile = useMedia(
    ["(min-width: 750px)", "(max-width: 750px)"],
    [false, true]
  );

  const [schedule, setSchedule] = useState(null);
  const [period, setPeriod] = useState(null);
  const [nextPeriod, setNextPeriod] = useState(null);
  const [currentTime, setCurrentTime] = useState(dayjs().valueOf());
  const [status, setStatus] = useState("LOADING");
  const [noSchoolText, setNoSchoolText] = useState(null);
  const [lunchPeriod, setLunchPeriod] = useState();

  const getPeriod = () => {
    const currentTime = dayjs().valueOf();
    
    if (schedule.length === 0) {
      setStatus("NO_SCHOOL");
      return;
    }

    const beforeSchool = currentTime < schedule[0].startTimeUnix;
    const afterSchool = currentTime > schedule[schedule.length - 1].endTimeUnix;

    if (beforeSchool) {
      setStatus("BEFORE_SCHOOL");
    } else if (afterSchool) {
      setStatus("AFTER_SCHOOL");
    } else {
      schedule.forEach((period, index) => {
        if (currentTime >= period.startTimeUnix && currentTime < period.endTimeUnix) {
          setStatus("SCHOOL_NOW");
          setPeriod(period);
          setNextPeriod(schedule[index + 1] || null);
        }
      });
    }
  };

  const fetchSchedule = async () => {
    getSchedule().then((response) => {
      const returnResponse = response.data;
      let fetchedSchedule;

      if (returnResponse.data.Type === "Special") {
        const scheduleData = returnResponse.data.ScheduleData;
        const eventData = returnResponse.data.EventData;
        fetchedSchedule = scheduleData.data;
        setNoSchoolText(eventData.NoSchoolText);
      } else {
        fetchedSchedule = returnResponse.data.data;
      }

      const scheduleWithUnix = fetchedSchedule.map(period => ({
        ...period,
        startTimeUnix: dayjs(period.startTime, "h:mm A").valueOf(),
        endTimeUnix: dayjs(period.endTime, "h:mm A").valueOf(),
      }));

      setSchedule(scheduleWithUnix);
    });
  };

  useEffect(() => {
    if (!schedule) {
      fetchSchedule();
    } else {
      const timerId = setInterval(() => {
        setCurrentTime(dayjs().valueOf());
        getPeriod();
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [schedule]);


  const genText = () => {
    if (!period) return "";
    const diffFromEnd = period.endTimeUnix - currentTime;
    const duration = dayjs.duration(diffFromEnd, "ms");
    
    return `${duration.hours() > 0 ? `${duration.hours()}:` : ""}${
      duration.minutes().toString().padStart(2, '0')
    }:${duration.seconds().toString().padStart(2, '0')}`;
  };

  if (status === "LOADING") {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress isIndeterminate size={mobile ? "100px" : "150px"} />
      </div>
    );
  }

  return status === "SCHOOL_NOW" ? (
    <div style={{ padding: "20px" }}>
      <Progress
        genText={genText}
        period={period}
        nextPeriod={nextPeriod}
        currentTime={currentTime}
      />
    </div>
  ) : (
    <div style={{ textAlign: "center", color: "white", padding: "20px" }}>
      <Text fontSize="2xl" mb={4}>
        {noSchoolText || "No School Currently"}
      </Text>
      <Text fontSize="4xl">
        {dayjs(currentTime).format("h:mm A")}
      </Text>
    </div>
  );
};

export default Clock;