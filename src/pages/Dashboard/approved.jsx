import { Box, Heading } from '@chakra-ui/react';
import Question from '../../components/Accordion';
import { dummy } from '../../components/Generate/config';
import Filter from '../../components/Filters';

const Approved = () => {
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
          Approved
        </mark>
        Questions
      </Heading>
      <Filter />
      {dummy.map((ques) => (
        <Question key={ques._id.$oid} data={ques} />
      ))}
    </Box>
  );
};

export default Approved;
