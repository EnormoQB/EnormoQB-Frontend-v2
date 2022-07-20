import { Flex } from '@chakra-ui/react';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { BsFileEarmarkCheck, BsXSquare } from 'react-icons/bs';
import { MdOutlinePendingActions } from 'react-icons/md';
import Cards from '../../components/Stats/cards';

const DashboardHome = () => {
  return (
    <Flex flexDir='row' alignItems='center' justifyContent='space-between'>
      <Cards
        background='brand.600'
        number='170'
        comment='Contributed Questions'
        iconColor='blue.100'
        iconUsed={<HiOutlineDocumentText fontSize='2rem' />}
      />
      <Cards
        background='white'
        number='120'
        comment='Pending Questions'
        iconColor='blue.200'
        iconUsed={<MdOutlinePendingActions fontSize='2rem' />}
      />
      <Cards
        background='white'
        number='180'
        comment='Accepted Questions'
        iconColor='blue.300'
        iconUsed={<BsFileEarmarkCheck fontSize='2rem' />}
      />
      <Cards
        background='white'
        number='150'
        comment='Rejected Questions'
        iconColor='blue.400'
        iconUsed={<BsXSquare fontSize='2rem' />}
      />
    </Flex>
  );
};

export default DashboardHome;
