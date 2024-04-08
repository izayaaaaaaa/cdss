import { 
  Box, 
  Heading,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import { SimpleSidebar } from '../components/SidebarComponent';
import Example from '../components/TableComponent';

const Employees = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
      <HStack>
        <SimpleSidebar />
        
        <Box>
          <Heading>Employees</Heading>
          <Example/>
        </Box>
        {/* employees content/box section */}
          {/* gradient bg */}

          {/* title & desc */}

          {/* pill tabs on top */}
            
            {/* search bar */}
            
            {/* table component */}
            
            {/* pagination */}
      </HStack>
  );
};

export default Employees;