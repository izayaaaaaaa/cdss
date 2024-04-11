import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { SimpleSidebar } from '../components/SidebarComponent';
import { PatientsTable } from '../components';
import { PatientsCRUD } from '../services';
import { useState } from 'react';

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
      if(!patient.PhysicianInCharge || !patient.NurseProfileID) {
        return patient;
      }
      
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

// const updatePatient = async (id: number, payload: any) => {
//   try {
//     const updatedPatient = await PatientsCRUD.updatePatient(id, payload);
//     console.log('updatePatient response: ', updatedPatient);

//     return updatedPatient;
//   } catch (error) {
//     console.error('Failed to update patient:', error);
//   }
// }

const createPatient = async (patientData: any) => {
  try {
    const createdPatient = await PatientsCRUD.createPatient(patientData);
    console.log('createPatient response: ', createdPatient);

    return createdPatient;
  } catch (error) {
    console.error('Failed to create patient:', error);
  }
}

const Patients = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const handleCreateModalClose = () => setIsCreateModalOpen(false);
  const [isADPIEModalOpen, setIsADPIEModalOpen] = useState(false);
  const handleADPIEModalClose = () => setIsADPIEModalOpen(false);
  const [isVitalSignsModalOpen, setIsVitalSignsModalOpen] = useState(false);
  const handleVitalSignsModalClose = () => setIsVitalSignsModalOpen(false);

  const handleCreatePatient = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const patientData = Object.fromEntries(formData);
    await createPatient(patientData);
    setIsCreateModalOpen(false);
 };

 const handleADPIE = async (event: any) => {
  event.preventDefault();
  console.log('handleADPIE runs');
  // const formData = new FormData(event.target);
  // const patientData = Object.fromEntries(formData);
  // await createPatient(patientData);
  // setIsADPIEModalOpen(false);
}

const handleVitalSigns = async (event: any) => {
  event.preventDefault();
  console.log('handleVitalSigns runs');
}

  return (
    <HStack background="#E0EAF3">
      <SimpleSidebar />
      
      <Box ml={50}>
        <HStack justifyContent={"space-between"}>
          <Box>
            <Heading mb={2} color={"#345673"}>Patients</Heading>
            <Text mb={7} color={"#345673"}>Patients of Apex Medical Center</Text>
          </Box>
          <Button colorScheme="facebook" size="lg" onClick={() => setIsCreateModalOpen(true)}>Create Patient</Button>
        </HStack>
        
        <PatientsTable fetchData={fetchPatientsData} defineColumns={defineColumns} setIsADPIEModalOpen={setIsADPIEModalOpen} setIsVitalSignsModalOpen={setIsVitalSignsModalOpen} />
      </Box>
      <Modal isOpen={isCreateModalOpen} onClose={handleCreateModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Patient</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleCreatePatient}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input name="Name" placeholder="Patient Name" required />
              </FormControl>
              <FormControl>
                <FormLabel>Age</FormLabel>
                <Input name="Age" placeholder="Patient Age" required />
              </FormControl>
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <Input name="Gender" placeholder="Patient Gender" required />
              </FormControl>
              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input name="PhoneNumber" placeholder="Patient Phone Number" required />
              </FormControl>
              <FormControl>
                <FormLabel>Email Address</FormLabel>
                <Input name="EmailAddress" placeholder="Patient Email Address" required />
              </FormControl>
              <FormControl>
                <FormLabel>Chief Complaint</FormLabel>
                <Input name="ChiefComplaint" placeholder="Chief Complaint" required />
              </FormControl>
              <FormControl>
                <FormLabel>Medical History</FormLabel>
                <Input name="MedicalHistory" placeholder="Medical History" required />
              </FormControl>
              <FormControl>
                <FormLabel>Date Admitted</FormLabel>
                <Input name="Date_Admitted" placeholder="Select Date Admitted" type="datetime-local" required />              
              </FormControl>
              <Button w="full" mt={5} type="submit" colorScheme="blue">Save Patient</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isADPIEModalOpen} onClose={handleADPIEModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ADPIE</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleADPIE}>
              <FormControl>
                <FormLabel>Assessment</FormLabel>
                <Input name="Assessment" placeholder="Assessment" required />
              </FormControl>
              <FormControl>
                <FormLabel>Diagnosis</FormLabel>
                <Input name="Diagnosis" placeholder="Diagnosis" required />
              </FormControl>
              <FormControl>
                <FormLabel>Planning</FormLabel>
                <Input name="Planning" placeholder="Planning" required />
              </FormControl>
              <FormControl>
                <FormLabel>Implementation</FormLabel>
                <Input name="Implementation" placeholder="Implementation" required />
              </FormControl>
              <FormControl>
                <FormLabel>Evaluation</FormLabel>
                <Input name="Evaluation" placeholder="Evaluation" required />
              </FormControl>
              <Button w="full" mt={5} type="submit" colorScheme="blue">Save ADPIE</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isVitalSignsModalOpen} onClose={handleVitalSignsModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Vital Signs</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleVitalSigns}>
              <FormControl>
                <FormLabel>Temperature</FormLabel>
                <Input name="Temperature" placeholder="Temperature" required />
              </FormControl>
              <FormControl>
                <FormLabel>Heart Rate</FormLabel>
                <Input name="Heart Rate" placeholder="Heart Rate" required />
              </FormControl>
              <FormControl>
                <FormLabel>Blood Pressure</FormLabel>
                <Input name="Blood Pressure" placeholder="Blood Pressure" required />
              </FormControl>
              <FormControl>
                <FormLabel>Respiratory Rate</FormLabel>
                <Input name="Respiratory Rate" placeholder="Respiratory Rate" required />
              </FormControl>
              <FormControl>
                <FormLabel>Oxygen Saturation</FormLabel>
                <Input name="Oxygen Saturation" placeholder="Oxygen Saturation" required />
              </FormControl>
              <Button w="full" mt={5} type="submit" colorScheme="blue">Save Vital Signs</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </HStack>
    );
  };
  
  export default Patients;