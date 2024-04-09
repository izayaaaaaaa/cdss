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

const getPatient = async () => {};

const createPatient = async () => {};

const updatePatient = async () => {};

const deletePatient = async () => {};

const PatientsCRUD = {
  getPhysicianName,
  getAllPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
};

export default PatientsCRUD;