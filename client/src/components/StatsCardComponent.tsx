import {
  Box,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface StatsCardProps {
  title: string
  stat: string
  icon: ReactNode
}

const StatsCard = (props: StatsCardProps) => {
  const { title, stat, icon } = props
  return (
    <Stat
      p={'5'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}
      bg={useColorModeValue('white', 'gray.700')}
    >
      <Flex justifyContent={'space-between'} columnGap={10}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel color={'gray.600'} fontSize={'large'} fontWeight={'medium'} isTruncated>
            {title}
          </StatLabel>
          <StatNumber color={'#345673'} fontSize={'3xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default StatsCard;