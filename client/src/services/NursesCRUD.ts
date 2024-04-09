const BASE_URL = process.env.REACT_APP_API_URL;

const getAllNurses = async () => {
  try {
    const response = await fetch(`${BASE_URL}/nurse`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching nurses:', error);
    throw error;
  }
};

const getNurse = async () => {};

const createNurse = async () => {};

const updateNurse = async () => {};

const deleteNurse = async () => {};

const NursesCRUD = {
  getAllNurses,
  getNurse,
  createNurse,
  updateNurse,
  deleteNurse,
};

export default NursesCRUD;