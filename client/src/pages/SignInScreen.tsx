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

      const response = await SignInService.signIn(values.licenseNo, values.password);
      
      console.log('handleSubmit signin successful');
      console.log('data sent back: ', response);

      localStorage.setItem('user_id', response.user_id);

      navigate('/dashboard');
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
      backgroundSize={'cover'}
      backgroundRepeat={'no-repeat'}
      backgroundPosition={'center'}
    >
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}
      >
        <Stack spacing={4}>
          <Image src={hospital_logo} alt='hospital_logo' boxSize={'175px'} alignSelf={'center'} />
          <Heading fontSize={'3xl'} color="#345673" mb={10}>Apex Medical Center </Heading>
          <Heading fontSize={'xl'} color="#345673" mb={-3}>Sign in </Heading>
          <Text fontSize={'m'} color={'gray.600'}> Please sign in to your account </Text>
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
                  bg={'#345673'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type='submit'
                  isLoading={isSubmitting}
                  w="full"
                  mt={7}
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