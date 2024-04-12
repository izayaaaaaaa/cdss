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
  Image,
} from '@chakra-ui/react';
import { SimpleSidebar } from '../components/SidebarComponent';
import { StatsCard } from '../components';
import { DoctorsCRUD, NursesCRUD, PatientsCRUD } from '../services';
import doctorLogo from '../assets/images/icons8-doctors-64.png';
import nurseLogo from '../assets/images/icons8-doctors-100.png';
import patientLogo from '../assets/images/icons8-patients-64.png';
import DashboardTable from '../components/DashboardTable';
import { useEffect, useState } from 'react';

interface Patient {
  ProfileID: number;
  Name: string;
  Age: number;
  Gender: string;
  PhoneNumber: string;
  EmailAddress: string;
  ChiefComplaint: string;
  MedicalHistory: string;
  OutpatientAdmissionStatus: boolean;
  Date_Admitted: string;
  AssignedRoomNumber: number;
  BedNumber: number;
  PhysicianInCharge: number;
  NurseNotes: string;
  FlowChart: string;
  NurseProfileID: number;
 }

const defineColumns = () => [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'age', header: 'Age', size: 100 },
  { accessorKey: 'gender', header: 'Gender', size: 100 },
  { accessorKey: 'phoneNumber', header: 'Phone Number' },
  { accessorKey: 'emailAddress', header: 'Email Address' },
  // { accessorKey: 'available', header: 'Available', size: 100 },
];

const Dashboard = () => {
  const [availableDoctors, setAvailableDoctors] = useState(0);
  const [availableNurses, setAvailableNurses] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);

  const getPhysicianName = async (physicianId: Number) => {
    return await PatientsCRUD.getPhysicianName(physicianId);
  }
  
  const getNurseName = async (nurseId: Number) => {
    return await PatientsCRUD.getNurseName(nurseId);
  }

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

  const fetchPatientsData = async () => {
    try {
      const patients = await PatientsCRUD.getAllPatients();
      console.log('fetchPatientsData response: ', patients);
  
      // Fetch physician and nurse names for each patient
      const patientsDetailed = await Promise.all(patients.map(async (patient: Patient) => {
        const physicianName = await getPhysicianName(patient.PhysicianInCharge);
        const nurseName = await getNurseName(patient.NurseProfileID);
  
        return {
          ...patient,
          physicianName,
          nurseName,
        };
      }));
  
      console.log('fetchPatientsData patientsDetailed: ', patientsDetailed);
  
      return patientsDetailed;
    } catch (error) {
      console.error('Failed to fetch patients:', error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorsData = await DoctorsCRUD.getAvailableDoctors();
        console.log('doctorsData: ', doctorsData);
        setAvailableDoctors(doctorsData.length); // Assuming the response is an array

        const nursesData = await NursesCRUD.getAvailableNurses();
        console.log('nursesData: ', nursesData);
        setAvailableNurses(nursesData.length); // Assuming the response is an array

        const patientsData = await PatientsCRUD.getAllPatients();
        console.log('patientsData: ', patientsData);
        setTotalPatients(patientsData.length); // Assuming the response is an array
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
 }, []);

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
                <DashboardTable fetchData={fetchDoctorsData} defineColumns={defineColumns} />
              </TabPanel>
              <TabPanel>
                <DashboardTable fetchData={fetchNursesData} defineColumns={defineColumns} />
              </TabPanel>
              <TabPanel>
                <DashboardTable fetchData={fetchPatientsData} defineColumns={defineColumns} />
              </TabPanel>
            </TabPanels>
          </Tabs>

          <SimpleGrid columns={1} spacingY={"40px"} justifyItems={"space-between"}>
            <StatsCard title={'Available Doctors'} stat={availableDoctors.toString()} icon={<Image src={doctorLogo} boxSize="3em" />} />
            <StatsCard title={'Available Nurses'} stat={availableNurses.toString()} icon={<Image src={nurseLogo} boxSize="3em" />} />
            <StatsCard title={'Total Patients'} stat={totalPatients.toString()} icon={<Image src={patientLogo} boxSize="3em" />} />
          </SimpleGrid>
        </HStack>
      </Box>
    </HStack>
  );
};

export default Dashboard;