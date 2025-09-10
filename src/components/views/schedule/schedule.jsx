import React, { useEffect, useState } from "react";
import { getSchedule } from "../../../api/api.js";
import useMedia from "../../../hooks/useMedia.js";
import { Box, Text, VStack, HStack, useColorMode } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useSettings } from "../../../hooks/useSettings.jsx";

//The Schedule component provides a visual representation of the day's classes and special periods. 
// It's designed to be responsive and highlight the user's lunch period based on their settings. 
// The component handles both regular schedules and special schedules through the same interface.

// This is from the previous version of Hse Schedule, that nic and i (john) updated. 
// I honestly dont know how this one works entirely, but it works. 
// It will be pain to change it tho.


const Schedule = ({ overrideLunch, loading, setLoading }) => {
  const MotionBox = motion(Box);
  const mobile = useMedia(["(min-width: 750px)", "(max-width: 750px)"], [false, true]);
  const {settings } = useSettings();
  const [schedule, setSchedule] = useState([]);
  const [data, setData] = useState(null);
  const [lunchType, setLunchType] = useState(null);
  const [dayType, setDayType] = useState(null);

  const fetchSchedule = async () => {
    const response = await getSchedule();
    const data_parent = response.data;
    setData(data_parent.data);
    const data = data_parent.data;
    console.log("Schedule data:", data_parent.type);

    // Defensive checks for undefined
    if (data && data.data) {
      setSchedule(data.data.Type === "Special" ? data.ScheduleData?.data || [] : data.data);
    } else {
      setSchedule([]); // fallback to empty schedule
    }

    setDayType(data_parent.type);
    setLoading(false);
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  useEffect(() => {
    setLunchType(data?.type === "Royal" ? settings.royalDay : settings.grayDay);
  }, [settings]);

  if (loading) return null;

  const renderTimeDisplay = (start, end, addDash = true, fontSize = "sm") => (
      <Text justifyContent={"flex-end"} fontSize={fontSize}>{start} {addDash ? "-" : ""} {end}</Text>
  );

  const renderPeriodBox = (name, startTime, endTime) => (
    <MotionBox
      id={"schedule"}
      borderRadius={"10px"}
      whileHover={{ x: 10 }}
      className="component shadow"
      width={mobile ? "85%" : "80%"}
      maxWidth="500px"
      p={6}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text fontSize="2xl">{name}</Text>
      {renderTimeDisplay(startTime, endTime)}
    </MotionBox>
  );

  return (
    <Box width="100%" height="100%" overflowY="scroll" paddingBottom="25px">
      <HStack width="100%" justify="center" marginBottom={"10px"}>
        {dayType != "Weekend" ? <Text fontSize="xl">Today is {dayType === "Off" ? "an" : "a"}</Text> : <Text fontSize="xl">Enjoy your</Text>}

        <Text 
          fontSize="xl" 
          color={
            dayType === "Blue" ? "blue.500" : 
            dayType === "Gray" ? "gray.500" :
            dayType === "Special Schedule" ? "green.500" :
            dayType === "Off" ? "red.500" : 
            "gray.500"
          }>
          {dayType}
        </Text>
        <Text fontSize="xl">{dayType === "Weekend" ? "" : "Day"}</Text>

      </HStack>

      {dayType === "Off" ? (
        <Box width="100%" height="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center" paddingBottom="25px">
          <Text fontSize="3xl" marginTop="40px">Have a great day!</Text>
        </Box>
      ) : (
        <VStack align="center" gap={"10px"}>
          {schedule.map((period) => {
            if (period.periodName === "Passing Period") return null;

            return (
              <Box key={period.periodName} width="100%" display="flex" flexDirection="column" alignItems="center">
                {renderPeriodBox(period.periodName, period.startTime, period.endTime)}

                {period.lunchPeriods && (
                  <Box 
                    width={mobile ? "85%" : "80%"} 
                    maxWidth="500px"
                    display="flex"
                    flexDirection={mobile ? "column" : "row"}
                  >
                    <Box marginTop={"10px"} width={mobile ? "100%" : "auto"} display="flex" flexDirection={mobile ? "column" : "row"} gap={mobile ? 0 :"10px"} marginBottom={mobile ? "-10px" : "0px"}>
                      {Object.entries(period.lunchPeriods).map(([lunch, times]) => (
                        <MotionBox
                          id={"schedule"}
                          borderRadius={"10px"}
                          key={lunch}
                          whileHover={{ x: 3 }}
                          className={!overrideLunch && lunch === lunchType ? "current shadow" : "shadow"}
                          width={mobile ? "90%" : "auto"}
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          p={5}
                          mb={mobile ? 2 : 0}
                          marginLeft={mobile ? "10%" : 0}
                        >
                          <Text fontSize="xl" >{lunch}</Text>
                          <VStack display={"flex"} marginLeft={"10px"} alignItems="flex-end">
                            {mobile ? renderTimeDisplay(times.startTime, times.endTime, true, "xs") : renderTimeDisplay(times.startTime, times.endTime, false, "xs")}
                          </VStack>
                        </MotionBox>
                      ))}
                    </Box>
                  </Box>
                )}

                {period.pathwaysPeriods && (
                  <Box 
                    width={mobile ? "85%" : "80%"} 
                    maxWidth="500px"
                    display="flex"
                    flexDirection={mobile ? "column" : "row"}
                    marginTop={"10px"}
                    gap={mobile ? 0 :"10px"}
                  >
                    {Object.entries(period.pathwaysPeriods).map(([pathway, times]) => (
                      <MotionBox
                        id={"schedule"}
                        className={"shadow"}
                        borderRadius={"10px"}
                        key={pathway}
                        whileHover={{ x: 3 }}
                        width={mobile ? "90%" : "100%"}
                        display={"flex"}
                        justifyContent="space-between"
                        alignItems="center"
                        marginLeft={mobile ? "10%" : 0}
                        p={5}
                        mb={mobile ? 2 : 0}
                      >
                        <Text fontSize="xl">{pathway}</Text>
                        <VStack>
                          {renderTimeDisplay(times.startTime, times.endTime, true, "xs")}
                        </VStack>
                      </MotionBox>
                    ))}
                  </Box>
                )}
              </Box>
            );
          })}
        </VStack>
      )}
    </Box>
  );
};

export default Schedule;