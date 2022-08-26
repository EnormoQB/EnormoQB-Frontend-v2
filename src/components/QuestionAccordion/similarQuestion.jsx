import { Box, Checkbox, Flex, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { titleCase } from '../../utils/helpers';

const SimilarQuestion = ({ data, isSimilarQues, setCheckedIds, index }) => {
  const [quesSelected, setQuesSelected] = useState(false);

  useEffect(() => {
    setCheckedIds((prev) => ({ ...prev, [index]: quesSelected }));
  }, [quesSelected]);

  return (
    <Flex
      px='6'
      py='4'
      my='3'
      borderRadius='10'
      bg='brand.100'
      boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
      role='group'
      justify='space-between'
      alignItems='flex-start'
      onClick={(e) => {
        setQuesSelected((prev) => !prev);
      }}
      cursor='pointer'
    >
      <Box>
        <Text as='h3' fontWeight='semibold' fontSize='17px' mr='2'>
          {`Q. ${data.question}`}
        </Text>
        <Flex wrap='wrap' mt='2.5'>
          {data.options.map((option, idx) => (
            <Text key={option} as='p' mr='2' mb='2' w='45%'>
              {`${String.fromCharCode(idx + 65)}. ${option}`}
            </Text>
          ))}
        </Flex>
      </Box>
      {isSimilarQues ? (
        <Box bg='brand.400' borderRadius='5' px='2.5' py='1.5'>
          {titleCase(data.status)}
        </Box>
      ) : (
        <Checkbox
          isChecked={quesSelected}
          onChange={(e) => setQuesSelected(!e.target.checked)}
          _checked={{}}
        />
      )}
    </Flex>
  );
};

export default SimilarQuestion;

SimilarQuestion.defaultProps = {
  isSimilarQues: true,
};
