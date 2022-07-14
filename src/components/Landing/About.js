import { Flex, Box, Image, Circle } from '@chakra-ui/react';
import SampleDashboard from '../../assets/sample.png';
import NextGIF from '../../assets/next2.gif';

const About = ({ aboutRef }) => (
  <Flex flexDirection='column' alignItems='center' ref={aboutRef}>
    <Flex
      flexDirection='column'
      alignItems='center'
      bgColor='brand.600'
      className='slanted'
      h='4xl'
    >
      <Image src={NextGIF} w='6%' mt='24' borderRadius='100%' />
      <Box fontSize='2xl' fontWeight='bold' color='brand.100' my='4'>
        About Us
      </Box>
      <Box color='brand.200' w='40%' textAlign='center' mb='6' fontSize='lg'>
        <span className='highlightSecond'>EnormoQB</span> is a crowdsourced
        question bank of over 5000+ objective type board questions. You can
        anonymously contribute questions here and also generate numerous
        question papers with the ease of just one-click. We target to bring
        together unique and quality questions while challenging the traditional
        paper setting systems by automating the whole process.
      </Box>
    </Flex>

    <Flex
      flexDirection='column'
      width='50%'
      bgColor='blue.100'
      borderRadius='lg'
      position='absolute'
      bottom='-40'
    >
      <Flex p='4'>
        <Circle size='4' bgColor='brand.300' mx='1' />
        <Circle size='4' bgColor='brand.300' mx='1' />
        <Circle size='4' bgColor='brand.300' mx='1' />
      </Flex>
      <Image src={SampleDashboard} alt='Sample Dashboard' />
    </Flex>
  </Flex>
);

export default About;
