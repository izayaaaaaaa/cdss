import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignIn, Employees, Patients, Dashboard } from './pages/';

export const App = () => (
  <ChakraProvider>
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="*" element={<SignIn />} />
      </Routes>
    </Router>
  </ChakraProvider>
);
