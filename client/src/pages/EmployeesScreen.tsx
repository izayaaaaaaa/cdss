import { 
  Box, 
  Heading,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import { SimpleSidebar } from '../components/SidebarComponent';
import TableComponent from '../components/TableComponent';

const Employees = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
      <HStack>
        <SimpleSidebar />
        <Box>
          <Heading>Employees</Heading>
          <TableComponent/>
        </Box>
      </HStack>
  );
};

export default Employees;