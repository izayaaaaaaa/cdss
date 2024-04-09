import { 
  Box, 
  Heading,
  HStack,
} from '@chakra-ui/react';
import { SimpleSidebar } from '../components/SidebarComponent';

const Dashboard = () => {
  return (
    <HStack background="#E0EAF3">
      <SimpleSidebar />
      
      <Box ml={50}>
        <Heading mb={2}>Dashboard</Heading>
      </Box>
    </HStack>
  );
};

export default Dashboard;