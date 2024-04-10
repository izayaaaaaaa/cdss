import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  HStack,
  Image,
} from '@chakra-ui/react'
// import { FiMenu } from 'react-icons/fi'
import { IconType } from 'react-icons'
import { ReactText } from 'react'
import { Link } from 'react-router-dom'
import { 
  DashboardLogo, 
  EmployeesLogo, 
  PatientsLogo 
} from '../assets/images/sidebar'
import HospitalLogo from '../assets/images/hospital_logo.png'

interface LinkItemProps {
  name: string;
  icon: IconType;
  route: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Dashboard', icon: DashboardLogo, route: '/dashboard' },
  { name: 'Employees', icon: EmployeesLogo, route: '/employees' },
  { name: 'Patients', icon: PatientsLogo, route: '/patients' },
]

const SimpleSidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box 
      minH="100vh" 
      bg={useColorModeValue('white', 'gray.900')}
    >
      <SidebarContent 
        onClose={() => onClose} 
        display={{ base: 'none', md: 'block' }} 
      />
      
      {/* sidebar for hamburger */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      {/* <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} /> */}
      {/* <Box ml={{ base: 0, md: 60 }} p="4"> */}
        {/* Content */}
      {/* </Box> */}
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      h="full"
    >
      <Flex h="20" alignItems="center" mx="7" my="7" justifyContent="space-between">
        <HStack>
          <Image src={HospitalLogo} alt="hospital logo" boxSize='60px' />
          <Text fontSize={{ base: 'lg', md: '2xl' }} fontFamily={{ base: 'sans-serif', md: 'monospace' }} fontWeight="bold" color="#345673">
            Apex Medical Center
          </Text>
        </HStack>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {/* menu items */}
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} route={link.route} >
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
  route: string
  children: ReactText
}
const NavItem = ({ route, icon, children, ...rest }: NavItemProps) => {
  return (
    <Box
      as={Link}
      to={route}
      style={{ textDecoration: 'none', color: '#345673', fontSize: '1.2rem' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        py="2"
        px="5"
        mx="10"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: '#345673',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="1.2rem"
            _groupHover={{
              bg: '#345673',
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}

// interface MobileProps extends FlexProps {
//   onOpen: () => void
// }
// const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
//   return (
//     <Flex
//       ml={{ base: 0, md: 60 }}
//       px={{ base: 4, md: 24 }}
//       height="20"
//       alignItems="center"
//       bg={useColorModeValue('white', 'gray.900')}
//       borderBottomWidth="1px"
//       borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
//       justifyContent="flex-start"
//       {...rest}>
//       <IconButton
//         variant="outline"
//         onClick={onOpen}
//         aria-label="open menu"
//         icon={<FiMenu />}
//       />

//       <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
//         Logo
//       </Text>
//     </Flex>
//   )
// }

export { SimpleSidebar, SidebarContent }