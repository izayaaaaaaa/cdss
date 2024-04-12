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

const getAvailableNurses = async () => {
  try {
    const response = await fetch(`${BASE_URL}/nurse/available`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching available nurses:', error);
    throw error;
  }
};

const updateNurse = async (id: number, payload: any) => {
  console.log('updateNurse service id: ', id);
  console.log('updateNurse service payload: ', payload);

  // convert availability to boolean
  if (payload.availability.tolowerCase === 'true') {
    payload.availability = true;
  } else {
    payload.availability = false;
  }

  // convert number strings to numbers
  if (payload.age) {
    payload.age = parseInt(payload.age);
  }

  try {
     const response = await fetch(`${BASE_URL}/nurse/${id}`, {
       method: 'PATCH',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(payload),
     });
 
     if (!response.ok) {
       throw new Error('Network response was not ok');
     }
 
     const data = await response.json();
     return data;
  } catch (error) {
     console.error('Error updating doctor:', error);
     throw error;
  }
};

const deleteNurse = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/nurse/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting nurse:', error);
    throw error;
  }
};

const NursesCRUD = {
  getAllNurses,
  updateNurse,
  deleteNurse,
  getAvailableNurses,
};

export default NursesCRUD;