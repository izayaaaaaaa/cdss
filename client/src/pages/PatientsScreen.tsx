import { 
  Box, 
  Heading,
  HStack,
  Text,
} from '@chakra-ui/react';
import { SimpleSidebar } from '../components/SidebarComponent';
import { TableFactory } from '../components';
import { PatientsCRUD } from '../services';

const defineColumns = () => [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'age', header: 'Age' },
  { accessorKey: 'gender', header: 'Gender' },
  { accessorKey: 'phoneNumber', header: 'Phone Number' },
  { accessorKey: 'emailAddress', header: 'Email Address' },
];

const fetchPatientsData = async () => {
  try {
    const patients = await PatientsCRUD.getAllPatients();
    // console.log('fetchPatientsData response: ', patients);

    return patients;
  } catch (error) {
    console.error('Failed to fetch patients:', error);
  }
}

const Patients = () => {
  return (
    <HStack>
      <SimpleSidebar />
      
      <Box>
        <Heading>Patients</Heading>
        <Text>Patients of Apex Medical Center</Text>
        <TableFactory fetchData={fetchPatientsData} defineColumns={defineColumns} />
      </Box>
    </HStack>
    );
  };
  
  export default Patients;