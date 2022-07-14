import { Button, Flex, Box, Image } from '@chakra-ui/react';
import HeroImg from '../../assets/landing.svg';

const Hero = () => (
  <Flex mx='52' my='6' justifyContent='space-between'>
    <Flex flexDirection='column' w='40%'>
      <Box fontSize='4xl' fontWeight='bold' mt='10'>
        Setting Question Papers.
        <span className='highlight'> Simplified.</span>
      </Box>
      <Flex fontSize='xl' mt='20'>
        Contribute board questions anonymously and generate question papers with
        a variety of customizations.
      </Flex>
      <Button w='50%' mt='20'>
        Login with Google
      </Button>
    </Flex>
    <Image src={HeroImg} alt='Logo' w='50%' />
  </Flex>
);

export default Hero;
