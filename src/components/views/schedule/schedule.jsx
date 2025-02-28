import React, { useEffect, useState } from "react";

import { getSchedule } from "../../../api/api.js";
import useMedia from "../../../hooks/useMedia.js";

import dayjs from "dayjs";

import {
  Box,
  CircularProgress,
  HStack,
  Stack,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const Schedule = (props) => {
  const MotionBox = motion(Box);
  const mobile = useMedia(
    ["(min-width: 750px)", "(max-width: 750px)"],
    [false, true]
  );
  const { colorMode, toggleColorMode } = useColorMode();
  const [loading, setLoading] = useState(true);
  const [schedule, setSchedule] = useState();
  const [lunchType, setLunchType] = useState(null);
  const [webMobile, setwebMobile] = useState(false);

  useEffect(() => {
    getSchedule().then((response) => {
      if (response.data.data.Type == "Special") {
        setSchedule(response.data.data.ScheduleData.data);
        setLoading(false);
      } else {
        const fetchedSchedule = response.data.data.data;
        setSchedule(fetchedSchedule);
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem("scheduleSettings"));
    const dayType = localStorage.getItem("day-type");

    if (dayType == "Royal") {
      setLunchType(settings.royalDay);
    } else if (dayType == "Gray") {
      setLunchType(settings.grayDay);
    } else {
    }
  }, [localStorage.getItem("scheduleSettings")]);

  return !loading ? (
    <>
      <Box style={{ width: "100%", height: "100%", paddingBottom: mobile ? "175px" : "15%", overflowY: "hidden" }}>
        <HStack width={"100%"} align={"center"} justify={"center"}>
          <Text fontSize={"xl"} textAlign={"center"}>
            Today is a
          </Text>
          <Text fontSize="xl" color={localStorage.getItem("day-type") == "Royal" ? "blue" : "gray"}>
            {localStorage.getItem("day-type") == "Royal" ? "Blue" : "Gray"}
          </Text>
          <Text fontSize={"xl"}>Day</Text>
        </HStack>

        <Box style={{ 
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          contain: "strict",
          width: "100%",
          height: "100%",
          overflowY: "auto",
          paddingBottom: "30px",
        }}>
          {schedule.map((period) => {
            if (period.periodName != "Passing Period") {
              return (
                <>
                  <MotionBox
                    whileHover={{ x: 10 }}
                    className="component shadow"
                    style={{
                      flexShrink: 0,
                      width: "80%",
                      maxWidth: "500px",
                      height: mobile ? "60px" : "80px",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "24px",
                    }}
                  >
                    <div>
                      <Text
                        fontSize="2xl"
                        level={mobile ? 4 : 3}
                        style={{
                          color: colorMode == "dark" ? "white" : "#333",
                          marginBottom: "0px",
                        }}
                      >
                        {period.periodName}
                      </Text>
                    </div>
                    <div>
                      <Text
                        style={{
                          color: colorMode == "dark" ? "white" : "#555",
                          fontSize: mobile ? "12px" : "14px",
                        }}
                      >
                        {period.startTime} - {period.endTime}
                      </Text>
                    </div>
                  </MotionBox>

                  {period.lunchPeriods && (
                    <div
                      id="hi"
                      style={{
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: mobile ? "flex-end" : "space-between",
                        flexDirection: mobile ? "column" : "row",
                        width: "80%",
                        maxWidth: "500px",
                      }}
                    >
                      {Object.keys(period.lunchPeriods).map((lunch) => {
                        return (
                          <MotionBox
                            whileHover={{ x: 3 }}
                            className={!props.overrideLunch && lunch == lunchType ? "current shadow" : "component shadow"}
                            style={{
                              width: mobile ? "85%" : "24%",
                              maxWidth: "500px",
                              height: mobile ? "60px" : "80px",
                              borderRadius: "10px",
                              cursor: "pointer",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "24px",
                            }}
                          >
                            <div>
                              <Text
                                fontSize="2xl"
                                level={mobile ? 4 : 3}
                                style={{
                                  color: colorMode == "dark" ? "white" : "#333",
                                  marginBottom: "0px",
                                }}
                              >
                                {lunch}
                              </Text>
                            </div>
                            <VStack spacing={1}>
                              {mobile ? (
                                <Text
                                  style={{
                                    color:
                                      colorMode == "dark" ? "white" : "#555",
                                    fontSize: mobile ? "12px" : "14px",
                                  }}
                                >
                                  {period.lunchPeriods[lunch].startTime} -{" "}
                                  {period.lunchPeriods[lunch].endTime}
                                </Text>
                              ) : (
                                <>
                                  <Text
                                    style={{
                                      color:
                                        colorMode == "dark" ? "white" : "#555",
                                      fontSize: mobile ? "10px" : "12px",
                                    }}
                                  >
                                    {period.lunchPeriods[lunch].startTime}
                                  </Text>
                                  <br />
                                  <Text
                                    style={{
                                      color:
                                        colorMode == "dark" ? "white" : "#555",
                                      fontSize: mobile ? "10px" : "12px",
                                    }}
                                  >
                                    {period.lunchPeriods[lunch].endTime}
                                  </Text>
                                </>
                              )}
                            </VStack>
                          </MotionBox>
                        );
                      })} 
                    </div>
                  )}
                  {period.pathwaysPeriods && (
                        <div
                          id="hi"
                          style={{
                            flexShrink: 0,
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: mobile ? "flex-end" : "space-between",
                            flexDirection: mobile ? "column" : "row",
                            width: "80%",
                            maxWidth: "500px",
                          }}
                        >
                          {Object.keys(period.pathwaysPeriods).map((pathwayPeriod) => {
                            return (
                              <MotionBox
                                className="component shadow"
                                whileHover={{ x: 3 }}
                                style={{
                                  flexShrink: 0,
                                  width: mobile ? "85%" : "49.5%",
                                  maxWidth: "500px",
                                  height: mobile ? "60px" : "80px",
                                  borderRadius: "10px",
                                  cursor: "pointer",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "24px",
                                }}
                              >
                                <div>
                                  <Text
                                    fontSize="2xl"
                                    level={mobile ? 4 : 3}
                                    style={{
                                      color: colorMode == "dark" ? "white" : "#333",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    {pathwayPeriod}
                                  </Text>
                                </div>
                                <VStack spacing={1}>
                                  {mobile ? (
                                    <Text
                                      style={{
                                        color:
                                          colorMode == "dark" ? "white" : "#555",
                                        fontSize: mobile ? "12px" : "14px",
                                      }}
                                    >
                                      {period.pathwaysPeriods[pathwayPeriod].startTime} -{" "}
                                      {period.pathwaysPeriods[pathwayPeriod].endTime}
                                    </Text>
                                  ) : (
                                    <>
                                      <Text
                                        style={{
                                          color:
                                            colorMode == "dark" ? "white" : "#555",
                                          fontSize: mobile ? "10px" : "12px",
                                        }}
                                      >
                                        {period.pathwaysPeriods[pathwayPeriod].startTime}
                                      </Text>
                                      <br />
                                      <Text
                                        style={{
                                          color:
                                            colorMode == "dark" ? "white" : "#555",
                                          fontSize: mobile ? "10px" : "12px",
                                        }}
                                      >
                                        {period.pathwaysPeriods[pathwayPeriod].endTime}
                                      </Text>
                                    </>
                                  )}
                                </VStack>
                              </MotionBox>
                            );
                          })}
                        </div>
                      )}
                </>
              );
            }
          })}
        </Box>
      </Box>
    </>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress
        color="accent"
        isIndeterminate
        size={mobile ? window.innerWidth * 0.5 : 150}
        thickness={2.5}
      />
    </div>
  );
};

export default Schedule;
