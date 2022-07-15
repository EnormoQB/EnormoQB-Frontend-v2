import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Text,
} from '@chakra-ui/react';

const CustomQuestion = () => {
  return (
    <Accordion my='2' mb='4' allowToggle>
      <AccordionItem border='0px'>
        <h2>
          <AccordionButton
            bg='brand.300'
            border='1px'
            borderColor='brand.300'
            borderRadius='5'
            _focus={{ border: '1px', borderColor: 'brand.400' }}
            _hover={{ backgroundColor: 'brand.400', borderColor: 'brand.400' }}
            _expanded={{
              backgroundColor: 'brand.400',
              borderColor: 'brand.400',
            }}
          >
            <Box flex='1' textAlign='left' fontWeight='500'>
              Add a Custom Question
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} borderBottom='1px' borderColor='brand.300'>
          <Box>
            <Text>
              Want to add a question of your choice? Here&apos;s how you can!
            </Text>
            <Button
              bg='brand.400'
              color='brand.600'
              _hover={{ backgroundColor: 'brand.600', color: 'brand.100' }}
              mt='3'
              size='sm'
            >
              Add
            </Button>
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default CustomQuestion;
