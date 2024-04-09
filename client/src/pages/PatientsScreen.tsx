import { 
  Box, 
  Heading,
  HStack,
  Text,
} from '@chakra-ui/react';
import { SimpleSidebar } from '../components/SidebarComponent';
import { PatientsTable } from '../components';
import { PatientsCRUD } from '../services';

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
  { accessorKey: 'physicianName', header: 'Physician' },
  { accessorKey: 'nurseName', header: 'Nurse' },
];

const getPhysicianName = async (physicianId: Number) => {
  return await PatientsCRUD.getPhysicianName(physicianId);
}

const getNurseName = async (nurseId: Number) => {
  return await PatientsCRUD.getNurseName(nurseId);
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

const Patients = () => {
  return (
    <HStack background="#E0EAF3">
      <SimpleSidebar />
      
      <Box ml={50}>
        <Heading mb={2}>Patients</Heading>
        <Text mb={7}>Patients of Apex Medical Center</Text>
        <PatientsTable fetchData={fetchPatientsData} defineColumns={defineColumns} />
      </Box>
    </HStack>
    );
  };
  
  export default Patients;