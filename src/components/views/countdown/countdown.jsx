import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Flip from "./flip/flip.jsx";

import { getClock } from "../../../api/api";
//import { use100vh } from "react-div-100vh";
import useMedia from "../../../hooks/useMedia";

import {
  Text,
  Box,
  CircularProgress,
} from "@chakra-ui/react";


const Countdown = (props) => {
//  const vh = use100vh();
  const mobile = useMedia(
    ["(min-width: 750px)", "(max-width: 750px)"],
    [false, true]
  );
  
  const [endDate, setEndDate] = useState(dayjs().toISOString());
  const [name, setName] = useState("Break");
  const [loading, setLoading] = useState(true);

  // useEffect(() => {

  //   getClock().then((result) => {
  //     console.log(result.data);
  //     // Update state with the fetched data
  //     setEndDate(dayjs(result.data.End_Date).format("YYYY-MM-DD"));
  //     setName(result.data.title);
  //     setLoading(false);
  //   });
  // }, []);
  
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
  }, []);

  return !loading ? (
    <Box display={"flex"} height={"100%"} flexDirection={"column"} justifyContent={"center"} paddingBottom={"200px"}>
      <Text fontSize={mobile ? "3xl" : "6xl"} paddingBottom={"10px"} textAlign={"center"}>{name}</Text>
      <Box display={"flex"} justifyContent={"center"}>
        <Flip to={endDate} className="shadow" mobile={mobile} view={props.view}/>
      </Box>
    </Box>
  ) : (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress
        isIndeterminate
        size={mobile ? window.innerWidth * 0.5 : 150}
        thickness={2.5}
      />
    </div>
  );

};

export default Countdown;
