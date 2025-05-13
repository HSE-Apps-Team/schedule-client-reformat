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
            <Box>Settings</Box>
            <Box>
                <Box>
                    <label>Darkmode</label>
                    <Switch
                        id="darkmode"
                        isChecked={localSettings.darkmode}
                        onChange={(e) => handleChange("darkmode", e.target.checked)}
                    />
                </Box>
                <Box>
                    <label>Royal Lunch (Blue Day)</label>
                    <RadioGroup
                        id="royalLunch"
                        value={localSettings.royalLunch}
                        onChange={(value) => handleChange("royalLunch", value)}
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
                    />
                </Box>
            </Box>
            <Box>
                <Button>Cancel</Button>
                <Button onClick={handleUpdateSettings}>Update Settings</Button>
            </Box>
        </Box>
    );
};

export default Settings;