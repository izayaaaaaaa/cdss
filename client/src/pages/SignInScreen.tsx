import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Image
} from '@chakra-ui/react'
import { 
  Formik, 
  Form, 
  FormikErrors, 
  FormikHelpers, 
  Field, 
  ErrorMessage 
} from 'formik';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/images/signin_bg.png';
import hospital_logo from '../assets/images/hospital_logo.png';
import { SignInService } from '../services';

const SignIn = () => {
  const navigate = useNavigate();

  const initialValues = {
    licenseNo: '',
    password: '',
  };

  const validate = (values: any) => {
    const errors: FormikErrors<any> = {};
    if (!values.licenseNo) {
      errors.licenseNo = 'Required';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    return errors;
 };

  const handleSubmit = async (values: any, { setSubmitting }: FormikHelpers<any>) => {
    try {
      console.log('handleSubmit Submitting values: ');
      console.log(values);

      const userData = await SignInService.signIn(values.licenseNo, values.password);
      
      console.log('handleSubmit User data sent: ');
      console.log(userData);

      navigate('/employees');
    } catch (error) {
      console.error('handleSubmit Sign-in error:', error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      backgroundImage={`url(${backgroundImage})`}
    >
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}
      >
        <Stack spacing={4}>
          <Image src={hospital_logo} alt='hospital_logo' />
          <Heading fontSize={'4xl'}>Apex Medical Center </Heading>
          <Heading fontSize={'3xl'}>Sign in </Heading>
          <Text fontSize={'lg'} color={'gray.600'}> Please sign in to your account </Text>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <FormControl id='licenseNo'>
                  <FormLabel>License Number</FormLabel>
                  <Field as={Input} type='text' name='licenseNo' />
                  <ErrorMessage name='licenseNo' component={Box} />
                </FormControl>
                <FormControl id='password'>
                  <FormLabel>Password</FormLabel>
                  <Field as={Input} type='password' name='password' />
                  <ErrorMessage name='password' component={Box} />
                </FormControl>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type='submit'
                  isLoading={isSubmitting}
                >
                  Sign in
                </Button>
              </Form>
            )}
          </Formik>
        </Stack>
      </Box>
    </Flex>
  );
};
  
  export default SignIn;