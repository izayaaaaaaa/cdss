import { 
  Box, 
  Heading,
  HStack,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { SimpleSidebar } from '../components/SidebarComponent';
import { EmployeesTable, StatsCard } from '../components';
import { DoctorsCRUD, NursesCRUD } from '../services';
import { BsPerson } from 'react-icons/bs'
import { FiServer } from 'react-icons/fi'
import { GoLocation } from 'react-icons/go'

const Dashboard = () => {
  const defineColumns = () => [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'age', header: 'Age', size: 100 },
    { accessorKey: 'gender', header: 'Gender', size: 100 },
    { accessorKey: 'phoneNumber', header: 'Phone Number' },
    { accessorKey: 'emailAddress', header: 'Email Address' },
    // { accessorKey: 'available', header: 'Available', size: 100 },
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

  const updateDoctor = async (id: number, payload: any) => {
    try {
      const updatedDoctor = await DoctorsCRUD.updateDoctor(id, payload);
      console.log('updateDoctor response: ', updatedDoctor);

      return updatedDoctor;
    } catch (error) {
      console.error('Failed to update doctor:', error);
    }
  }

  const updateNurse = async (id: number, payload: any) => {
    try {
      const updatedNurse = await NursesCRUD.updateNurse(id, payload);
      console.log('updateNurse response: ', updatedNurse);

      return updatedNurse;
    } catch (error) {
      console.error('Failed to update doctor:', error);
    }
   };
  return (
    <HStack background="#E0EAF3">
      <SimpleSidebar />
      
      <Box ml={50}>
        <Heading mb={2}>Dashboard</Heading>

        <HStack>
          <Tabs>
            <TabList>
              <Tab>Doctors</Tab>
              <Tab>Nurses</Tab>
              <Tab>Patients</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <EmployeesTable updateEmployee={updateDoctor} fetchData={fetchDoctorsData} defineColumns={defineColumns} />
              </TabPanel>
              <TabPanel>
                <EmployeesTable updateEmployee={updateNurse} fetchData={fetchNursesData} defineColumns={defineColumns} />
              </TabPanel>
              <TabPanel>
                <EmployeesTable updateEmployee={updateNurse} fetchData={fetchNursesData} defineColumns={defineColumns} />
              </TabPanel>
            </TabPanels>
          </Tabs>

          <SimpleGrid columns={1}>
            <StatsCard title={'Available Doctors'} stat={'5,000'} icon={<BsPerson size={'3em'} />} />
            <StatsCard title={'Available Nurses'} stat={'1,000'} icon={<FiServer size={'3em'} />} />
            <StatsCard title={'Total Patients'} stat={'7'} icon={<GoLocation size={'3em'} />} />
        </SimpleGrid>
        </HStack>
      </Box>
    </HStack>
  );
};

export default Dashboard;