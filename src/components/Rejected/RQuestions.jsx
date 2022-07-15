import {
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Image,
  Spacer,
} from '@chakra-ui/react';
import React from 'react';
import { MdClear } from 'react-icons/md';

const RQuestions = ({
  question,
  option1,
  option2,
  option3,
  option4,
  answer,
  standard,
  subject,
  chapter,
  difficulty,
  imageurl,
  alt,
}) => (
  <Flex>
    <Accordion allowMultiple w='full'>
      {/* allowMultiple */}
      <AccordionItem>
        <h2>
          <AccordionButton
            borderRadius='15px'
            _expanded={{
              color: 'white',
              bg: '#c3d0f9',
              marginTop: '20px',
              borderTopRadius: '15px',
              borderBottomRadius: '0px',
            }}
          >
            <Flex flex='1' textAlign='left' align='center' p='2'>
              <Flex
                height='30px'
                width='30px'
                align='center'
                bgColor='#ce0202'
                justifyContent='center'
                borderRadius='30px'
                borderBottomRightRadius='0'
                color='white'
              >
                <MdClear />
              </Flex>
              <Flex flexDir='column' ml='3'>
                <Flex color='black' fontSize='18px' fontWeight='600'>
                  {question}
                </Flex>
                <Flex color='gray' fontSize='13px' fontWeight='400'>
                  Class {standard}&emsp;•&emsp;{subject}&emsp;•&emsp;{chapter}
                  &emsp;•&emsp;
                  <span color='red'>{difficulty}</span>
                </Flex>
              </Flex>
            </Flex>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel
          pb={4}
          bgColor='brand.200'
          borderBottomRadius='15px'
          mb='20px'
        >
          <Flex flexDir='row' width='100%' ml='60px'>
            <Flex
              width='70%'
              fontSize='18px'
              fontWeight='500'
              lineHeight='40px'
            >
              <ol type='i'>
                <li>{option1}</li>
                <li>{option2}</li>
                <li>{option3}</li>
                <li>{option4}</li>
              </ol>
            </Flex>
            <Flex
              justifyContent='flex-end'
              display={imageurl !== '' ? 'flex' : 'none'}
            >
              {/* <Avatar maxHeight='200px' maxWidth='400px' objectFit='cover' /> */}
              <Image
                maxHeight='200px'
                maxWidth='400px'
                objectFit='cover'
                src={imageurl}
                alt={alt}
              />
            </Flex>
          </Flex>
          <br />
          <Flex flexDir='row' ml='60px'>
            <Flex color='green' fontSize='18px' fontWeight='600'>
              Answer : {answer}
            </Flex>
            <Spacer />
            <Flex>
              <Button variant='accept' ml='4' mr='100px'>
                Accept
              </Button>
            </Flex>
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  </Flex>
);

export default RQuestions;
