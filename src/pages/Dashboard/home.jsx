import { Flex } from '@chakra-ui/react';
// eslint-disable-next-line import/order
import { HiOutlineDocumentText } from 'react-icons/hi';
import { BsFileEarmarkCheck, BsXSquare } from 'react-icons/bs';
import { MdOutlinePendingActions } from 'react-icons/md';
import Cards from '../../components/Stats/cards';

const DashboardHome = () => {
  return (
    <Flex flexDir='row' alignItems='center' justifyContent='space-around'>
      <Cards
        background='brand.600'
        number='120'
        comment='Pending Questions'
        iconcolor='blue.100'
        iconused={<MdOutlinePendingActions fontSize='2rem' />}
      />
      <Cards
        background='white'
        number='180'
        comment='Accepted Questions'
        iconcolor='blue.200'
        iconused={<BsFileEarmarkCheck fontSize='2rem' />}
      />
      <Cards
        background='white'
        number='150'
        comment='Rejected Questions'
        iconcolor='blue.300'
        iconused={<BsXSquare fontSize='2rem' />}
      />
      <Cards
        background='white'
        number='170'
        comment='Generated Papers'
        iconcolor='blue.400'
        iconused={<HiOutlineDocumentText fontSize='2rem' />}
      />
    </Flex>
  );
};

export default DashboardHome;
