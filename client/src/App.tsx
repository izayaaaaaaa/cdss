import { 
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignIn, Employees, Patients } from './pages/';

export const App = () => (
  <ChakraProvider theme={theme}>
     <Router>
       <Box textAlign="center" fontSize="xl">
         <Grid minH="100vh" p={3}>
           <ColorModeSwitcher justifySelf="flex-end" />
           <VStack spacing={8}>
             <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="*" element={<SignIn />} />
            </Routes>
           </VStack>
         </Grid>
       </Box>
     </Router>
  </ChakraProvider>
 );
