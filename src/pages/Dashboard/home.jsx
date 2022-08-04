import { useEffect } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { BsFileEarmarkCheck, BsXSquare } from 'react-icons/bs';
import { MdOutlinePendingActions } from 'react-icons/md';
import Cards from '../../components/Stats/cards';
import LineGraph from '../../components/Graph/LineGraph';
import DoughnutGraph from '../../components/Graph/DoughnutGraph';
import Question from '../../components/Accordion';
import { dummy } from '../../components/Generate/config';
import Filter from '../../components/Filters';
import { useGetStatsQuery } from '../../redux/services/statsApi';
import DashboardLoader from '../../components/Loaders/DashboardLoader';

const DashboardHome = () => {
  const { data, isLoading, isFetching } = useGetStatsQuery();
  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return isLoading || isFetching || !data ? (
    <DashboardLoader />
  ) : (
    <div>
      <Flex flexDir='row' alignItems='center' justifyContent='space-between'>
        <Cards
          background='brand.600'
          number={data.data.total}
          comment='Contributed Questions'
          iconColor='blue.100'
          iconUsed={<HiOutlineDocumentText fontSize='2rem' />}
        />
        <Cards
          background='brand.100'
          number={data.data.pending}
          comment='Pending Questions'
          iconColor='blue.200'
          iconUsed={<MdOutlinePendingActions fontSize='2rem' />}
        />
        <Cards
          background='brand.100'
          number={data.data.approved}
          comment='Accepted Questions'
          iconColor='blue.300'
          iconUsed={<BsFileEarmarkCheck fontSize='2rem' />}
        />
        <Cards
          background='brand.100'
          number={data.data.rejected}
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
          <LineGraph
            dateData={data.data.contribute}
            monthData={data.data.month}
          />
        </Box>
        <Box
          boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
          p='6'
          borderRadius='10'
        >
          <DoughnutGraph />
        </Box>
      </Flex>
      <Box mt={12}>
        <Heading as='h2' fontSize='3xl' fontWeight='bold' mb={10}>
          Question
          <mark
            style={{
              backgroundColor: '#C3D0F9',
              borderRadius: '25px',
              padding: '0 12px 2px 12px',
              marginLeft: '3px',
            }}
          >
            Bank
          </mark>
        </Heading>
        <Filter />
        {dummy.map((ques) => (
          <Question key={ques._id.$oid} data={ques} />
        ))}
      </Box>
    </div>
  );
};

export default DashboardHome;
