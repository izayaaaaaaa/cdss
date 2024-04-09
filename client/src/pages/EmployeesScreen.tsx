import { 
  Box, 
  // Button, 
  Heading,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { SimpleSidebar } from '../components/SidebarComponent';
import { DoctorsCRUD, NursesCRUD } from '../services';
import { EmployeesTable } from '../components';

const Employees = () => {
  const defineColumns = () => [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'age', header: 'Age', size: 100 },
    { accessorKey: 'gender', header: 'Gender', size: 100 },
    { accessorKey: 'phoneNumber', header: 'Phone Number' },
    { accessorKey: 'emailAddress', header: 'Email Address' },
    { accessorKey: 'available', header: 'Available' },
  ];

  const fetchDoctorsData = async () => {
    try {
      const doctors = await DoctorsCRUD.getAllDoctors();
      console.log('fetchDoctorsData response: ', doctors);

      return doctors;
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    }
  };

  const fetchNursesData = async () => {
    try {
      const nurses = await NursesCRUD.getAllNurses();
      // console.log('fetchNursesData response: ', nurses);

      return nurses;
    } catch (error) {
      console.error('Failed to fetch nurses:', error);
    }
  }

  return (
    <HStack background="#E0EAF3">
      <SimpleSidebar />
      
      <Box ml={50}>
        <Heading mb={2}>Employees</Heading>
        <Text mb={7}>Members of Apex Medical Center</Text>
        
        <Tabs>
          <TabList>
            <Tab>Doctors</Tab>
            <Tab>Nurses</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <EmployeesTable fetchData={fetchDoctorsData} defineColumns={defineColumns} />
            </TabPanel>
            <TabPanel>
              <EmployeesTable fetchData={fetchNursesData} defineColumns={defineColumns} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </HStack>
  );
};

export default Employees;