import { 
  Box, 
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
import { TableFactory } from '../components';

const Employees = () => {
  const defineColumns = () => [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'age', header: 'Age' },
    { accessorKey: 'gender', header: 'Gender' },
    { accessorKey: 'phoneNumber', header: 'Phone Number' },
    { accessorKey: 'emailAddress', header: 'Email Address' },
  ];

  const fetchDoctorsData = async () => {
    try {
      const doctors = await DoctorsCRUD.getAllDoctors();
      // console.log('fetchDoctorsData response: ', doctors);

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
    <HStack>
      <SimpleSidebar />
      <Box>
        <Heading>Employees</Heading>
        <Text>Members of Apex Medical Center</Text>
        
        <Tabs>
          <TabList>
            <Tab>Doctors</Tab>
            <Tab>Nurses</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TableFactory fetchData={fetchDoctorsData} defineColumns={defineColumns} />
            </TabPanel>
            <TabPanel>
              <TableFactory fetchData={fetchNursesData} defineColumns={defineColumns} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </HStack>
  );
};

export default Employees;