import React from "react";
import { useEffect } from "react";
import { useSettings } from "../../../hooks/useSettings";

import { Box, Input, Radio, RadioGroup, Switch, Button } from "@chakra-ui/react";
// Rendered from settings Button

const Settings = () => {
    const { settings, updateSettings} = useSettings();
    useEffect(() => {
        console.log(settings);
    }, []);

    useEffect(() => {
        handleUpdateSettings();
    }, [ // update when any of these change 
        document.getElementById("darkmode").checked, 
        document.getElementById("blueDayLunch").value,
        document.getElementById("grayDayLunch").value, 
        document.getElementById("snow").checked]);


    const handleUpdateSettings = () => {
        updateSettings("theme", document.getElementById("darkmode").checked);
        updateSettings("blueDayLunch", document.getElementById("blueDayLunch").value);
        updateSettings("grayDayLunch", document.getElementById("grayDayLunch").value);
        updateSettings("snow", document.getElementById("snow").checked);
    }
    
    return (
        <Box>
            <Box>Settings</Box>

            <Box>
                <Box>
                    <label>Darkmode</label>
                    <Switch id = "darkmode" />
                </Box>
                <Box>
                    <label>Blue Day Lunch</label>
                    <RadioGroup id = "blueDayLunch">
                        <Radio value="A">A</Radio>
                        <Radio value="B">B</Radio>
                        <Radio value="C">C</Radio>
                        <Radio value="D">D</Radio>
                    </RadioGroup>
                </Box>
                <Box>                    
                    <label>Gray Day Lunch</label>
                    <RadioGroup id = "grayDayLunch">
                        <Radio value="A">A</Radio>
                        <Radio value="B">B</Radio>
                        <Radio value="C">C</Radio>
                        <Radio value="D">D</Radio>
                    </RadioGroup>
                </Box>
                <Box>                    
                    <label>Snow</label>
                    <Switch id ="snow" />
                </Box>
            </Box>
            <Box>
                <Button>Cancel</Button>
                <Button>Update Settings</Button>
            </Box>
            
        </Box>
        
    );
};

export default Settings;
