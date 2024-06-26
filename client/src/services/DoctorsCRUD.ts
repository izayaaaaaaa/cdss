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

const getAvailableDoctors = async () => {
  try {
    const response = await fetch(`${BASE_URL}/doctor/available`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching available doctors:', error);
    throw error;
  }
};

const updateDoctor = async (id: number, payload: any) => {
  console.log('updateDoctorCRUD id: ', id);
  console.log('updateDoctorCRUD payload: ', payload);

  // convert availability to boolean
  // if (payload.availability.tolowerCase === 'true') {
  //   payload.availability = true;
  // } else {
  //   payload.availability = false;
  // }

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

 const deleteDoctor = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/doctor/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting doctor:', error);
    throw error;
  }
 };

 const getDoctorIdFromName = async (name: string) => {
  try {
    console.log('getDoctorIdFromName name: ', name);
    const response = await fetch(`${BASE_URL}/doctor/name/${name}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('getDoctorIdFromName data: ', data)
    return data;
  } catch (error) {
    console.error('Error fetching doctor id from name:', error);
    throw error;
  }
 };

const DoctorsCRUD = {
  getDoctorIdFromName,
  getAllDoctors,
  updateDoctor,
  deleteDoctor,
  getAvailableDoctors,
};

export default DoctorsCRUD;