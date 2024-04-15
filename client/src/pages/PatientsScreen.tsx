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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { PatientsTable, SimpleSidebar, VitalSignsTable, ADPIETable, AssessmentsTable  } from '../components';
import { ADPIECRUD, PatientsCRUD, VitalSignsCRUD, AssessmentsCRUD } from '../services';
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

interface Assessment {
  AssessmentID: number;
  ADPIEID: number;
  HealthHistory: string;
  ChiefComplaint: string;
  HistoryOfPresentIllness: string;
  PastMedicalHistory: string;
  SocialHistory: string;
  NurseNotes: string;
  LaboratoryTests?: any; // Assuming this is a JSON object, adjust the type as necessary
  PhysicalExaminations?: any; // Assuming this is a JSON object, adjust the type as necessary
  DiagnosticTests?: any; // Assuming this is a JSON object, adjust the type as necessary
  ImagingStudies?: any; // Assuming this is a JSON object, adjust the type as necessary
}

interface NameObject {
  Name: string;
}

const definePatientColumns = () => [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'age', header: 'Age', size: 100 },
  { accessorKey: 'gender', header: 'Gender', size: 100 },
  { accessorKey: 'phoneNumber', header: 'Phone Number' },
  { accessorKey: 'emailAddress', header: 'Email Address' },
  { accessorKey: 'physicianName', header: 'Physician' },
  { accessorKey: 'nurseName', header: 'Nurse' },
];

const vitalSignColumns = () => [
  { accessorKey: 'PatientID', header: 'Patient ID', size: 100 },
  { accessorKey: 'DateTime', header: 'Date Taken', size: 200 },
  { accessorKey: 'Temperature', header: 'Temperature', size: 100 },
  { accessorKey: 'PulseRate', header: 'Pulse Rate', size: 100 },
  { accessorKey: 'BloodPressure', header: 'Blood Pressure', size: 100 },
  { accessorKey: 'PainScale', header: 'Pain Scale', size: 100 },
  { accessorKey: 'OxygenSaturation', header: 'Oxygen Saturation', size: 100 },
];

const ADPIEColumns = () => [
  { accessorKey: 'PatientID', header: 'Patient ID', size: 100 },
  { accessorKey: 'Diagnosis', header: 'Diagnosis', size: 200 },
  { accessorKey: 'Planning', header: 'Planning', size: 200 },
  { accessorKey: 'InterventionImplementation', header: 'Intervention Implementation', size: 200 },
  { accessorKey: 'Evaluation', header: 'Evaluation', size: 200 },
];

