import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
        <div className="loading-container">
            <motion.div
                className="logo"
                initial={{ opacity: 1, rotate: 0, scale: .25 }}
                animate={{ opacity: 1, rotate: 360, scale: .25 }}
                transition={{
                duration: 1,
                ease: [0.25, 1, 0.25, 1],
                repeat: Infinity,
                }}
            >
                {/* Replace with your logo */}
                <img src="hseapps.png" alt="Suck my balls" className="logo-image" />
            </motion.div>
        </div>
    );
};

export default Loading;