import React from "react";
import { motion } from "framer-motion";

// does cool loading animation where the logo spins and fades in. Pretty cool. 

// The idea for this spawned when I was thinking about how to make the loading experience more engaging for users.

// I wanted to create a visual representation of loading that was both functional and aesthetically pleasing.

// The loading animation consists of a logo that spins and fades in, providing a smooth and engaging experience for users.

// This approach not only enhances the visual appeal but also helps to communicate the loading state effectively.

// /\ 
// ai rambling autocomplete i just let happen



const Loading = () => {
  return (
        <div className="loading-container">
            <motion.div
                className="logo"
                initial={{ opacity: 0, rotate: 0, scale: .25 }}
                animate={{ opacity: 1, rotate: 360, scale: .25 }}
                transition={{
                    duration: 1,
                    ease: [0.25, 1, 0.25, 1],
                    repeat: Infinity,
                    opacity: {
                        duration: 0.3,
                        delay: 0.1,
                        ease: "easeInOut"
                    }
                }}
            >
                {/* Replace with your logo */}
                <img src="hseapps.png" alt="hse schedule icon" className="logo-image" />
            </motion.div>
        </div>
    );
};

export default Loading;