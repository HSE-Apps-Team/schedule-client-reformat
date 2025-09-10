import {Text, Box} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import CalendarNavbar from "./Navbar";
import Calendar from "./Component/Calendar";
import CalendarSidebar from "./Sidebar";
import EventKey from "./EventKey";

import CalendarSelector from "./Images"
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

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            let mobile = false;
            if (window.innerWidth < 1000) {
                mobile = true;
            }
            else if (window.innerHeight < 625) {
                mobile = true;
            }
            setIsMobile(mobile);
        };
        
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    if (isMobile)  {
        return (
            <Box display={"flex"} flexDirection={"column"} width={"100%"} alignItems={"center"} p={4} gap={4} >
                <CalendarSelector loading={loading} setLoading={setLoading} />
                <Text fontSize={"sm"} textAlign={"center"} width={"70%"} color={"var(--text-secondary)"}>
                    Interactive Calendar does not currently work on Portrait view. If you would like this changed,{" "}
                    <Text as="a" color="blue.500" href="https://forms.office.com/Pages/ResponsePage.aspx?id=PkZ4tvvZX0eBU43PqJYEfW78XFXJ5Q5Fsb3Z-zQt2UBUOFFFNjdPS1dWWTJVVVZTVDhXRVQ5TVhXVS4u" textDecoration="underline">
                        tell us here
                    </Text>
                </Text>
            </Box>
        );
    }
    return (
        <Box display={"flex"} flexDirection={"column"} width={"75%"} alignItems={"center"} marginTop={"50"} >
            <Box width={"53%"} alignItems={"center"} display={"flex"} flexDirection={"column"}>
                <CalendarNavbar month={month} setMonth={setMonth} />
                <Text color={"var(--text-secondary)"} fontSize={"sm"}>
                    Calendar is currently in a testing beta. Report bugs and errors <u><a href="https://forms.office.com/Pages/ResponsePage.aspx?id=PkZ4tvvZX0eBU43PqJYEfW78XFXJ5Q5Fsb3Z-zQt2UBUOFFFNjdPS1dWWTJVVVZTVDhXRVQ5TVhXVS4u">here.</a></u>
                </Text>
            </Box>
            <Box display={"flex"} flexDirection={"row"} gap={10} width={"100%"} justifyContent={"center"} pb={10}>
                <Box flex={"2"} display={"flex"} flexDirection={"column"} alignContent={"flex-end"}>
                    <DayKey />

                </Box>
                <Box flex={"5"} width={"100%"} >
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