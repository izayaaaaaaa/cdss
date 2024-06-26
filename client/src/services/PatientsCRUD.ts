import DoctorsCRUD from "./DoctorsCRUD";
import NursesCRUD from "./NursesCRUD";

const BASE_URL = process.env.REACT_APP_API_URL;

const getAllPatients = async () => {
  try {
    const response = await fetch(`${BASE_URL}/patient`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};

const getPhysicianName = async (physicianId: Number) => {
  try {
    const response = await fetch(`${BASE_URL}/doctor/${physicianId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching physician:', error);
    throw error;
  }
}

const getNurseName = async (nurseId: Number) => {
  try {
    const response = await fetch(`${BASE_URL}/nurse/${nurseId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching nurse:', error);
    throw error;
  }
}

const getPatient = async (patientId: Number) => {
  try {
    const response = await fetch(`${BASE_URL}/patient/${patientId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching patient:', error);
    throw error;
  }
};

const createPatient = async (patientData: any) => {
  try {
     const response = await fetch(`${BASE_URL}/patient`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(patientData),
     });
     if (!response.ok) {
       throw new Error('Network response was not ok');
     }
     const data = await response.json();
     return data;
  } catch (error) {
     console.error('Error creating patient:', error);
     throw error;
  }
 };

 const updatePatient = async (patientId: number, patientData: any) => {
  try {
    // convert age, assignedroomnumber and bednumber to string
    patientData.Age = patientData.Age.toString();
    patientData.AssignedRoomNumber = patientData.AssignedRoomNumber.toString();
    patientData.BedNumber = patientData.BedNumber.toString();

    console.log('updatePatientupdatePatient nurse name: ', patientData.NurseName);

    // get physician id from physician name
    const PhysicianInCharge = await DoctorsCRUD.getDoctorIdFromName(patientData.PhysicianName);
    
    // get nurse id from nurse name
    const NurseProfileID = await NursesCRUD.getNurseIdFromName(patientData.NurseName);

    console.log('updatePatientupdatePatient nurse id: ', NurseProfileID);

    console.log('PatientsCRUD updatePatient PhysicianInCharge: ', PhysicianInCharge.ProfileID);
    console.log('PatientsCRUD updatePatient NurseProfileID: ', NurseProfileID);

    // assign physician id and nurse id to patientData
    patientData.PhysicianInCharge = PhysicianInCharge.ProfileID;
    patientData.NurseProfileID = NurseProfileID;

    // convert outpatientadmissionstatus to boolean
    patientData.OutpatientAdmissionStatus = patientData.OutpatientAdmissionStatus === 'true' ? true : false;

    console.log('patientData on patientscrud to be sent: ', patientData);

    const response = await fetch(`${BASE_URL}/patient/${patientId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patientData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('response returned on patientscrud: ', data);
    return data;
  } catch (error) {
     console.error('Error updating patient:', error);
     throw error;
  }
 };

 const deletePatient = async (id: number) => {
  try {
     const response = await fetch(`${BASE_URL}/patient/${id}`, {
       method: 'DELETE',
     });
     if (!response.ok) {
       throw new Error('Network response was not ok');
     }
     return response.json();
  } catch (error) {
     console.error('Error deleting patient:', error);
     throw error;
  }
 };

const PatientsCRUD = {
  getPhysicianName,
  getAllPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
  getNurseName,
};

export default PatientsCRUD;