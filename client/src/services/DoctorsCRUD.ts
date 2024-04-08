const BASE_URL = process.env.REACT_APP_API_URL;

const getAllDoctors = async () => {
  try {
    const response = await fetch(`${BASE_URL}/doctor`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};

const getDoctor = async () => {};

const updateDoctor = async () => {};

const DoctorsCRUD = {
  getAllDoctors,
  getDoctor,
  updateDoctor,
};

export default DoctorsCRUD;