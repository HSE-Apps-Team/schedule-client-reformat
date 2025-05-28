// import React, { useEffect, useRef, useState } from "react";
// import { useColorMode } from "@chakra-ui/react";
// import Tick from "@pqina/flip";
// import "@pqina/flip/dist/flip.min.css";

// // create visual counter
// const Flip = ({ to, mobile, view }) => {
//     const { colorMode, toggleColorMode } = useColorMode();
//     const tickRef = useRef(null);
//     const [tickValue, setTickValue] = useState(0);
//     const [test, setTest] = useState(0);

//     const [label, setLabel] = useState(['Days', 'Hours', 'Minutes', 'Seconds']);
  
//     // useEffect(() => {
//         const tick = Tick.DOM.create(tickRef.current, {
//             didInit: function (tick) {
//                 // create the countdown counter
//                 var counter = Tick.count.down(to, {
//                     format: mobile ? ['d', 'h', 'm'] : ['d', 'h', 'm', 's'],
//                 });
                
        
//                 counter.onupdate = function (value) {
//                     tick.value = value;
//                     setTest(tick.value);
//                 };
//             },
//         });
    
//         // return () => {
//         //     tick.destroy();
//         // };
//     // }, [to, view, mobile]);

//   return (
//     <div style={{ margin: "0px 20px", width: "80%" }}>
        // <style>
        //     {`
        //         .tick {
        //             display: flex;
        //             justify-content: center;
        //             width: 100%;
        //             max-font-size: 1em;
        //             white-space: nowrap;
        //             font-family: arial, sans-serif;
        //         }

        //         .tick-credits {
        //             display: none;
        //         }

        //         .tick-flip {
        //             display: block;
        //             bg: transparent;
        //             box-shadow: inset 0 1px hsla(0,0%,100%,.05);
        //             width: 10%;
        //         }
        //         .tick-flip,
        //         .tick-text-inline {
        //             font-size: 2.5em;
        //         }

        //         .tick-flip-panel {
        //             padding: 0;
        //             box-shadow: none;
        //         }
        //         .tick-flip-card {
        //             width: 101%;
        //             transform: translateY(1px);
        //         }
        //         .tick-flip-card-shadow {
        //             box-shadow: none;
        //         }

        //         .tick-label {
        //             margin-top: 10px;
        //             max-font-size: 1em;
        //         }

        //         .tick-char {
        //             width: 1.5em;
        //         }

        //         .tick-text-inline {
        //             display: inline-block;
        //             text-align: center;
        //             min-width: 1em;
        //         }

        //         .tick-text-inline + .tick-text-inline {
        //             margin-left: -0.325em;
        //         }

        //         .tick-group {
        //             margin: 0 0.5em;
        //             text-align: center;
        //         }

        //         .tick-flip-panel-text-wrapper {
        //             line-height: 1.45 !important;
        //         }
        //         .tick-flip-shadow {
        //             box-shadow: 0 0 0 0;
        //         }
        //         .tick-flip-shadow-bottom {
        //             box-shadow: 0 0 0 0;
        //         }
        //         .tick-flip-panel-back::after {
        //             background-image: none;
        //         }
        //         .tick-flip-panel-back {
        //             height: 50%;
        //         }
        //     `}
        // </style>
//         <div ref={tickRef} className="tick">
//             <div
//             data-repeat="true"
//             data-layout="horizontal fit"
//             data-transform="preset(d, h, m, s) -> delay">
//                 <div className="tick-group">
//                     <div
//                         data-key="value"
//                         data-repeat="true"
//                         data-transform="pad(00) -> split -> delay">
//                         <span data-view="flip" className="shadow"></span>
//                     </div>
//                     <span data-key="label" data-view="text" class="tick-label"></span>
//                 </div>
//             </div>
//         </div>
//     </div>
//   );
// };

// export default Flip;

import React, { useEffect, useRef, useState } from "react";
import Tick from "@pqina/flip";
import "@pqina/flip/dist/flip.min.css";

const Flip = ({ to, loading, setLoading }) => {
    const divRef = useRef();
    const tickRef = useRef();
    const [tickValue, setTickValue] = useState("0000"); // This creates a 00:00:00:00 format

    useEffect(() => {
        const didInit = (tick) => {
            tickRef.current = tick;
        };

        const currDiv = divRef.current;
        const tickValue = tickRef.current;
        Tick.DOM.create(currDiv, {
            to,
            didInit
        });

        return () => {
            Tick.DOM.destroy(tickValue);
        }
    }, [to]);
    useEffect(() => {
        const counter = Tick.count.down(to, {
            format: ['d', 'h', 'm', 's'],
        });

        counter.onupdate = function(value) {
            setTickValue(value);
        };
        counter.onend = function() {
            // setConfetti(true);
        };

    }, [to]);

    useEffect(() => {
        if (tickRef.current) {
            tickRef.current.value = tickValue;
        }
    }, [tickValue]);

    // Shadow is on .tick-flip
    return  (
        <div>
            <style>
            {`
                .tick * {
                    display: flex;
                    justify-content: center;
                }
                .tick {
                    display: flex;
                    justify-content: center;
                    width: 70vw;
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
                    box-shadow: inset 0 1px hsla(0,0%,100%,.05), rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
                    width: 10%;
                    padding: 0 0.5vw;
                }
                .tick-flip,
                .tick-text-inline {
                    font-size: 2.5em;
                }

                .tick-flip-panel {
                    padding: 0;
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
            </style>

            <div ref={divRef} className="tick">
                <div
                data-repeat="true"
                data-layout="horizontal fit">
                    <div 
                    data-key="value"
                    data-repeat="true"
                    data-transform="pad(00) -> split -> delay">
                        <span data-view="flip"/>
                    </div>
                </div>
                <span data-key="label" class="tick-label">{}</span>

            </div>
        </div>
    );
};

export default Flip;
