import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

const SignInService = {
 signIn: async (licenseNo: string, password: string) => {
    try {
      console.log('SignInService Signing in: ');
      console.log(licenseNo, password);

      console.log('SignInService BASE_URL:', process.env.REACT_APP_API_URL);

      const response = await axios.post(`${BASE_URL}/auth/login`, {
        LicenseNo: licenseNo,
        Password: password,
      });

      if (response.status === 200) {
        console.log('SignInService Sign-in successful:', response.data);
        return response.data;
      } else {
        throw new Error('SignInService Sign-in failed');
      }
    } catch (error) {
      console.error('SignInService Error signing in:', error);
      throw error;
    }
 },
};

export default SignInService;