import React, { useEffect, useState } from "react";

import { Box, Text, ListItem, UnorderedList } from "@chakra-ui/react"
import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from "@chakra-ui/react"
import { motion } from "framer-motion"

import useMedia from '../../../hooks/useMedia'
import { getLunch } from '../../../api/api'

// DEPRECATED
// here for future use

// this was deleted because lunch hadn't been used in years. so yeah. Replaced with weather. 


const Lunch = ({ loading, setLoading }) => {
    const MotionBox = motion(Box)
    const mobile = useMedia(['(min-width: 750px)', '(max-width: 750px)'], [false, true])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [rawLunchData, setRawLunchData] = useState()
    const [lunchData, setLunchData] = useState({Title: "", Daily: [], Today: []})
    useEffect(() => {
        getLunch().then(res => {
            setRawLunchData(res.data.data)
            console.log(res.data.data)
            setLoading(false)
        })
    }, [])

    const genLunchData = (lunchLine) => {

        setLunchData({Title: lunchLine, Daily: rawLunchData[lunchLine].Daily, Today: rawLunchData[lunchLine].Today})

        console.log(lunchData)
    }

    if (loading) {
        return null;
    }
    
    return (
        <Box height={"100%"} width={"100%"} overflowY={"scroll"} paddingBottom={"25px"}>
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} width={"100%"}>
                {
                    Object.entries(rawLunchData).map( ([lunchLine]) => 
                        <MotionBox
                            whileHover={{x:10}}
                            className="component shadow"
                            width="60%" 
                            borderRadius="10px" 
                            padding="20px" 
                            margin={"5px"}
                            bg={"var(--background-secondary)"}
                            onClick={() => {
                                //setLunchData({...lunchData, Title: lunchLine})
                                genLunchData(lunchLine)
                                onOpen()
                            }}
                        >
                            <div>
                                <Text fontSize="2xl" level={mobile ? 4 : 3} >{lunchLine}</Text>
                            </div>

                        </MotionBox>
                    )
                }
            </Box>     
            <Drawer onClose={onClose} isOpen={isOpen} size={"lg"}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>{lunchData.Title}</DrawerHeader>
                    <DrawerBody>
                        {
                            lunchData.Daily[0] &&
                            <>
                                <Text fontSize="3xl" fontWeight="bold">Daily:</Text>
                                <UnorderedList>
                                    {lunchData.Daily.map((item) => {
                                        return(<ListItem><Text fontSize="xl">{item}</Text></ListItem>)
                                    })
                                    
                                }
                                </UnorderedList>
                                <br style={{marginTop:"30px"}}></br>    
                            </>
                        }

                        <Text fontSize="3xl" fontWeight="bold">Special Today:</Text>
                        <UnorderedList>
                            {lunchData.Today.map((item) => {
                                return(<ListItem><Text fontSize="xl">{item}</Text></ListItem>)
                            })}
                        </UnorderedList>
                        
                    </DrawerBody>
                </DrawerContent>
            </Drawer>    
        </Box>
        
    )
};

export default Lunch;