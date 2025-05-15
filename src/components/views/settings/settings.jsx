import React from "react";
import { useEffect } from "react";
import { useSettings } from "../../../hooks/useSettings";

import { Box, Input, Radio, RadioGroup, Switch, Button, Stack } from "@chakra-ui/react";

const Settings = () => {
    const { settings, updateSettings } = useSettings();

    // Local state for form inputs to control them
    const [localSettings, setLocalSettings] = React.useState(settings);

    useEffect(() => {
        // Update local settings when context settings change
        setLocalSettings(settings);
    }, [settings]);

    const handleUpdateSettings = () => {
        updateSettings(localSettings); // Pass the entire localSettings object
    };

    const handleChange = (key, value) => {
        setLocalSettings(prev => ({
            ...prev,
            [key]: value
        }));
    };

    return (
        <Box>
            <Box>
                <Box>
                    <label>Darkmode</label>
                    <Switch
                        id="darkmode"
                        isChecked={localSettings.darkmode}
                        onChange={(e) => handleChange("darkmode", e.target.checked)}
                        colorScheme="colorScheme"
                    />
                </Box>
                <Box>
                    <label>Blue Lunch</label>
                    <RadioGroup
                        id="royalLunch"
                        value={localSettings.royalLunch}
                        onChange={(value) => handleChange("royalLunch", value)}
                        colorScheme="colorScheme"
                    >
                        <Stack direction="row">
                            <Radio value="A">A</Radio>
                            <Radio value="B">B</Radio>
                            <Radio value="C">C</Radio>
                            <Radio value="D">D</Radio>
                        </Stack>
                    </RadioGroup>
                </Box>
                <Box>                    
                    <label>Gray Lunch</label>
                    <RadioGroup
                        id="grayLunch"
                        value={localSettings.grayLunch}
                        onChange={(value) => handleChange("grayLunch", value)}
                        colorScheme="colorScheme"
                    >
                        <Stack direction="row">
                            <Radio value="A">A</Radio>
                            <Radio value="B">B</Radio>
                            <Radio value="C">C</Radio>
                            <Radio value="D">D</Radio>
                        </Stack>
                    </RadioGroup>
                </Box>
                <Box>                    
                    <label>Snow</label>
                    <Switch
                        id="snow"
                        isChecked={localSettings.snow}
                        onChange={(e) => handleChange("snow", e.target.checked)}
                        colorScheme="colorScheme"
                    />
                </Box>
                <Box>
                    <label>Theme</label>
                    <RadioGroup
                        id="theme"
                        value={localSettings.theme}
                        onChange={(value) => handleChange("theme", value)}
                    >
                        <Stack direction="row">
                            <Radio value="light">light</Radio>
                            <Radio value="dark">dark</Radio>
                            <Radio value="earth-tones">earth tones</Radio>
                        </Stack>
                    </RadioGroup>
                </Box>
            </Box>
            <Box>
                <Button onClick={handleUpdateSettings}>Update Settings</Button>
            </Box>
        </Box>
    );
};

export default Settings;