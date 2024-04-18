import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

const getAllADPIE = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/adpie`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch ADPIE:', error);
    throw error;
  }
}

const getADPIE = async (patientId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/adpie/${patientId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch ADPIE:', error);
    throw error;
  }
};

const createADPIE = async (data: any) => {
  try {
     const response = await axios.post(`${BASE_URL}/adpie`, { ...data });
     return response.data;
  } catch (error) {
     console.error('Failed to create ADPIE:', error);
     throw error;
  }
 };

const updateADPIE = async (adpieId: number, data: any) => {
    try {
      const response = await axios.put(`${BASE_URL}/adpie/${adpieId}`, data);
      return response.data;
    } catch (error) {
      console.error('Failed to update ADPIE:', error);
      throw error;
    }
 };

const deleteADPIE = async (adpieId: number) => {
  try {
    await axios.delete(`${BASE_URL}/adpie/${adpieId}`);
  } catch (error) {
    console.error('Failed to delete ADPIE:', error);
    throw error;
  }
};

const ADPIECRUD = {
  getAllADPIE,
  getADPIE,
  createADPIE,
  updateADPIE,
  deleteADPIE,
};

export default ADPIECRUD;