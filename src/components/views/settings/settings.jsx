import React from "react";
import { useEffect } from "react";
import { useSettings } from "../../../hooks/useSettings";

import { Box, Input, Radio, RadioGroup, Switch, Button, Stack, Flex } from "@chakra-ui/react";

const Settings = () => {
    const { settings, updateSettings } = useSettings();

    // Local state for form inputs to control them
    const [localSettings, setLocalSettings] = React.useState(settings);

    useEffect(() => {
        // Update local settings when context settings change
        setLocalSettings(settings);
    }, [settings]);

    const handleChange = (key, value) => {
        setLocalSettings(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const [saved, setSaved] = React.useState(false);

    const handleUpdateSettings = () => {
        updateSettings(localSettings); // Pass the entire localSettings object
        setSaved(true);
        setTimeout(() => setSaved(false), 2000); // Reset after 2 seconds
    };

    return (
        <Box>
            <Stack spacing={6}>
                {/* Settings Options */}
                <Stack spacing={4} p={4}>
                    {/* Senior Prank Setting */}
                    <Flex justify="space-between" align="center">
                        <Box fontWeight="medium">Senior Prank</Box>
                        <Switch
                            id="seniorPrank"
                            isChecked={localSettings.seniorPrank}
                            onChange={(e) => handleChange("seniorPrank", e.target.checked)}
                        />
                    </Flex>

                    {/* Theme Setting */}
                    <Flex justify="space-between" align="center">
                        <Box fontWeight="medium">Theme</Box>
                        <RadioGroup
                            id="theme"
                            value={localSettings.theme}
                            onChange={(value) => handleChange("theme", value)}
                        >
                            <Stack direction="row" spacing={3}>
                                <Radio value="light">Light</Radio>
                                <Radio value="dark">Dark</Radio>
                                <Radio value="earth-tones">Earth Tones</Radio>
                            </Stack>
                        </RadioGroup>
                    </Flex>
                </Stack>

                {/* Save Button */}
                                <Box textAlign="right">
                                    <Button 
                                        id="button"
                                        onClick={handleUpdateSettings} 
                                        px={6}
                                    >
                                        {saved ? (
                                            <Box as="span" display="flex" alignItems="center">
                                                <Box
                                                    as="span"
                                                    transform="scale(1)"
                                                    animation="pulse 1s ease-in-out"
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
                                                <Box as="span" ml={2}>Saved</Box>
                                            </Box>
                                        ) : (
                                            "Update Settings"
                                        )}
                                    </Button>
                                </Box>

                                {/* Feedback Section */}
                <Box mt={4} borderTop="1px" borderColor="gray.300" pt={4}>
                    <Flex justify="space-between" align="center">
                        <Box fontSize="sm" width={"60%"}>
                          This is the new HSE Schedule app. Share your feedback or suggestions!
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