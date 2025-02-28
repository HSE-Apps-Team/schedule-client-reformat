import React, { useEffect, useRef, useState } from "react";
import { useColorMode } from "@chakra-ui/react";
import Tick from "@pqina/flip";
import "@pqina/flip/dist/flip.min.css";

const Flip = ({ to, mobile }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const tickRef = useRef(null);  // Ref to hold the tick instance
    const [test, setTest] = useState(0);
    const [label, setLabel] = useState(['Days', 'Hours', 'Minutes', 'Seconds']);

    //useEffect(() => {
        // Initialize the tick object here
    //     const tickInstance = Tick.DOM.create(tickRef.current, {            
    //       didInit: function (tick) {
    //         // Create countdown counter
    //         const counter = Tick.count.down(to, {
    //           format: mobile ? ['d', 'h', 'm'] : ['d', 'h', 'm', 's'],
    //         });

    //         // Update the tick value and state
    //         counter.onupdate = function (value) {
    //           tick.value = value;
    //           setTest(tick.value);
    //         };
    //       },
    //     });

    //     // Cleanup on unmount
    //     return () => {
    //         if (tickInstance) tickInstance.destroy();  // Destroy the tick instance during cleanup
    //     };
    // }, [to, mobile]);  // Add dependencies to re-run when `to` or `mobile` changes

    return (
        <div>
            {/* <style>
                            {`
                .tick {
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    max-font-size: 1em;
                    white-space: nowrap;
                    font-family: arial, sans-serif;
                }

                .tick-credits {
                    display: none;
                }

                .tick-flip {
                    display: block;
                    bg: transparent;
                    box-shadow: inset 0 1px hsla(0,0%,100%,.05);
                    width: 10%;
                }
                .tick-flip,
                .tick-text-inline {
                    font-size: 2.5em;
                }

                .tick-flip-panel {
                    padding: 0;
                    box-shadow: none;
                }
                .tick-flip-card {
                    width: 101%;
                    transform: translateY(1px);
                }
                .tick-flip-card-shadow {
                    box-shadow: none;
                }

                .tick-label {
                    margin-top: 10px;
                    max-font-size: 1em;
                }

                .tick-char {
                    width: 1.5em;
                }

                .tick-text-inline {
                    display: inline-block;
                    text-align: center;
                    min-width: 1em;
                }

                .tick-text-inline + .tick-text-inline {
                    margin-left: -0.325em;
                }

                .tick-group {
                    margin: 0 0.5em;
                    text-align: center;
                }

                .tick-flip-panel-text-wrapper {
                    line-height: 1.45 !important;
                }
                .tick-flip-shadow {
                    box-shadow: 0 0 0 0;
                }
                .tick-flip-shadow-bottom {
                    box-shadow: 0 0 0 0;
                }
                .tick-flip-panel-back::after {
                    background-image: none;
                }
                .tick-flip-panel-back {
                    height: 50%;
                }
            `}
            </style> */}
            {/* <div ref={tickRef} className="tick">
                <div
                    data-repeat="true"
                    data-layout="horizontal fit"
                    data-transform="preset(d, h, m, s) -> delay">
                    <div className="tick-group">
                        <div
                            data-key="value"
                            data-repeat="true"
                            data-transform="pad(00) -> split -> delay">
                            <span data-view="flip"></span>
                        </div>
                        <span data-key="label" data-view="text" className="tick-label"></span>
                    </div>
                </div>
            </div> */}
            <div class="tick"
                data-value="Hello World">

                <span data-view="flip"></span>

            </div>
        </div>
    );
};

export default Flip;
