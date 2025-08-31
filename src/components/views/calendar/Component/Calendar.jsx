
import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import CalendarDay from "./Day";
import { getDayCache, getEvents2, getEventTypes } from "../../../../api/api";

// Dynamic Calendar Component, allows for custom styling of all attributes

const DAY_COLORS = {
    Blue: '#4a90e2',
    Gray: '#9e9e9e',
    Weekend: 'transparent',
    weekend: 'transparent',
    Special: '#66bb6a',
    special: '#66bb6a',
    OffDay: '#ef5350',
    offDay: '#ef5350',
    default: 'transparent',
};

function getDayTypeColor(dayType) {
    if (!dayType) return DAY_COLORS.default;
    return DAY_COLORS[dayType] || DAY_COLORS[dayType.toLowerCase()] || DAY_COLORS.default;
}


const Calendar = ({ month, year, daySelected, setDaySelected }) => {
    const [dayCache, setDayCache] = useState([]);
    const [eventsByDate, setEventsByDate] = useState({});
    const [eventTypes, setEventTypes] = useState([]);

    useEffect(() => {
        // Get the full range for the calendar grid (including prev/next month days)
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        const totalCells = 42;
        const gridStart = new Date(year, month, 1 - firstDay);
        const gridEnd = new Date(year, month, daysInMonth + (totalCells - (firstDay + daysInMonth)));
        const startStr = gridStart.toISOString().slice(0, 10);
        const endStr = gridEnd.toISOString().slice(0, 10);
        getDayCache(startStr, endStr)
            .then(res => setDayCache(res.data))
            .catch(() => setDayCache([]));

        // Fetch events for the visible range
        getEvents2(startStr, endStr)
            .then(res => {
                // Group events by startDate (ISO date string, YYYY-MM-DD)
                const grouped = {};
                res.data.forEach(event => {
                    // Use only the date part (not time) for grouping
                    const isoDate = event.startDate ? event.startDate.slice(0, 10) : undefined;
                    if (!isoDate) return;
                    if (!grouped[isoDate]) grouped[isoDate] = [];
                    grouped[isoDate].push(event);
                });
                console.log('Fetched events:', res.data);
                console.log('Grouped eventsByDate:', grouped);
                setEventsByDate(grouped);
            })
            .catch(() => setEventsByDate({}));

        // Fetch event types for color mapping
        getEventTypes()
            .then(res => setEventTypes(res.data))
            .catch(() => setEventTypes([]));
    }, [month, year]);

    // Map dayCache to lookup by date string
    const dayTypeMap = {};
    dayCache.forEach(item => {
        const d = new Date(item.year, item.month - 1, item.day);
        const key = d.toISOString().slice(0, 10);
        dayTypeMap[key] = item.dayType;
    });

    // Utility to get color for event type
    function getTypeColor(typeName) {
        const type = eventTypes.find(t => t.name === typeName);
        return type?.color || '#888';
    }

    // For each day, get the list of event colors
    function getEventColorsForDate(dateStr) {
        const events = eventsByDate[dateStr] || [];
        const colors = events.map(event => getTypeColor(event.eventType));
        if (colors.length > 0) {
            console.log(`Event colors for ${dateStr}:`, colors);
        }
        return colors;
    }

    return (
        <Box>
            <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gridGap={1} fontSize={"2xl"}>
                {/* Week day headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <Box key={day} p={2} textAlign="center">
                        <Text fontWeight="bold">{day}</Text>
                    </Box>
                ))}

                {/* Calendar days */}
                {(() => {
                    const daysInMonth = new Date(year, month + 1, 0).getDate();
                    const firstDay = new Date(year, month, 1).getDay();
                    const daysInPrevMonth = new Date(year, month, 0).getDate();
                    const days = [];
                    const totalCells = 42;

                    // Add days from previous month
                    for (let i = firstDay - 1; i >= 0; i--) {
                        const dayNumber = daysInPrevMonth - i;
                        const prevMonth = month === 0 ? 11 : month - 1;
                        const prevYear = month === 0 ? year - 1 : year;
                        const currentDate = new Date(prevYear, prevMonth, dayNumber);
                        const isSelected = daySelected && daySelected.getDate() === dayNumber &&
                            daySelected.getMonth() === prevMonth &&
                            daySelected.getFullYear() === prevYear;
                        const key = currentDate.toISOString().slice(0, 10);
                        const dayType = dayTypeMap[key];
                        const color = getDayTypeColor(dayType);
                        const eventColors = getEventColorsForDate(key);
                        days.push({
                            element: (
                                <CalendarDay
                                    key={`prev-${dayNumber}`}
                                    date={currentDate}
                                    isSelected={isSelected}
                                    onClick={() => setDaySelected(currentDate)}
                                    style={{ opacity: 0.5 }}
                                    dayColor={color}
                                    eventColors={eventColors}
                                >
                                    {dayNumber}
                                </CalendarDay>
                            ),
                            month: prevMonth
                        });
                    }

                    // Add days for current month
                    for (let i = 1; i <= daysInMonth; i++) {
                        const isSelected = daySelected && daySelected.getDate() === i &&
                            daySelected.getMonth() === month &&
                            daySelected.getFullYear() === year;
                        const currentDate = new Date(year, month, i);
                        const key = currentDate.toISOString().slice(0, 10);
                        const dayType = dayTypeMap[key];
                        const color = getDayTypeColor(dayType);
                        const eventColors = getEventColorsForDate(key);
                        days.push({
                            element: (
                                <CalendarDay
                                    key={i}
                                    date={currentDate}
                                    isSelected={isSelected}
                                    onClick={() => setDaySelected(currentDate)}
                                    dayColor={color}
                                    eventColors={eventColors}
                                >
                                    {i}
                                </CalendarDay>
                            ),
                            month: month
                        });
                    }

                    // Add days from next month to fill the remaining slots
                    const remainingCells = totalCells - days.length;
                    for (let i = 1; i <= remainingCells; i++) {
                        const nextMonth = month === 11 ? 0 : month + 1;
                        const nextYear = month === 11 ? year + 1 : year;
                        const currentDate = new Date(nextYear, nextMonth, i);
                        const isSelected = daySelected && daySelected.getDate() === i &&
                            daySelected.getMonth() === nextMonth &&
                            daySelected.getFullYear() === nextYear;
                        const key = currentDate.toISOString().slice(0, 10);
                        const dayType = dayTypeMap[key];
                        const color = getDayTypeColor(dayType);
                        const eventColors = getEventColorsForDate(key);
                        days.push({
                            element: (
                                <CalendarDay
                                    key={`next-${i}`}
                                    date={currentDate}
                                    isSelected={isSelected}
                                    onClick={() => setDaySelected(currentDate)}
                                    style={{ opacity: 0.5}}
                                    dayColor={color}
                                    eventColors={eventColors}
                                >
                                    {i}
                                </CalendarDay>
                            ),
                            month: nextMonth
                        });
                    }

                    // Group days into weeks and filter out weeks with no days in the current month
                    const weeks = [];
                    for (let i = 0; i < days.length; i += 7) {
                        const week = days.slice(i, i + 7);
                        // Only include week if at least one day is in the current month
                        if (week.some(day => day.month === month)) {
                            weeks.push(week);
                        }
                    }
                    // Flatten weeks to elements
                    return weeks.flat().map(day => day.element);
                })()}
            </Box>
        </Box>
    );
};

export default Calendar;
