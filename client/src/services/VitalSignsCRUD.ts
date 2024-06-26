import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

const getVitalSigns = async () => {
  try {
    console.log('getVitalSigns CRUD runs');
    const response = await axios.get(`${BASE_URL}/vitalsigns`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch Vital Signs:', error);
    throw error;
  }
};

const getVitalSign = async (vitalSignsId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/vitalsigns/${vitalSignsId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch Vital Signs:', error);
    throw error;
  }
}

const createVitalSigns = async (data: any) => {
  try {
    // convert temp to number
    data.Temperature = parseFloat(data.Temperature);
    // convert pulse rate to number
    data.PulseRate = parseFloat(data.PulseRate);
    // convert oxygen saturation to number
    data.OxygenSaturation = parseFloat(data.OxygenSaturation);
    // convert pain scale to number
    data.PainScale = parseFloat(data.PainScale);
    console.log('createVitalSigns CRUD sends data to api: ', data)
    const response = await axios.post(`${BASE_URL}/vitalsigns`, data);
    return response.data;
  } catch (error) {
    console.error('Failed to create Vital Signs:', error);
    throw error;
  }
};

const updateVitalSigns = async (vitalSignsId: number, data: any) => {
  try {
    const response = await axios.patch(`${BASE_URL}/vitalsigns/${vitalSignsId}`, data);
    return response.data;
  } catch (error) {
    console.error('Failed to update Vital Signs:', error);
    throw error;
  }
};

const deleteVitalSigns = async (vitalSignsId: number) => {
  try {
    await axios.delete(`${BASE_URL}/vitalsigns/${vitalSignsId}`);
  } catch (error) {
    console.error('Failed to delete Vital Signs:', error);
    throw error;
  }
};

const VitalSignsCRUD = {
  getVitalSign,
  getVitalSigns,
  createVitalSigns,
  updateVitalSigns,
  deleteVitalSigns,
};

export default VitalSignsCRUD;