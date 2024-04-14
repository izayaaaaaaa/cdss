import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

const createAssessment = async (dto: any, ADPIEID: number) => {
 try {
    const response = await axios.post(`${BASE_URL}/assessment`, dto, {
      params: { ADPIEID },
    });
    return response.data;
 } catch (error) {
    console.error('Failed to create assessment:', error);
    throw error;
 }
};

const findAllAssessments = async () => {
 try {
    const response = await axios.get(`${BASE_URL}/assessment`);
    return response.data;
 } catch (error) {
    console.error('Failed to fetch all assessments:', error);
    throw error;
 }
};

const findOneAssessment = async (id: number) => {
 try {
    const response = await axios.get(`${BASE_URL}/assessment/${id}`);
    return response.data;
 } catch (error) {
    console.error(`Failed to fetch assessment with ID ${id}:`, error);
    throw error;
 }
};

const updateAssessment = async (id: number, dto: any) => {
 try {
    const response = await axios.patch(`${BASE_URL}/assessment/${id}`, dto);
    return response.data;
 } catch (error) {
    console.error(`Failed to update assessment with ID ${id}:`, error);
    throw error;
 }
};

const removeAssessment = async (id: number) => {
 try {
    await axios.delete(`${BASE_URL}/assessment/${id}`);
 } catch (error) {
    console.error(`Failed to delete assessment with ID ${id}:`, error);
    throw error;
 }
};

const AssessmentsCRUD = {
 createAssessment,
 findAllAssessments,
 findOneAssessment,
 updateAssessment,
 removeAssessment,
};

export default AssessmentsCRUD;