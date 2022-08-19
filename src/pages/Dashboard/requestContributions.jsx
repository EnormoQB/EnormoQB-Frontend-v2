import { useEffect, useState } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import SendMailCard from '../../components/RequestContributions/sendMailCard';
import QuesPapersFilter from '../../components/Filters/quesPapersFilter';
import { useQuestionsPerTopicQuery } from '../../redux/services/questionApi';
import DashboardLoader from '../../components/Loaders/DashboardLoader';

const RequestContributions = () => {
  const [topicData, setTopicData] = useState([]);
  const [filter, setFilter] = useState({ standard: '10', subject: 'Maths' });
  const { data, isLoading, isFetching } = useQuestionsPerTopicQuery(filter);
  const Minques = 10;
  useEffect(() => {
    if (data) {
      setTopicData(data.data);
    }
  }, [data]);

  return (
    <Box>
      <Heading as='h1' fontSize='4xl' fontWeight='bold' mb={10}>
        <mark
          style={{
            backgroundColor: '#C3D0F9',
            borderRadius: '25px',
            padding: '0 12px 2px 12px',
            marginRight: '3px',
          }}
        >
          Request
        </mark>
        Contributions
      </Heading>
      <QuesPapersFilter setFilter={setFilter} filter={filter} showBoard={0} />
      <Flex justifyContent='space-evenly' wrap='wrap'>
        {topicData.lenght === 0 || isLoading || isFetching ? (
          <DashboardLoader />
        ) : (
          topicData.map((eachtopicdata) => (
            <SendMailCard
              key={eachtopicdata.id}
              needContributions={Minques >= eachtopicdata.count ? 'Yes' : 'No'}
              topicName={eachtopicdata.topic}
              quesCount={eachtopicdata.count}
            />
          ))
        )}
      </Flex>
    </Box>
  );
};

export default RequestContributions;
