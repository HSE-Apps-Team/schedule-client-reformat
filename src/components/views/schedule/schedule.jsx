// import React, { useEffect, useState } from "react";

// import { getSchedule } from "../../../api/api.js";
// import useMedia from "../../../hooks/useMedia.js";

// import {
//   Box,
//   CircularProgress,
//   HStack,
//   Stack,
//   Text,
//   useColorMode,
//   VStack,
// } from "@chakra-ui/react";
// import { motion } from "framer-motion";

// const Schedule = ({ overrideLunch, loading, setLoading }) => {
//   const MotionBox = motion(Box);
//   const mobile = useMedia(
//     ["(min-width: 750px)", "(max-width: 750px)"],
//     [false, true]
//   );
//   const { colorMode, toggleColorMode } = useColorMode();
//   const [schedule, setSchedule] = useState([]);
//   const [lunchType, setLunchType] = useState(null);

//   useEffect(() => {
//     getSchedule().then((response) => {
//       if (response.data.data.Type == "Special") {
//         setSchedule(response.data.data.ScheduleData.data);
//         setLoading(false);
//       } else {
//         const fetchedSchedule = response.data.data.data;
//         setSchedule(fetchedSchedule);
//         setLoading(false);
//       }
//     });
//   }, []);

//   useEffect(() => {
//     const settings = JSON.parse(localStorage.getItem("scheduleSettings"));
//     const dayType = localStorage.getItem("day-type");

//     if (dayType == "Royal") {
//       setLunchType(settings.royalDay);
//     } else if (dayType == "Gray") {
//       setLunchType(settings.grayDay);
//     } else {
//     }
//   }, [localStorage.getItem("scheduleSettings")]);

//   if (loading) {
//     return null;
//   };

//   return (
//     <>
//       <Box style={{ width: "100%", height: "100%", overflowY: "hidden" }}>
//         <HStack width={"100%"} align={"center"} justify={"center"}>
//           <Text fontSize={"xl"} textAlign={"center"}>
//             Today is a
//           </Text>
//           <Text fontSize="xl" color={localStorage.getItem("day-type") == "Royal" ? "blue" : "gray"}>
//             {localStorage.getItem("day-type") == "Royal" ? "Blue" : "Gray"}
//           </Text>
//           <Text fontSize={"xl"}>Day</Text>
//         </HStack>

//         <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
//           {schedule.map((period) => {
//             if (period.periodName != "Passing Period") {
//               return (
//                 <>
//                   <MotionBox
//                     whileHover={{ x: 10 }}
//                     // id="component"
//                     bg={"gray"}
//                     style={{
//                       flexShrink: 0,
//                       width: "80%",
//                       maxWidth: "500px",
//                       height: mobile ? "60px" : "80px",
//                       borderRadius: "10px",
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       padding: "25px",
//                       marginBottom: "10px",
//                     }}
//                   >
//                     <div>
//                       <Text
//                         fontSize="2xl"
//                         level={mobile ? 4 : 3}
//                         style={{
//                           color: colorMode == "dark" ? "white" : "#333",
//                           marginBottom: "0px",
//                         }}
//                       >
//                         {period.periodName}
//                       </Text>
//                     </div>
//                     <div>
//                       <Text
//                         style={{
//                           color: colorMode == "dark" ? "white" : "#555",
//                           fontSize: mobile ? "12px" : "14px",
//                         }}
//                       >
//                         {period.startTime} - {period.endTime}
//                       </Text>
//                     </div>
//                   </MotionBox>

