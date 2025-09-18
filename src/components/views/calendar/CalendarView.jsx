import {Text, Box} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import CalendarNavbar from "./Navbar";
import Calendar from "./Component/Calendar";
import CalendarSidebar from "./Sidebar";
import EventKey from "./EventKey";
import { useDeviceType } from "../../../hooks/useDeviceType";

import CalendarSelector from "./Images"
import DayKey from "./DayKey";
const CalendarView = ({ loading, setLoading }) => {
    const { view, setView } = useState(0);
    const { deviceType } = useDeviceType();
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
    

    if (false)  {
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
    if (deviceType == 2 || view == 1) {
        return (
            <Box 
                display={"flex"}
                flexDirection={"column"}
                height=""
                gap={2}
                boxSizing={"border-box"}
                minHeight={"min-content"}
                paddingTop={52}
                paddingBottom={20}
            >
                <Box minWidth="300px">
                    <CalendarNavbar month={month} setMonth={setMonth} setView={setView} />
                </Box>
                <Box 
                    overflowY={"auto"} 
                    width={"100%"}
                    boxSizing={"border-box"}
                >
                    <Calendar month={month} year={year} daySelected={daySelected} setDaySelected={setDaySelected} />
                    <Box
                        display={"flex"}
                        justifyContent={"space-around"}
                        flexDirection={"row"}
                        marginTop={2}
                        paddingX={2}
                    >
                        <CalendarSidebar daySelected={daySelected} month={month} year={year} />
                        <DayKey />
                    </Box>
                </Box>
            </Box>
        );
    }

    return (
        <Box display={"flex"} flexDirection={"row"} width={"100%"} height={"100%"} alignItems={"flex-start"} justifyContent={"center"}>
            <Box display={"flex"} flexDirection={"column"} width={"75%"} alignItems={"center"} marginTop={5} >
                <Box width={"53%"} minWidth={"fit-content"} alignItems={"center"} display={"flex"} flexDirection={"column"}>
                    <CalendarNavbar month={month} setMonth={setMonth} setView={setView} />
                    <Text color={"var(--text-secondary)"} fontSize={"xs"}>
                        Calendar is currently in a testing beta. Report bugs and errors <u><a href="https://forms.office.com/Pages/ResponsePage.aspx?id=PkZ4tvvZX0eBU43PqJYEfW78XFXJ5Q5Fsb3Z-zQt2UBUOFFFNjdPS1dWWTJVVVZTVDhXRVQ5TVhXVS4u">here.</a></u>
                    </Text>
                </Box>
                <Box display={"flex"} flexDirection={"row"} gap={10} width={"100%"} justifyContent={"center"}>
                    <Box flex={"2"} display={"flex"} flexDirection={"column"} alignContent={"flex-end"}>
                        <DayKey />

                    </Box>
                    <Box flex={"5"} height={"70vh"} minW={deviceType > 0 ? "550px" : "675px"} overflowY={"scroll"} paddingBottom={"60px"}>
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
        </Box>
    );

}

export default CalendarView;