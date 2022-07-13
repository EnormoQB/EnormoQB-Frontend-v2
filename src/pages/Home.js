import { Button, Flex, Image, Box } from '@chakra-ui/react';
import NavBar from '../components/Navbar';
import TopBorder from '../components/TopBorder';
import '../styles/Home/index.scss';

const Hero = () => (
  <Flex mx='52' justifyContent='space-between'>
    <Flex flexDirection='column' w='40%'>
      <Box fontSize='4xl' fontWeight='bold' mt='10'>
        Setting Question Papers.
        <span className='highlight'> Simplified.</span>
      </Box>
      <Flex fontSize='xl' mt='20'>
        Contribute board questions anonymously and generate question papers with a variety of
        customizations.
      </Flex>
      <Button w='50%' mt='20'>
        Login with Google
      </Button>
    </Flex>
    <Image src='/assets/landing.svg' alt='Logo' w='50%' />
  </Flex>
);

const Home = () => (
  <Flex flexDirection='column' bg='brand.100' h='100%'>
    <TopBorder />
    <NavBar />
    <Hero />
    <Image mx='10%' src='/assets/sample.png' alt='Sample Dashboard' />
  </Flex>
);

export default Home;
