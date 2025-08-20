import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Flip from "./flip/flip.jsx";

import { getClock } from "../../../api/api";
//import { use100vh } from "react-div-100vh";
import useMedia from "../../../hooks/useMedia";

import { Text, Box, Center } from "@chakra-ui/react";

// From Nic, it does practically nothing, its just Nic being a good React boy, and makes it organized. 
// It makes sure that we didn't throw anything anywhere like the devs before us.

// You should have seen the old version, it was atrocious...


const Countdown = ({ loading, setLoading, view, setConfetti }) => {
//  const vh = use100vh();
  const mobile = useMedia(
    ["(min-width: 750px)", "(max-width: 750px)"],
    [false, true]
  );
  
  const [endDate, setEndDate] = useState(dayjs().toISOString());
  const [name, setName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clock = await getClock();
        const { data } = clock;
        setEndDate(dayjs(data.End_Date).toISOString());
        setName(data.title);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [setLoading]);

  if (loading) {
    return null;
  };

  return (
    <Box display={"flex"} height={"100%"} flexDirection={"column"} justifyContent={"center"} paddingBottom={"200px"}>
      <Text fontSize={mobile ? "3xl" : "6xl"} paddingBottom={"10px"} textAlign={"center"}>{name}</Text>
      <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
        <Flip to={endDate} mobile={mobile} view={view} loading={loading} setLoading={setLoading} setConfetti={setConfetti}/>
        <Box display={"flex"} flexDirection={"row"} width={"70vw"} justifyContent={"space-around"} fontSize={"3vw"}>
          <Center width={"25%"} margin={"0 0.5vw"}>Days</Center>
          <Center width={"25%"} margin={"0 0.5vw"}>Hours</Center>
          <Center width={"25%"} margin={"0 0.5vw"}>Minutes</Center>
          <Center width={"25%"} margin={"0 0.5vw"}>Seconds</Center>
        </Box>
      </Box>
    </Box>
  ) 
  //  (
  //   <div
  //     style={{
  //       height: "100vh",
  //       display: "flex",
  //       flexDirection: "row",
  //       width: "100%",
  //       alignItems: "center",
  //       justifyContent: "center",
  //     }}
  //   >
  //     <CircularProgress
  //       isIndeterminate
  //       size={mobile ? window.innerWidth * 0.5 : 150}
  //       thickness={2.5}
  //     />
  //   </div>
  // );

};

export default Countdown;
