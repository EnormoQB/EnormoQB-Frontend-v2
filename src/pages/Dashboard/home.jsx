import React, { useEffect, useState, useMemo } from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { BsFileEarmarkCheck, BsXSquare } from 'react-icons/bs';
import { MdOutlinePendingActions } from 'react-icons/md';
import { useSelector } from 'react-redux';
import Cards from '../../components/Stats/cards';
import LineGraph from '../../components/Graph/LineGraph';
import DoughnutGraph from '../../components/Graph/DoughnutGraph';
import Question from '../../components/QuestionAccordion';
import { useGetStatsQuery } from '../../redux/services/statsApi';
import DashboardLoader from '../../components/Loaders/DashboardLoader';
import { useReservedQuestionsQuery } from '../../redux/services/questionApi';
import { useGetSubjectsQuery } from '../../redux/services/subjectApi';
import NightImage from '../../assets/night-bg.jpg';
import MorningImage from '../../assets/sun-bg.jpg';

const weather = {
  night: {
    img: NightImage,
    position: 'center calc(50% - (50vh - 5vh))',
    color: 'brand.100',
  },
  day: {
    img: MorningImage,
    position: 'center calc(50% - (50vh - 5vh))',
    color: 'brand.600',
  },
};

const hour = new Date().getHours();

const DashboardHome = () => {
  const dayMode = useMemo(() => {
    // console.log(hour);
    if (hour > 18 || hour < 6) return 'night';
    return 'day';
  }, [hour]);
  const user = useSelector((state) => state.userState.user);
  const { data, isLoading, isFetching } = useGetStatsQuery();
  const { data: subdata } = useGetSubjectsQuery();

  const [stats, setStats] = useState(null);
  const {
    data: reservedData,
    isLoading: reservedIsLoading,
    isFetching: reservedIsFetching,
  } = useReservedQuestionsQuery();

  const [reservedDatastore, setreservedDatastore] = useState([]);

  useEffect(() => {
    if (data) {
      setStats(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (subdata) {
      //  All the Subjects and topics of each class
      // console.log(subdata.data);
    }
  }, [subdata]);

  useEffect(() => {
    if (reservedData) {
      setreservedDatastore(reservedData.data.reservedQuestions);
    }
  }, [reservedData]);

  return isLoading || isFetching || !stats ? (
    <DashboardLoader />
  ) : (
    <Box mx='-12' my='-8'>
      <Flex
        w='full'
        h='18vh'
        backgroundImage={`url('${weather[dayMode].img}')`}
        backgroundSize='cover'
        backgroundRepeat='no-repeat'
        backgroundAttachment='fixed'
        backgroundPosition={weather[dayMode].position}
        color={weather[dayMode].color}
        top='0'
        left='0'
        zIndex='-1'
        px='12'
        alignItems='center'
      >
        <Text as='h3' fontSize='26px' fontWeight='500' mt='-8'>
          Welcome {user ? user.username.split(' ')[0] : 'Guest'}!
        </Text>
      </Flex>
      <Box borderTopRadius='40' px='12' py='8' mt='-8' bg='brand.100'>
        <Flex flexDir='row' alignItems='center' justifyContent='space-between'>
          <Cards
            background='brand.600'
            number={stats.total}
            comment='Contributed Questions'
            iconColor='blue.100'
            iconUsed={<HiOutlineDocumentText fontSize='2rem' />}
          />
          <Cards
            background='brand.100'
            number={stats.pending}
            comment='Pending Questions'
            iconColor='blue.200'
            iconUsed={<MdOutlinePendingActions fontSize='2rem' />}
          />
          <Cards
            background='brand.100'
            number={stats.approved}
            comment='Accepted Questions'
            iconColor='blue.300'
            iconUsed={<BsFileEarmarkCheck fontSize='2rem' />}
          />
          <Cards
            background='brand.100'
            number={stats.rejected}
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
            <LineGraph contribution={stats.contribute} />
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
            Sample
            <mark
              style={{
                backgroundColor: '#C3D0F9',
                borderRadius: '25px',
                padding: '0 12px 2px 12px',
                marginLeft: '3px',
              }}
            >
              Question Bank
            </mark>
          </Heading>
          {reservedIsLoading ||
          reservedIsFetching ||
          reservedDatastore.length === 0 ? (
            <DashboardLoader />
          ) : (
            reservedDatastore.map((ques, index) => (
              <Question key={index} data={ques} />
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardHome;
