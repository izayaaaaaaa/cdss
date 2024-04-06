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
import backgroundImage from '../assets/images/signin_bg.png';
import logo from '../assets/images/logo.png';

const SignIn = () => {
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
          <Image src={logo} alt='logo' />
          <Heading fontSize={'4xl'}>Apex Medical Center </Heading>
          <Heading fontSize={'3xl'}>Sign in </Heading>
          <Text fontSize={'lg'} color={'gray.600'}> Please sign in to your account </Text>
          <FormControl id='licenseNo'>
            <FormLabel>License Number</FormLabel>
            <Input type='licenseNo' />
          </FormControl>
          <FormControl id='password'>
            <FormLabel>Password</FormLabel>
            <Input type='password' />
          </FormControl>
          <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
            type='submit'
          >
            Sign in
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};
  
  export default SignIn;