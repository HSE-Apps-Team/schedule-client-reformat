import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import Foreground from './components/foregrounds/Foreground';
import Views from './components/views/views';
import Background from './components/backgrounds/Background';

import './themes/theme.css';

// Listen to John, he's always right

function App() {

  const [view, setView] = useState("clock");
  const [loading, setLoading] = useState(true);

  return (
    <Box position="relative">
      <Box position="absolute" top="0" left="0" right="0" bottom="0" zIndex={3}>
        <Foreground setView={setView} setLoading={setLoading}/>
      </Box>
      <Box position="absolute" top="0" left="0" right="0" bottom="0" zIndex={2}>
        <Views view={view} loading={loading} setLoading={setLoading}/>
      </Box>
      <Box position="absolute" top="0" left="0" right="0" bottom="0" zIndex={1}>
        <Background/>
      </Box>
    </Box>
  );
}

export default App;
