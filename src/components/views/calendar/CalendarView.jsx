import {Text, Box} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import CalendarNavbar from "./Navbar";
import Calendar from "./Component/Calendar";
import CalendarSidebar from "./Sidebar";
import EventKey from "./EventKey";
import DayKey from "./DayKey";
const CalendarView = ({ loading, setLoading }) => {
    const [month, setMonth] = useState("");
    const [daySelected, setDaySelected] = useState("");
    const [year, setYear] = useState("");

    useEffect(() => {
        const currentDate = new Date();
        setMonth(currentDate.getMonth());
        setYear(currentDate.getFullYear());
        setDaySelected(currentDate);

        setLoading(false);
    }, []);


    return (
        <Box display={"flex"} flexDirection={"column"} width={"75%"} alignItems={"center"}>
            <Box width={"53%"}>
                <CalendarNavbar month={month} setMonth={setMonth} />
            </Box>
            <Box display={"flex"} flexDirection={"row"} gap={10} width={"100%"} justifyContent={"center"} pb={10}>
                <Box flex={"2"} display={"flex"} flexDirection={"column"} alignContent={"flex-end"}>
                    <DayKey />
                </Box>
                <Box flex={"5"}>
                    <Calendar month={month} year={year} daySelected={daySelected} setDaySelected={setDaySelected} />

                </Box>
                <Box 
                    flex={"2"} 
                    // display={"flex"} 
                    // flexDirection={"column"} 
                    // justifyContent={"space-between"}
                >
                    <CalendarSidebar daySelected={daySelected} month={month} year={year} />
                    {/* <EventKey /> */}
                </Box>
            </Box>
        </Box>
    )

}

export default CalendarView;