//                   {period.lunchPeriods && (
//                     <div
//                       style={{
//                         flexShrink: 0,
//                         display: "flex",
//                         alignItems: "flex-end",
//                         justifyContent: mobile ? "flex-end" : "space-between",
//                         flexDirection: mobile ? "column" : "row",
//                         width: "80%",
//                         maxWidth: "500px",
//                         marginBottom: "10px",
//                       }}
//                     >
//                       {Object.keys(period.lunchPeriods).map((lunch) => {
//                         return (
//                           <MotionBox
//                             whileHover={{ x: 3 }}
//                             id="component"
//                             className={!overrideLunch && lunch == lunchType ? "current shadow" : "component shadow"}
//                             style={{
//                               width: mobile ? "85%" : "24%",
//                               maxWidth: "500px",
//                               height: mobile ? "60px" : "80px",
//                               borderRadius: "10px",
//                               cursor: "pointer",
//                               display: "flex",
//                               justifyContent: "space-between",
//                               alignItems: "center",
//                               padding: "24px",
//                             }}
//                           >
//                             <div>
//                               <Text
//                                 fontSize="2xl"
//                                 level={mobile ? 4 : 3}
//                                 style={{
//                                   color: colorMode == "dark" ? "white" : "#333",
//                                   marginBottom: "0px",
//                                 }}
//                               >
//                                 {lunch}
//                               </Text>
//                             </div>
//                             <VStack spacing={1}>
//                               {mobile ? (
//                                 <Text
//                                   style={{
//                                     color:
//                                       colorMode == "dark" ? "white" : "#555",
//                                     fontSize: mobile ? "12px" : "14px",
//                                   }}
//                                 >
//                                   {period.lunchPeriods[lunch].startTime} -{" "}
//                                   {period.lunchPeriods[lunch].endTime}
//                                 </Text>
//                               ) : (
//                                 <>
//                                   <Text
//                                     style={{
//                                       color:
//                                         colorMode == "dark" ? "white" : "#555",
//                                       fontSize: mobile ? "10px" : "12px",
//                                     }}
//                                   >
//                                     {period.lunchPeriods[lunch].startTime}
//                                   </Text>
//                                   <br />
//                                   <Text
//                                     style={{
//                                       color:
//                                         colorMode == "dark" ? "white" : "#555",
//                                       fontSize: mobile ? "10px" : "12px",
//                                     }}
//                                   >
//                                     {period.lunchPeriods[lunch].endTime}
//                                   </Text>
//                                 </>
//                               )}
//                             </VStack>
//                           </MotionBox>
//                         );
//                       })} 
//                     </div>
//                   )}
//                   {period.pathwaysPeriods && (
//                         <div
//                           id="hi"
//                           style={{
//                             flexShrink: 0,
//                             display: "flex",
//                             alignItems: "flex-end",
//                             justifyContent: mobile ? "flex-end" : "space-between",
//                             flexDirection: mobile ? "column" : "row",
//                             width: "80%",
//                             maxWidth: "500px",
//                             marginBottom: "10px",
//                           }}
//                         >
//                           {Object.keys(period.pathwaysPeriods).map((pathwayPeriod) => {
//                             return (
//                               <MotionBox
//                                 className="component shadow"
//                                 whileHover={{ x: 3 }}
//                                 style={{
//                                   flexShrink: 0,
//                                   width: mobile ? "85%" : "49.5%",
//                                   maxWidth: "500px",
//                                   height: mobile ? "60px" : "80px",
//                                   borderRadius: "10px",
//                                   cursor: "pointer",
//                                   display: "flex",
//                                   justifyContent: "space-between",
//                                   alignItems: "center",
//                                   padding: "24px",
//                                 }}
//                               >
//                                 <div>
//                                   <Text
//                                     fontSize="2xl"
//                                     level={mobile ? 4 : 3}
//                                     style={{
//                                       color: colorMode == "dark" ? "white" : "#333",
//                                       marginBottom: "0px",
//                                     }}
//                                   >
//                                     {pathwayPeriod}
//                                   </Text>
//                                 </div>
//                                 <VStack spacing={1}>
//                                   {mobile ? (
//                                     <Text
//                                       style={{
//                                         color:
//                                           colorMode == "dark" ? "white" : "#555",
//                                         fontSize: mobile ? "12px" : "14px",
//                                       }}
//                                     >
//                                       {period.pathwaysPeriods[pathwayPeriod].startTime} -{" "}
//                                       {period.pathwaysPeriods[pathwayPeriod].endTime}
//                                     </Text>
//                                   ) : (
//                                     <>
//                                       <Text
//                                         style={{
//                                           color:
//                                             colorMode == "dark" ? "white" : "#555",
//                                           fontSize: mobile ? "10px" : "12px",
//                                         }}
//                                       >
//                                         {period.pathwaysPeriods[pathwayPeriod].startTime}
//                                       </Text>
//                                       <br />
//                                       <Text
//                                         style={{
//                                           color:
//                                             colorMode == "dark" ? "white" : "#555",
//                                           fontSize: mobile ? "10px" : "12px",
//                                         }}
//                                       >
//                                         {period.pathwaysPeriods[pathwayPeriod].endTime}
//                                       </Text>
//                                     </>
//                                   )}
//                                 </VStack>
//                               </MotionBox>
//                             );
//                           })}
//                         </div>
//                       )}
//                 </>
//               );
//             }
//           })}
//         </Box>
//       </Box>
//     </>
//   )
// };

