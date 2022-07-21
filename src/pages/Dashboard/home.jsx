import { Box, Flex } from '@chakra-ui/react';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { BsFileEarmarkCheck, BsXSquare } from 'react-icons/bs';
import { MdOutlinePendingActions } from 'react-icons/md';
import Cards from '../../components/Stats/cards';
import LineGraph from '../../components/Graph/LineGraph';
import DoughnutGraph from '../../components/Graph/DoughnutGraph';

const DashboardHome = () => {
  return (
    <div>
      <Flex flexDir='row' alignItems='center' justifyContent='space-between'>
        <Cards
          background='brand.600'
          number='170'
          comment='Contributed Questions'
          iconColor='blue.100'
          iconUsed={<HiOutlineDocumentText fontSize='2rem' />}
        />
        <Cards
          background='brand.100'
          number='120'
          comment='Pending Questions'
          iconColor='blue.200'
          iconUsed={<MdOutlinePendingActions fontSize='2rem' />}
        />
        <Cards
          background='brand.100'
          number='180'
          comment='Accepted Questions'
          iconColor='blue.300'
          iconUsed={<BsFileEarmarkCheck fontSize='2rem' />}
        />
        <Cards
          background='brand.100'
          number='150'
          comment='Rejected Questions'
          iconColor='blue.400'
          iconUsed={<BsXSquare fontSize='2rem' />}
        />
      </Flex>
      <Flex alignItems='stretch' justifyContent='space-between' mt='10'>
        <Box
          w='65%'
          boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
          p='6'
          borderRadius='10'
        >
          <LineGraph />
        </Box>
        <Box
          boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
          p='6'
          borderRadius='10'
        >
          <DoughnutGraph />
        </Box>
      </Flex>
    </div>
  );
};

export default DashboardHome;
