import './App.css';
import { Box } from '@chakra-ui/react';
import Foreground from './components/foregrounds/Foreground';
import Views from './components/views/views';
import Background from './components/backgrounds/Background';

// Listen to John, he's always right
function App() {
  return (
    <Box position="relative">
      <Box position="absolute" top="0" left="0" right="0" bottom="0" zIndex={1}>
        <Background/>
      </Box>
      <Box position="absolute" top="0" left="0" right="0" bottom="0" zIndex={2}>
        <Views/>
      </Box>
      <Box position="absolute" top="0" left="0" right="0" bottom="0" zIndex={3}>
        <Foreground/>
      </Box>
    </Box>
  );
}

export default App;
