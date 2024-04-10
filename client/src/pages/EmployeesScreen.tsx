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
    // { accessorKey: 'id', header: 'ID', size: 50}
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'age', header: 'Age', size: 100 },
    { accessorKey: 'gender', header: 'Gender', size: 100 },
    { accessorKey: 'phoneNumber', header: 'Phone Number' },
    { accessorKey: 'emailAddress', header: 'Email Address' },
    { accessorKey: 'available', header: 'Available', size: 100 },
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

  // const updateNurse = async (id: number, dto: UpdateNurseDto) => {
  //   try {
  //      const response = await fetch(`${BASE_URL}/nurse/${id}`, {
  //        method: 'PATCH',
  //        headers: {
  //          'Content-Type': 'application/json',
  //        },
  //        body: JSON.stringify(dto),
  //      });
   
  //      if (!response.ok) {
  //        throw new Error('Network response was not ok');
  //      }
   
  //      const data = await response.json();
  //      return data;
  //   } catch (error) {
  //      console.error('Error updating nurse:', error);
  //      throw error;
  //   }
  //  };
   

  return (
    <HStack background="#E0EAF3">
      <SimpleSidebar />
      
      <Box ml={50}>
        <Heading mb={2} color={"#345673"}>Employees</Heading>
        <Text mb={7} color={"#345673"}>Members of Apex Medical Center</Text>
        
        <Tabs>
          <TabList>
            <Tab>Doctors</Tab>
            <Tab>Nurses</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <EmployeesTable updateEmployee={updateDoctor} fetchData={fetchDoctorsData} defineColumns={defineColumns} />
            </TabPanel>
            <TabPanel>
              {/* <EmployeesTable fetchData={fetchNursesData} defineColumns={defineColumns} /> */}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </HStack>
  );
};

export default Employees;