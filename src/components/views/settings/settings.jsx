import React from "react";
import { useEffect } from "react";
import { useSettings } from "../../../hooks/useSettings";

// uses useSettings to manage settings
// If you want to add a new setting, just copy a previous setting, use ai to make it fit the new setting. 

import { Box, Input, Radio, RadioGroup, Switch, Button, Stack, Flex, Text } from "@chakra-ui/react";

const Settings = () => {
    const { settings, updateSettings } = useSettings();

    // Local state for form inputs to control them
    const [localSettings, setLocalSettings] = React.useState(settings);

    useEffect(() => {
        // Update local settings when context settings change
        setLocalSettings(settings);
    }, [settings]);    const [saved, setSaved] = React.useState(false);

    const handleChange = (key, value) => {
        // Update local state
        const newSettings = {
            ...localSettings,
            [key]: value
        };
        setLocalSettings(newSettings);
        
        // Immediately save to global settings
        updateSettings({[key]: value});
        
        // Show saved indicator
        setSaved(true);
        setTimeout(() => setSaved(false), 1000); // Reset after 1 second
    };

    return (
        <Box>
            <Stack spacing={6}>
                {/* Settings Options */}
                <Stack spacing={4} p={4}>
                    {/* Senior Prank Setting */}
                    {/* <Flex justify="space-between" align="center">
                        <Box fontWeight="medium">Senior Prank</Box>
                        <Switch
                            id="seniorPrank"
                            isChecked={localSettings.seniorPrank}
                            onChange={(e) => handleChange("seniorPrank", e.target.checked)}
                        />
                    </Flex> */}
                    {/* <Flex justify="space-between" align="center">
                        <Box fontWeight="medium">Confetti</Box>
                        <Switch
                            id="confetti"
                            isChecked={localSettings.confetti}
                            onChange={(e) => handleChange("confetti", e.target.checked)}
                        />
                    </Flex> */}
                    {/* Theme Setting */}
                    <Flex justify="space-between" align="center">
                        <Box fontWeight="medium">Theme Mode</Box>
                        <RadioGroup
                            id="themeMode"
                            value={localSettings.themeMode}
                            onChange={(value) => handleChange("themeMode", value)}
                        >
                            <Stack direction="row" spacing={3}>
                                {[
                                    { value: 'light', icon: 'bi bi-brightness-high-fill', label: 'Light' },
                                    { value: 'dark', icon: 'bi bi-moon-fill', label: 'Dark' }
                                ].map((option) => (
                                    <Box 
                                        key={option.value} 
                                        px={3} 
                                        py={1} 
                                        borderRadius="md" 
                                        bg={localSettings.themeMode === option.value ? "var(--color-primary)" : "var(--accent-background)"} 
                                        color={localSettings.themeMode === option.value ? 'var(--text-contrast)' : 'var(--text-secondary)'}
                                        cursor="pointer"
                                        onClick={() => handleChange("themeMode", option.value)}
                                        display="flex"
                                        alignItems="center"
                                    >
                                        <Text size="sm">
                                            <i class={option.icon}></i>
                                        </Text>
                                    </Box>
                                ))}
                            </Stack>
                        </RadioGroup>
                    </Flex>
                    <Flex justify="space-between" align="center">
                        <Box fontWeight="medium">Theme Style</Box>
                        <RadioGroup
                            id="themeStyle"
                            value={localSettings.themeStyle}
                            onChange={(value) => handleChange("themeStyle", value)}
                        >
                            <Stack direction="row" spacing={3}>
                                {['normal', 'earth tones'].map((value) => (
                                    <Box 
                                        key={value} 
                                        px={3} 
                                        py={1} 
                                        borderRadius="md" 
                                        bg={localSettings.themeStyle === value ? "var(--color-primary)" : "var(--accent-background)"} 
                                        color={localSettings.themeStyle === value ? 'var(--text-contrast)' : 'var(--text-secondary)'}
                                        cursor="pointer"
                                        onClick={() => handleChange("themeStyle", value)}
                                    >
                                        {value.charAt(0).toUpperCase() + value.slice(1).replace('-', ' ')}
                                    </Box>
                                ))}
                            </Stack>
                        </RadioGroup>
                    </Flex>
                    <Flex justify="space-between" align="center">
                        <Box fontWeight="medium">Blue day lunch</Box>
                        <RadioGroup
                            id="blueDayLunch"
                            value={localSettings.blueDayLunch}
                            onChange={(value) => handleChange("blueDayLunch", value)}
                        >
                            <Stack direction="row" spacing={3}>
                                {['a', 'b', 'c', 'd'].map((value) => (
                                    <Box 
                                        key={value} 
                                        px={3} 
                                        py={1} 
                                        borderRadius="md" 
                                        bg={localSettings.blueDayLunch === value ? "var(--color-primary)" : "var(--accent-background)"} 
                                        color={localSettings.blueDayLunch === value ? 'var(--text-contrast)' : 'var(--text-secondary)'}
                                        cursor="pointer"
                                        onClick={() => handleChange("blueDayLunch", value)}
                                    >
                                        {value.toUpperCase()}
                                    </Box>
                                ))}
                            </Stack>
                        </RadioGroup>
                    </Flex>
                    <Flex justify="space-between" align="center">
                        <Box fontWeight="medium">Gray Day Lunch</Box>
                        <RadioGroup
                            id="grayDayLunch"
                            value={localSettings.grayDayLunch}
                            onChange={(value) => handleChange("grayDayLunch", value)}
                        >
                            <Stack direction="row" spacing={3}>
                                {['a', 'b', 'c', 'd'].map((value) => (
                                    <Box 
                                        key={value} 
                                        px={3} 
                                        py={1} 
                                        borderRadius="md" 
                                        bg={localSettings.grayDayLunch === value ? "var(--color-primary)" : "var(--accent-background)"} 
                                        color={localSettings.grayDayLunch === value ? 'var(--text-contrast)' : 'var(--text-secondary)'}
                                        cursor="pointer"
                                        onClick={() => handleChange("grayDayLunch", value)}
                                    >
                                        {value.toUpperCase()}
                                    </Box>
                                ))}
                            </Stack>
                        </RadioGroup>
                    </Flex>
                    <Flex justify="space-between" align="center">
                        <Box fontWeight="medium">Timer in Tab Title</Box>
                        <RadioGroup
                            id="showTimerInTitle"
                            value={String(localSettings.showTimerInTitle)}
                            onChange={(value) => handleChange("showTimerInTitle", value === "true")}
                        >
                            <Stack direction="row" spacing={3}>
                                {[{label: 'On', value: true}, {label: 'Off', value: false}].map((option) => (
                                    <Box 
                                        key={option.label}
                                        px={3}
                                        py={1}
                                        borderRadius="md"
                                        bg={localSettings.showTimerInTitle === option.value ? "var(--color-primary)" : "var(--accent-background)"}
                                        color={localSettings.showTimerInTitle === option.value ? 'var(--text-contrast)' : 'var(--text-secondary)'}
                                        cursor="pointer"
                                        onClick={() => handleChange("showTimerInTitle", option.value)}
                                    >
                                        {option.label}
                                    </Box>
                                ))}
                            </Stack>
                        </RadioGroup>
                    </Flex>
                    <Flex justify="space-between" align="center">
                        <Box fontWeight="medium">Weather Effects (Beta)</Box>
                        <RadioGroup
                            id="weatherEffects"
                            value={String(localSettings.weatherEffects)}
                            onChange={(value) => handleChange("weatherEffects", value === "true")}
                        >
                            <Stack direction="row" spacing={3}>
                                {[{label: 'On', value: true}, {label: 'Off', value: false}].map((option) => (
                                    <Box 
                                        key={option.label}
                                        px={3}
                                        py={1}
                                        borderRadius="md"
                                        bg={localSettings.weatherEffects === option.value ? "var(--color-primary)" : "var(--accent-background)"}
                                        color={localSettings.weatherEffects === option.value ? 'var(--text-contrast)' : 'var(--text-secondary)'}
                                        cursor="pointer"
                                        onClick={() => handleChange("weatherEffects", option.value)}
                                    >
                                        {option.label}
                                    </Box>
                                ))}
                            </Stack>
                        </RadioGroup>
                    </Flex>
                    </Stack>

                    {/* Save Indicator */}
                                {saved && (
                                    <Box 
                                        position="fixed" 
                                        bottom="20px" 
                                        right="20px" 
                                        bg="var(--color-primary)" 
                                        color="var(--text-contrast)" 
                                        py={2} 
                                        px={4} 
                                        borderRadius="md"
                                        display="flex"
                                        alignItems="center"
                                    >
                                        <Box
                                            as="span"
                                            transform="scale(1)"
                                            animation="pulse 1s ease-in-out"
                                            mr={2}
                                            sx={{
                                                "@keyframes pulse": {
                                                    "0%": { transform: "scale(1)" },
                                                    "50%": { transform: "scale(1.3)" },
                                                    "100%": { transform: "scale(1)" }
                                                }
                                            }}
                                        >
                                            ✓
                                        </Box>
                                        Settings Saved
                                    </Box>
                                )}

                                {/* Feedback Section */}
                <Box mt={4} borderTop="1px" borderColor="gray.300" pt={4}>
                    <Flex justify="space-between" align="center">
                        <Box fontSize="sm" width={"60%"}>
                        Share your feedback or suggestions!
                        </Box>
                        <Button 
                            as="a" 
                            href="https://forms.office.com/Pages/ResponsePage.aspx?id=PkZ4tvvZX0eBU43PqJYEfW78XFXJ5Q5Fsb3Z-zQt2UBUOFFFNjdPS1dWWTJVVVZTVDhXRVQ5TVhXVS4u" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            size="sm"
                            variant="outline"
                        >
                            Provide Feedback
                        </Button>
                    </Flex>
                </Box>
            </Stack>
        </Box>
    );
};

export default Settings;