import { Flex } from '@chakra-ui/react';
import Cards from '../../components/Stats/cards';
// eslint-disable-next-line import/order
import { HiOutlineDocumentText } from 'react-icons/hi';

const DashboardHome = () => {
  return (
    <Flex
      flexDir='row'
      h='300px'
      w='full'
      alignItems='center'
      justifyContent='space-around'
    >
      <Cards
        background='black'
        color='white'
        number='120'
        comment='Pending Questions'
        iconcolor='gray'
        iconused={<HiOutlineDocumentText fontSize='2rem' />}
      />
      <Cards
        background='white'
        color='black'
        number='180'
        comment='Accepted Questions'
        iconcolor='pink'
        iconused={<HiOutlineDocumentText fontSize='2rem' />}
      />
      <Cards
        background='white'
        color='black'
        number='150'
        comment='Rejected Questions'
        iconcolor='#a9fcc4'
        iconused={<HiOutlineDocumentText fontSize='2rem' />}
      />
      <Cards
        background='white'
        color='black'
        number='170'
        comment='Generated Papers'
        iconcolor='#a9d2fc'
        iconused={<HiOutlineDocumentText fontSize='2rem' />}
      />
    </Flex>
  );
};

export default DashboardHome;
