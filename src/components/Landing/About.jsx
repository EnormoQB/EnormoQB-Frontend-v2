import { Flex, Box, Image, Circle } from '@chakra-ui/react';
import Contribute from '../../assets/Contribute.png';
import NextGIF from '../../assets/next2.gif';

const About = ({ aboutRef }) => (
  <Flex
    flexDirection='column'
    alignItems='center'
    ref={aboutRef}
    pos='relative'
    mt={['8', null]}
  >
    <Flex
      flexDirection='column'
      alignItems='center'
      bgColor='brand.600'
      className='slanted'
      h={['xl', '2xl', '3xl', '4xl']}
    >
      <Image
        src={NextGIF}
        w={['12%', '12%', '6%']}
        mt={['14', '16', '24']}
        borderRadius='100%'
      />
      <Box
        fontSize={['xl', 'xl', '2xl']}
        fontWeight='bold'
        color='brand.100'
        my='4'
      >
        About Us
      </Box>
      <Box
        color='brand.200'
        w={['80%', '80%', '60%', '60%', '40%']}
        textAlign='center'
        mb='6'
        fontSize={['sm', 'md', 'lg']}
      >
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
      width={['80%', '80%', '60%', '60%', '60%']}
      bgColor='blue.100'
      borderRadius='lg'
      position='absolute'
      top={['25rem', '28rem', '30rem']}
      px='6'
      pb='6'
    >
      <Flex p={['2', '2', '4']}>
        <Circle size={['3', '3', '4']} bgColor='brand.300' mx='1' />
        <Circle size={['3', '3', '4']} bgColor='brand.300' mx='1' />
        <Circle size={['3', '3', '4']} bgColor='brand.300' mx='1' />
      </Flex>
      <Image src={Contribute} alt='Sample Dashboard' borderRadius='10' />
    </Flex>
  </Flex>
);

export default About;
