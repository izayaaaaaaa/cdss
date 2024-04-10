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

const updateDoctor = async (id: number, payload: any) => {
  console.log('updateDoctor service id: ', id);
  console.log('updateDoctor service payload: ', payload);

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
     const response = await fetch(`${BASE_URL}/doctor/${id}`, {
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

const DoctorsCRUD = {
  getAllDoctors,
  getDoctor,
  updateDoctor,
};

export default DoctorsCRUD;