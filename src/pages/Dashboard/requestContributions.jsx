import { useEffect, useState } from 'react';
import { Box, Flex, Heading, useToast } from '@chakra-ui/react';
import SendMailCard from '../../components/RequestContributions/sendMailCard';
import QuesPapersFilter from '../../components/Filters/quesPapersFilter';
import { useQuestionsPerTopicQuery } from '../../redux/services/questionApi';
import DashboardLoader from '../../components/Loaders/DashboardLoader';
import { getToast } from '../../utils/helpers';

const minQues = 10;

const RequestContributions = () => {
  const toast = useToast();
  const [topicData, setTopicData] = useState([]);
  const [filter, setFilter] = useState({ standard: '10', subject: 'English' });
  const { data, isLoading, isFetching } = useQuestionsPerTopicQuery(filter);

  useEffect(() => {
    if (data) {
      setTopicData(data.data);
    }
  }, [data]);

  const validateApply = (standard, subject) => {
    if (standard === '' || subject === '') {
      if (!toast.isActive('general')) {
        toast(
          getToast({
            status: 'error',
            description: 'Please choose standard and subject!',
            title: 'Error',
          }),
        );
      }
      return false;
    }
    return true;
  };

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
      <QuesPapersFilter
        setFilter={setFilter}
        filter={filter}
        showBoard={0}
        validateApply={validateApply}
        noClear
      />
      {topicData.length === 0 || isLoading || isFetching ? (
        <DashboardLoader />
      ) : (
        <Flex wrap='wrap' justify='space-between'>
          {topicData.map((item, idx) => (
            <SendMailCard
              key={`${item.subject}${item.topic}${idx}`}
              needContributions={minQues >= item.count}
              topic={item.topic}
              quesCount={item.count}
              subject={item.subject}
              standard={item.standard}
            />
          ))}
          {[...Array(4 - (topicData.length % 4)).keys()].map(() => (
            <Box key={Math.random() * 100000} w='24%' h='3' />
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default RequestContributions;
