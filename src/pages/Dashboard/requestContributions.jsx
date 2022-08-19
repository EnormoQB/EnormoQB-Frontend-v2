import { Box, Flex, Heading } from '@chakra-ui/react';
import SendMailCard from '../../components/RequestContributions/sendMailCard';
import QuesPapersFilter from '../../components/Filters/quesPapersFilter';
import dummy from '../../components/RequestContributions/config';

const RequestContributions = () => {
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
      <QuesPapersFilter />
      <Flex justifyContent='space-evenly' wrap='wrap'>
        {dummy.map((data) => (
          <SendMailCard
            key={data.id}
            needContributions={data.needContributions}
            topicName={data.topicName}
            quesCount={data.quesCount}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default RequestContributions;
