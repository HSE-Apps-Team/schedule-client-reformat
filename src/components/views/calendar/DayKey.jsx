import { Text, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getDayCache } from "../../../api/api";

// Day type colors as defined in Calendar.jsx
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

const DAY_TYPE_LABELS = {
	Blue: 'Blue Day',
	Gray: 'Gray Day',
	Weekend: 'Weekend',
	Special: 'Special Day',
	OffDay: 'Off Day',
};

const DayKey = () => {
	const [dayTypes, setDayTypes] = useState([]);

	useEffect(() => {
		// Fetch a sample of day types from the cache
		// For key, just show all types defined in DAY_COLORS
		setDayTypes(Object.keys(DAY_TYPE_LABELS));
	}, []);

	return (
		<Box 
            p={4} 
            borderRadius={10} 
            bgColor="var(--background-secondary)"
        >
			<Text fontSize={"lg"} mb={2}>Day Types</Text>
			{dayTypes.length === 0 ? (
				<Text>No day types found.</Text>
			) : (
				dayTypes.map(type => (
					<Box key={type} display="flex" alignItems="center" mb={2}>
						<Box width="12px" height="12px" borderRadius="full" bgColor={DAY_COLORS[type] || DAY_COLORS.default} mr={2} border={DAY_COLORS[type] === 'transparent' ? '1px solid #888' : undefined} />
						<Text fontSize={"md"}>{DAY_TYPE_LABELS[type]}</Text>
					</Box>
				))
			)}
		</Box>
	);
};

export default DayKey;
