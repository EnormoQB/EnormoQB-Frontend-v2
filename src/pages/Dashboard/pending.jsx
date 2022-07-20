import { Box } from '@chakra-ui/react';
import Question from '../../components/Accordion';
import { dummy } from '../../components/Generate/config';

const Pending = () => {
  return (
    <Box>
      {dummy.map((ques) => (
        // eslint-disable-next-line no-underscore-dangle
        <Question key={ques._id.$oid} data={ques} />
      ))}
    </Box>
  );
};

export default Pending;