const AssessmentColumns = () => [
  { accessorKey: 'AssessmentID', header: 'Assessment ID', size: 100 },
  { accessorKey: 'ADPIEID', header: 'ADPIE ID', size: 100 },
  { accessorKey: 'HealthHistory', header: 'Health History', size: 200 },
  { accessorKey: 'ChiefComplaint', header: 'Chief Complaint', size: 200 },
  { accessorKey: 'HistoryOfPresentIllness', header: 'History of Present Illness', size: 200 },
  { accessorKey: 'PastMedicalHistory', header: 'Past Medical History', size: 200 },
  // { accessorKey: 'SocialHistory', header: 'Social History', size: 200 },
  // { accessorKey: 'NurseNotes', header: 'Nurse Notes', size: 200 },
  // Additional columns for LaboratoryTests, PhysicalExaminations, DiagnosticTests, ImagingStudies can be added here
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
      
      console.log('physician and or nurse id exists');
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

const fetchVitalSignsData = async () => {
  try {
    console.log('fetchVitalSignsData function PatientsScreen.tsx runs')
    const vitalSigns = await VitalSignsCRUD.getVitalSigns();
    console.log('fetchVitalSignsData response: ', vitalSigns);
    
    return vitalSigns;
  } catch (error) {
    console.error('Failed to fetch vital signs:', error);
  }
}

const fetchADPIEData = async () => {
  try {
    console.log('fetchADPIEData function PatientsScreen.tsx runs')
    const adpie = await ADPIECRUD.getAllADPIE();
    console.log('fetchADPIEData response: ', adpie);
    
    return adpie;
  } catch (error) {
    console.error('Failed to fetch ADPIE:', error);
  }
}

const fetchAssessmentsData = async () => {
  try {
    console.log('fetchAssessmentsData function PatientsScreen.tsx runs')
    const assessments = await AssessmentsCRUD.findAllAssessments();
    console.log('fetchAssessmentsData response: ', assessments);
    return assessments;
  } catch (error) {
     console.error('Failed to fetch assessments:', error);
  }
};

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

  const [isEditPatientModalOpen, setIsEditPatientModalOpen] = useState(false);
  const handleEditPatientModalClose = () => setIsEditPatientModalOpen(false);
  const [isEditPatientLoading, setIsEditPatientLoading] = useState(false);
  const [refreshPatientsTable, setRefreshPatientsTable] = useState<boolean>(false);
  const [patientId, setPatientId] = useState(0);
  const [patientDetails, setPatientDetails] = useState<Patient[]>([]);

  const [isADPIEModalOpen, setIsADPIEModalOpen] = useState(false);
  const handleADPIEModalClose = () => setIsADPIEModalOpen(false);

  const [isVitalSignsModalOpen, setIsVitalSignsModalOpen] = useState(false);
  const handleVitalSignsModalClose = () => setIsVitalSignsModalOpen(false);
  
  const [physicianName, setPhysicianName] = useState<NameObject | {}>({});
  const [nurseName, setNurseName] = useState<NameObject | {}>({});

  const [isEditAssessmentsModalOpen, setIsEditAssessmentsModalOpen] = useState(false);
  const handleEditAssessmentsModalClose = () => setIsEditAssessmentsModalOpen(false);
  const [isEditAssessmentsLoading, setIsEditAssessmentsLoading] = useState(false);
  const [assessmentId, setAssessmentId] = useState(0);
  const [assessmentDetails, setAssessmentDetails] = useState<Assessment[]>([]);

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
  
  const handleEditPatientClick = async (patientId: any) => {
    setIsEditPatientLoading(true);
    setPatientId(patientId);
    const patient = await getPatient(patientId);
    setPatientDetails([patient]);
    setIsEditPatientLoading(false);
    setIsEditPatientModalOpen(true);
  }

  const handleEditAssessmentClick = async (assessmentId: any) => {
    setIsEditAssessmentsLoading(true); 
    setAssessmentId(assessmentId);
    const assessment = await AssessmentsCRUD.findOneAssessment(assessmentId);
    setAssessmentDetails([assessment]);
    setIsEditAssessmentsLoading(false);
    setIsEditAssessmentsModalOpen(true);
  }

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
  
  const handleEditPatient = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('handleEditPatient runs');
   
    // Capture form data
    const formData = new FormData(event.currentTarget);
    const updatedPatientData = Object.fromEntries(formData);

    console.log('Updated patient data: ', updatedPatientData);

    // Update the state with the new form data
    setPatientDetails([{ ...patientDetails[0], ...updatedPatientData }]);
   
    // Now, use the updated patientDetails for the update operation
    console.log('Updated patient details: ', updatedPatientData);
    await updatePatient(patientDetails[0].ProfileID, updatedPatientData);

    setRefreshPatientsTable(!refreshPatientsTable);
    setIsEditPatientModalOpen(false);
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

  const handleEditAssessment = async (event: any) => {
    event.preventDefault();
    console.log('handleEditAssessment runs');
  }
  
  return (
    <HStack background="#E0EAF3">
      <SimpleSidebar />
    
      <Box ml={25}>
        <HStack justifyContent={"space-between"}>
          <Box>
            <Heading mb={2} color={"#345673"}>Patients</Heading>
            <Text mb={7} color={"#345673"}>Patients of Apex Medical Center</Text>
          </Box>
          <Button colorScheme="facebook" size="lg" onClick={() => setIsCreateModalOpen(true)}>Create Patient</Button>
        </HStack>
      
        <Tabs>
          <TabList>
            <Tab>Patients</Tab>
            <Tab>Vital Signs</Tab>
            <Tab>ADPIE</Tab>
            <Tab>Assessments</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <PatientsTable refreshTable={refreshPatientsTable} setRefreshTable={setRefreshPatientsTable} patientId={patientId} onEditClick={handleEditPatientClick} fetchData={fetchPatientsData} defineColumns={definePatientColumns} setIsEditModalOpen={setIsEditPatientModalOpen} setIsADPIEModalOpen={setIsADPIEModalOpen} setIsVitalSignsModalOpen={setIsVitalSignsModalOpen} />
            </TabPanel>
            <TabPanel>
              <VitalSignsTable fetchData={fetchVitalSignsData} defineColumns={vitalSignColumns} />
            </TabPanel>
            <TabPanel>
              <ADPIETable fetchData={fetchADPIEData} defineColumns={ADPIEColumns} />
            </TabPanel>
            <TabPanel>
              <AssessmentsTable fetchData={fetchAssessmentsData} defineColumns={AssessmentColumns} setIsEditModalOpen={setIsEditAssessmentsModalOpen} onEditClick={handleEditAssessmentClick} />
            </TabPanel>
          </TabPanels>
        </Tabs>
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
      <Modal isOpen={isEditPatientModalOpen && !isEditPatientLoading} onClose={handleEditPatientModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Patient</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isEditPatientLoading ? (
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
      <Modal isOpen={isEditAssessmentsModalOpen && !isEditAssessmentsLoading} onClose={handleEditAssessmentsModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Assessment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isEditAssessmentsLoading ? (
              <Text>Loading...</Text>
            ) : (
              <form onSubmit={handleEditAssessment}>
                <FormControl>
                  <FormLabel>Health History</FormLabel>
                  <Input name="HealthHistory" defaultValue={assessmentDetails[0]?.HealthHistory} required />
                </FormControl>
                <FormControl>
                  <FormLabel>Chief Complaint</FormLabel>
                  <Input name="ChiefComplaint" defaultValue={assessmentDetails[0]?.ChiefComplaint} required />  
                </FormControl>
                <FormControl>
                  <FormLabel>History of Present Illness</FormLabel>
                  <Input name="HistoryOfPresentIllness" defaultValue={assessmentDetails[0]?.HistoryOfPresentIllness} required />
                </FormControl>
                <FormControl>
                  <FormLabel>Past Medical History</FormLabel>
                  <Input name="PastMedicalHistory" defaultValue={assessmentDetails[0]?.PastMedicalHistory} required />
                </FormControl>
                <FormControl>
                  <FormLabel>Social History</FormLabel>
                  <Input name="SocialHistory" defaultValue={assessmentDetails[0]?.SocialHistory} required />
                </FormControl>
                <FormControl>
                  <FormLabel>Nurse Notes</FormLabel>
                  <Input name="NurseNotes" defaultValue={assessmentDetails[0]?.NurseNotes} required />
                </FormControl>
                {Array.isArray(assessmentDetails[0]?.LaboratoryTests) && assessmentDetails[0]?.LaboratoryTests.map((test: any, index: number) => (
                  <div key={index}>
                    <FormControl>
                      <FormLabel>Laboratory Test {index + 1} Label</FormLabel>
                      <Input name={`LaboratoryTests[${index}].label`} defaultValue={test.label} required />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Laboratory Test {index + 1} Link</FormLabel>
                      <Input name={`LaboratoryTests[${index}].value`} defaultValue={test.value} required />
                    </FormControl>
                  </div>
                ))}
                {Array.isArray(assessmentDetails[0]?.PhysicalExaminations) && assessmentDetails[0]?.PhysicalExaminations.map((test: any, index: number) => (
                  <div key={index}>
                    <FormControl>
                      <FormLabel>Physical Examination {index + 1} Label</FormLabel>
                      <Input name={`PhysicalExaminations[${index}].label`} defaultValue={test.label} required />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Physical Examination {index + 1} Link</FormLabel>
                      <Input name={`PhysicalExaminations[${index}].value`} defaultValue={test.value} required />
                    </FormControl>
                  </div>
                ))}
                {Array.isArray(assessmentDetails[0]?.DiagnosticTests) && assessmentDetails[0]?.DiagnosticTests.map((test: any, index: number) => (
                  <div key={index}>
                    <FormControl>
                      <FormLabel>Diagnostic Test {index + 1} Label</FormLabel>
                      <Input name={`DiagnosticTests[${index}].label`} defaultValue={test.label} required />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Diagnostic Test {index + 1} Link</FormLabel>
                      <Input name={`DiagnosticTests[${index}].value`} defaultValue={test.value} required />
                    </FormControl>
                  </div>
                ))}
                {Array.isArray(assessmentDetails[0]?.ImagingStudies) && assessmentDetails[0]?.ImagingStudies.map((test: any, index: number) => (
                  <div key={index}>
                    <FormControl>
                      <FormLabel>Imaging Study {index + 1} Label</FormLabel>
                      <Input name={`ImagingStudies[${index}].label`} defaultValue={test.label} required />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Imaging Study {index + 1} Link</FormLabel>
                      <Input name={`ImagingStudies[${index}].value`} defaultValue={test.value} required />
                    </FormControl>
                  </div>
                ))}
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