import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Grid, 
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
import { useEffect, useState } from 'react';
// import { Form } from 'react-router-dom';

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

interface NameObject {
  Name: string;
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
  const response = await PatientsCRUD.getPhysicianName(physicianId);
  return response;
}

const getNurseName = async (nurseId: Number) => {
  const response = await PatientsCRUD.getNurseName(nurseId);
  return response;
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

const updatePatient = async (id: number, payload: any) => {
  try {
    const updatedPatient = await PatientsCRUD.updatePatient(id, payload);
    console.log('updatePatient response: ', updatedPatient);
    
    return updatedPatient;
  } catch (error) {
    console.error('Failed to update patient:', error);
  }
}

const createPatient = async (patientData: any) => {
  try {
    const createdPatient = await PatientsCRUD.createPatient(patientData);
    console.log('createPatient response: ', createdPatient);
    
    return createdPatient;
  } catch (error) {
    console.error('Failed to create patient:', error);
  }
}

const formatDateForInput = (dateString: string): string => {
  // Check if the dateString is not empty and can be parsed into a valid Date object
  if (dateString && !isNaN(Date.parse(dateString))) {
    // Parse the date string to a Date object
    const date = new Date(dateString);

    // Format the date and time without milliseconds and timezone offset
    const formattedDate = date.toISOString().replace(/\.\d{3}Z$/, '');

    return formattedDate;
  }

  // Return an empty string or a default value if the dateString is not valid
  return '';
};
 
const Patients = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const handleCreateModalClose = () => setIsCreateModalOpen(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [patientId, setPatientId] = useState(0);
  const [patientDetails, setPatientDetails] = useState<Patient[]>([]);
  const handleEditModalClose = () => setIsEditModalOpen(false);
  const [isADPIEModalOpen, setIsADPIEModalOpen] = useState(false);
  const handleADPIEModalClose = () => setIsADPIEModalOpen(false);
  const [isVitalSignsModalOpen, setIsVitalSignsModalOpen] = useState(false);
  const handleVitalSignsModalClose = () => setIsVitalSignsModalOpen(false);
  
  const [physicianName, setPhysicianName] = useState<NameObject | {}>({});
  const [nurseName, setNurseName] = useState<NameObject | {}>({});

  const [isLoading, setIsLoading] = useState(false);

  const handleCreatePatient = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const patientData = Object.fromEntries(formData);
    await createPatient(patientData);
    setIsCreateModalOpen(false);
  };
  
  const getPatient = async (id: number) => {
    try {
      console.log('getPatient id: ', id);
      const patient = await PatientsCRUD.getPatient(id);
      console.log('getPatient response: ', patient);
      
      return patient;
    } catch (error) {
      console.error('Failed to get patient:', error);
    }
  }
  
  const handleEditClick = async (patientId: any) => {
    setIsLoading(true);
    setPatientId(patientId);
    const patient = await getPatient(patientId);
    setPatientDetails([patient]);
    setIsLoading(false);
    setIsEditModalOpen(true);
  }
  
  // useEffect(() => {
  //   if (isEditModalOpen) {
  //     console.log('useEffect isEditModalOpen triggered');
  //     getPatient(patientId).then(response => {
  //       setPatientDetails([response]);
  //     });
  //   }
  // }, [isEditModalOpen, patientId]);
  
  useEffect(() => {
    const fetchNames = async () => {
      if (patientDetails && patientDetails[0]) {
        // convert date to datetime-local format


        const nurseId = patientDetails[0].NurseProfileID;
        const physicianId = patientDetails[0].PhysicianInCharge;
  
        try {
          const nurseNameResponse = await getNurseName(nurseId);
          const physicianNameResponse = await getPhysicianName(physicianId);
  
          setNurseName(nurseNameResponse);
          setPhysicianName(physicianNameResponse);

          console.log('patientDetails updated: ', patientDetails);
        } catch (error) {
          console.error('Failed to fetch nurse or physician name:', error);
        }
      }
   };
  
   fetchNames();
  }, [patientDetails]);
  
  
  // const handleEditPatient = async (event: any) => {
  //   event.preventDefault();
  //   console.log('handleEditPatient runs');
  //   console.log('handleEditPatient patient details: ', patientDetails[0]);
  //   await updatePatient(patientDetails[0].ProfileID, patientDetails[0]);
  //   // setIsEditModalOpen(false);
  // }

  const handleEditPatient = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('handleEditPatient runs');
   
    // Capture form data
    const formData = new FormData(event.currentTarget);
    const updatedPatientData = Object.fromEntries(formData);
   
    // Update the state with the new form data
    setPatientDetails([{ ...patientDetails[0], ...updatedPatientData }]);
   
    // Now, use the updated patientDetails for the update operation
    console.log('Updated patient details: ', patientDetails[0]);
    await updatePatient(patientDetails[0].ProfileID, patientDetails[0]);
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
      
        <PatientsTable patientId={patientId} onEditClick={handleEditClick} fetchData={fetchPatientsData} defineColumns={defineColumns} setIsEditModalOpen={setIsEditModalOpen} setIsADPIEModalOpen={setIsADPIEModalOpen} setIsVitalSignsModalOpen={setIsVitalSignsModalOpen} />
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
      <Modal isOpen={isEditModalOpen && !isLoading} onClose={handleEditModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Patient</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoading ? (
              <Text>Loading...</Text>
            ) : (
              <form onSubmit={handleEditPatient}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input name="Name" defaultValue={patientDetails[0]?.Name} required />
                </FormControl>
                <FormControl>
                  <FormLabel>Age</FormLabel>
                  <Input name="Age" defaultValue={patientDetails[0]?.Age} required />
                </FormControl>
                <FormControl>
                  <FormLabel>Gender</FormLabel>
                  <Input name="Gender" defaultValue={patientDetails[0]?.Gender} required />
                </FormControl>
                <FormControl>
                  <FormLabel>Phone Number</FormLabel>
                  <Input name="PhoneNumber" defaultValue={patientDetails[0]?.PhoneNumber} required />
                </FormControl>
                <FormControl>
                  <FormLabel>Email Address</FormLabel>
                  <Input name="EmailAddress" defaultValue={patientDetails[0]?.EmailAddress} required />
                </FormControl>
                <FormControl>
                  <FormLabel>Chief Complaint</FormLabel>
                  <Input name="ChiefComplaint" defaultValue={patientDetails[0]?.ChiefComplaint} required />
                </FormControl>
                <FormControl>
                  <FormLabel>Medical History</FormLabel>
                  <Input name="MedicalHistory" defaultValue={patientDetails[0]?.MedicalHistory} required />
                </FormControl>
                <FormControl>
                  <FormLabel>Date Admitted</FormLabel>
                  <Input name="Date_Admitted" defaultValue={formatDateForInput(patientDetails[0]?.Date_Admitted)} type="datetime-local" required />
                </FormControl>
                <FormControl>
                  <FormLabel>Assigned Room Number</FormLabel>
                  <Input name="AssignedRoomNumber" defaultValue={patientDetails[0]?.AssignedRoomNumber} required />
                </FormControl>
                <FormControl>
                  <FormLabel>Bed Number</FormLabel>
                  <Input name="BedNumber" defaultValue={patientDetails[0]?.BedNumber} required />
                </FormControl>
                <FormControl>
                  <FormLabel>Physician Name</FormLabel>
                  <Input name="PhysicianName" defaultValue={physicianName && 'Name' in physicianName ? physicianName.Name : ''} required />
                </FormControl>
                <FormControl>
                  <FormLabel>Nurse Name</FormLabel>
                  <Input name="NurseName" defaultValue={nurseName && 'Name' in nurseName ? nurseName.Name : ''} required />
                </FormControl>
                <FormControl>
                  <FormLabel>Nurse Notes</FormLabel>
                  <Input name="NurseNotes" defaultValue={patientDetails[0]?.NurseNotes} required />
                </FormControl>
                <FormControl>
                  <FormLabel>Flow Chart</FormLabel>
                  <Input name="FlowChart" defaultValue={patientDetails[0]?.FlowChart} required />
                </FormControl>
                <Button type="submit" colorScheme="blue" mt={4}>Save Changes</Button>
              </form>
            )}            
          </ModalBody>
        </ModalContent>
      </Modal>
    </HStack>
  );
};

export default Patients;