// export default Schedule;

import React, { useEffect, useState } from "react";
import { getSchedule } from "../../../api/api.js";
import useMedia from "../../../hooks/useMedia.js";
import { Box, Text, VStack, HStack, useColorMode } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Schedule = ({ overrideLunch, loading, setLoading }) => {
  const MotionBox = motion(Box);
  const mobile = useMedia(["(min-width: 750px)", "(max-width: 750px)"], [false, true]);
  const { colorMode } = useColorMode();
  const [schedule, setSchedule] = useState([]);
  const [lunchType, setLunchType] = useState(null);

  const fetchSchedule = async () => {
    const response = await getSchedule();
    const data = response.data.data;
    setSchedule(data.Type === "Special" ? data.ScheduleData.data : data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem("scheduleSettings"));
    const dayType = localStorage.getItem("day-type");
    setLunchType(dayType === "Royal" ? settings.royalDay : settings.grayDay);
  }, [localStorage.getItem("scheduleSettings")]);

  if (loading) return null;

  const renderTimeDisplay = (start, end) => (
      <Text fontSize="md">{start} {mobile ? "-" : "-"} {end}</Text>
  );

  const renderPeriodBox = (name, startTime, endTime) => (
    <MotionBox
      id={"component"}
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
    <Box width="100%" height="100%" overflowY="scroll" paddingBottom="20px">
      <HStack width="100%" justify="center">
        <Text fontSize="xl">Today is a</Text>
        <Text fontSize="xl" color={localStorage.getItem("day-type") === "Royal" ? "blue" : "gray"}>
          {localStorage.getItem("day-type") === "Royal" ? "Blue" : "Gray"}
        </Text>
        <Text fontSize="xl">Day</Text>
      </HStack>

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
                        id={"component"}
                        borderRadius={"10px"}
                        key={lunch}
                        whileHover={{ x: 3 }}
                        className={!overrideLunch && lunch === lunchType ? "current shadow" : "shadow"}
                        width={mobile ? "100%" : "auto"}

                        display="flex"
                        justifyContent="space-between"
                        p={3}
                        mb={mobile ? 2 : 0}
                        marginLeft={mobile ? 5 : 0}
                      >
                        <Text fontSize="xl">{lunch}</Text>
                        <VStack>
                          {renderTimeDisplay(times.startTime, times.endTime)}
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
                      id={"component"}
                      borderRadius={"10px"}
                      key={pathway}
                      whileHover={{ x: 3 }}
                      className="shadow"
                      width={"100%"}
                      display={"flex"}
                      justifyContent="space-between"
                      marginLeft={mobile ? 5 : 0}
                      p={2}
                      mb={mobile ? 2 : 0}
                    >
                      <Text fontSize="xl">{pathway}</Text>
                      <VStack>
                        {renderTimeDisplay(times.startTime, times.endTime)}
                      </VStack>
                    </MotionBox>
                  ))}
                </Box>
              )}
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
};

export default Schedule;