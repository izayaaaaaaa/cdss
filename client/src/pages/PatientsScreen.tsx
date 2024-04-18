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
import { PatientsTable, SimpleSidebar, VitalSignsTable, ADPIETable } from '../components';
import { ADPIECRUD, PatientsCRUD, VitalSignsCRUD } from '../services';
import { useEffect, useState } from 'react';
import {Editor, EditorState, convertToRaw, convertFromRaw, ContentState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';

// const TextFormatControls = ({ editorState, onToggle }: { editorState: EditorState, onToggle: (style: string) => void }) => {
//   const currentStyle = editorState.getCurrentInlineStyle();
 
//   return (
//      <div>
//        {['BOLD', 'ITALIC', 'UNDERLINE'].map(style => (
//          <button
//            key={style}
//            onMouseDown={event => {
//              event.preventDefault();
//              onToggle(style);
//            }}
//            style={{
//              fontWeight: currentStyle.has(style) ? 'bold' : 'normal',
//              fontStyle: style === 'ITALIC' && currentStyle.has(style) ? 'italic' : 'normal',
//              textDecoration: style === 'UNDERLINE' && currentStyle.has(style) ? 'underline' : 'none',
//            }}
//          >
//            {style}
//          </button>
//        ))}
//      </div>
//   );
//  };

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

interface Adpie {
  ADPIEID: number;
  PatientID: number;
  DocumentType: string;
  Content: string;
  DateCreated: string;
  DateModified: string;
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
  { accessorKey: 'DocumentType', header: 'Document Type', size: 100 },
  // { accessorKey: 'Content', header: 'Content', size: 100 },
  { accessorKey: 'DateCreated', header: 'Date Created', size: 200 },
  { accessorKey: 'DateModified', header: 'Date Modified', size: 200 },
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
      if (!patient.PhysicianInCharge || !patient.NurseProfileID) {
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

const updatePatient = async (id: number, payload: any) => {
  try {
    console.log('updatePatient payload: ', payload)
    const updatedPatient = await PatientsCRUD.updatePatient(id, payload);
    console.log('updatePatient response: ', updatedPatient);

    return updatedPatient;
  } catch (error) {
    console.error('Failed to update patient:', error);
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
  // const toggleInlineStyle = (style: any) => {
  //   setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  // };

  // const handleKeyCommand = (command: any, editorState: any) => {
  //   const newState = RichUtils.handleKeyCommand(editorState, command);
  //   if (newState) {
  //      setEditorState(newState);
  //      return 'handled';
  //   }
  //   return 'not-handled';
  //  };

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
  const [refreshAdpieTable, setRefreshAdpieTable] = useState<boolean>(false);
  const [isADPIEEDitModalOpen, setIsADPIEEditModalOpen] = useState(false);
  const handleADPIEEditModalClose = () => setIsADPIEEditModalOpen(false);
  const [adpieId, setAdpieId] = useState(0);
  const [adpieDetails, setAdpieDetails] = useState<Adpie[]>([]);
  const [isADPIEEditLoading, setIsADPIEEditLoading] = useState(false);

  const [isVitalSignsModalOpen, setIsVitalSignsModalOpen] = useState(false);
  const handleVitalSignsModalClose = () => setIsVitalSignsModalOpen(false);

  const [physicianName, setPhysicianName] = useState<NameObject | {}>({});
  const [nurseName, setNurseName] = useState<NameObject | {}>({});

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
   );
   
   const handleEditorChange = (state: any) => {
    setEditorState(state);
   };

  const handleCreatePatient = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const patientData = Object.fromEntries(formData);
    await createPatient(patientData);
    setIsCreateModalOpen(false);
  };

  const createPatient = async (patientData: any) => {
    try {
      const createdPatient = await PatientsCRUD.createPatient(patientData);
      console.log('createPatient response: ', createdPatient);
      setRefreshPatientsTable(!refreshPatientsTable);

      return createdPatient;
    } catch (error) {
      console.error('Failed to create patient:', error);
    }
  }

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

  useEffect(() => {
    fetchPatientsData();
  }, [refreshPatientsTable]);

  useEffect(() => {
    fetchADPIEData();
  }, [refreshAdpieTable]);

  const handleEditPatient = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('handleEditPatient runs');

    // Capture form data
    const formData = new FormData(event.currentTarget);
    const updatedPatientData = Object.fromEntries(formData);

    // update OutpatientAdmissionStatus to boolean
    patientDetails[0].OutpatientAdmissionStatus = updatedPatientData.OutpatientAdmissionStatus === 'true' ? true : false;

    // Update the state with the new form data
    setPatientDetails([{ ...patientDetails[0], ...updatedPatientData }]);

    // Now, use the updated patientDetails for the update operation
    console.log('handleEditPatient Updated patient details: ', updatedPatientData);
    await updatePatient(patientDetails[0].ProfileID, updatedPatientData);

    setRefreshPatientsTable(!refreshPatientsTable);
    setIsEditPatientModalOpen(false);
  };

  const handleADPIE = async (event: any) => {
    event.preventDefault();
    console.log('handleADPIE runs');
    const formData = new FormData(event.target);
    const adpieData = Object.fromEntries(formData);
    console.log('ADPIE data: ', adpieData);
    await createAdpie(adpieData);
    setIsADPIEModalOpen(false);
    setRefreshAdpieTable(!refreshAdpieTable);
  }

  const createAdpie = async (adpieData: any) => {
    try {
      // convvert PatientID to number
      adpieData.PatientID = parseInt(adpieData.PatientID);
      const createdAdpie = await ADPIECRUD.createADPIE(adpieData);
      console.log('createAdpie response: ', createdAdpie);
      return createdAdpie;
    } catch (error) {
      console.error('Failed to create ADPIE:', error);
    }
  }

  const handleVitalSigns = async (event: any) => {
    event.preventDefault();
    console.log('handleVitalSigns runs');
  }

  const handleEditADPIEClick = async (adpieId: any) => {
    setIsADPIEEditLoading(true);
    setAdpieId(adpieId);
    const adpie = await ADPIECRUD.getADPIE(adpieId);
    console.log('specific ADPIE data acquired to be shown on edit modal: ', adpie)

    // Convert the content to a format that Draft.js can understand
    const contentState = ContentState.createFromText(adpie.Content);
    const newEditorState = EditorState.createWithContent(contentState);
    setEditorState(newEditorState);
    setAdpieDetails([adpie]);

    setIsADPIEEditLoading(false);
    setIsADPIEEditModalOpen(true);
  }

  const handleEditADPIE = async (event: any) => {
    event.preventDefault();
    console.log('handleEditADPIE runs');

    // Convert the editor's content to a raw format
    const contentState = editorState.getCurrentContent();
    console.log('ContentState:', contentState);
    const rawContent = convertToRaw(contentState);
    console.log('Raw content:', rawContent);
    // extract text from raw content
    const text = rawContent.blocks.map(block => block.text).join('\n');
    console.log('Text:', text);
    const updatedAdpieData = {
      PatientID: adpieDetails[0].PatientID, 
      DocumentType: adpieDetails[0].DocumentType, 
      Content: text,
      DateCreated: adpieDetails[0].DateCreated, 
      DateModified: new Date().toISOString(),
    };
    console.log('adpie id: ', adpieDetails[0].ADPIEID);
    console.log('handleEditADPIE Updated adpie details: ', updatedAdpieData);
    await ADPIECRUD.updateADPIE(adpieDetails[0].ADPIEID, updatedAdpieData);

    setRefreshAdpieTable(!refreshAdpieTable);
    setIsADPIEEditModalOpen(false);
  };

  useEffect(() => {
    console.log('adpieDetails changed: ', adpieDetails);
   }, [adpieDetails]);

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
          </TabList>
          <TabPanels>
            <TabPanel>
              <PatientsTable refreshTable={refreshPatientsTable} setRefreshTable={setRefreshPatientsTable} patientId={patientId} onEditClick={handleEditPatientClick} fetchData={fetchPatientsData} defineColumns={definePatientColumns} setIsEditModalOpen={setIsEditPatientModalOpen} setIsADPIEModalOpen={setIsADPIEModalOpen} setIsVitalSignsModalOpen={setIsVitalSignsModalOpen} />
            </TabPanel>
            <TabPanel>
              <VitalSignsTable fetchData={fetchVitalSignsData} defineColumns={vitalSignColumns} />
            </TabPanel>
            <TabPanel>
              <ADPIETable refreshTable={refreshAdpieTable} setRefreshTable={setRefreshAdpieTable} AdpieID={adpieId} onEditClick={handleEditADPIEClick} fetchData={fetchADPIEData} defineColumns={ADPIEColumns} setIsEditModalOpen={setIsADPIEEditModalOpen} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>


      {/* create patient modal global */}
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

      {/* edit patient modal in patients tab */}
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
                  <FormLabel>Outpatient Admission Status</FormLabel>
                  <Input name="OutpatientAdmissionStatus" defaultValue={patientDetails[0]?.OutpatientAdmissionStatus.toString()} required />
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

      {/* create new adpie in patients tab */}
      <Modal isOpen={isADPIEModalOpen} onClose={handleADPIEModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ADPIE</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleADPIE}>
              <FormControl>
                <FormLabel>Diagnosis</FormLabel>
                <Input name="Diagnosis" placeholder="Diagnosis" required />
              </FormControl>
              <FormControl>
                <FormLabel>Planning</FormLabel>
                <Input name="Planning" placeholder="Planning" required />
              </FormControl>
              <FormControl>
                <FormLabel>InterventionImplementation</FormLabel>
                <Input name="InterventionImplementation" placeholder="InterventionImplementation" required />
              </FormControl>
              <FormControl>
                <FormLabel>Evaluation</FormLabel>
                <Input name="Evaluation" placeholder="Evaluation" required />
              </FormControl>
              <FormControl>
                <FormLabel>Patient ID</FormLabel>
                <Input name="PatientID" placeholder="Patient ID" required />
              </FormControl>
              <Button w="full" mt={5} type="submit" colorScheme="blue">Save ADPIE</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* create new vitalsigns in patients tab */}
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

      {/* edit vital signs modal in vital signs tab */}

      {/* edit adpie modal in adpie tab */}
      <Modal isOpen={isADPIEEDitModalOpen && !isADPIEEditLoading} onClose={handleADPIEEditModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit ADPIE</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isADPIEEditLoading ? (
              <Text>Loading...</Text>
            ) : (
              <form onSubmit={handleEditADPIE}>
                {/* <TextFormatControls
                  editorState={editorState}
                  onToggle={toggleInlineStyle}
                /> */}
                {/* <Editor editorState={editorState} onChange={handleEditorChange} /> */}
                <div style={{ border: '1px solid gray', minHeight: '200px', padding: '10px' }}>
                  <Editor
                    editorState={editorState}
                    // handleKeyCommand={handleKeyCommand}
                    // onChange={setEditorState}
                    onChange={handleEditorChange}
                  />
                </div>
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
