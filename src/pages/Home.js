import { Button, Flex, Image, Box } from '@chakra-ui/react';
import NavBar from '../components/Navbar';
import TopBorder from '../components/TopBorder';
import LandingIllustration from '../assets/landing.svg';
import SampleDashboard from '../assets/sample.png';
// import LoginIllustration from '../assets/login.svg';
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
    <Image src={LandingIllustration} alt='Logo' w='50%' />
  </Flex>
);

// const ProcessBlock = ({ flexD, imageSrc, animatedHead, nonAnimatedHead, content }) => (
//   <Flex flexDirection='column' alignItems='center' color='brand.600'>
//     <Flex mt='14' w='80%' flexDirection={flexD}>
//       <Image src={imageSrc} alt='Login Illustration' w='50%' p='10' />
//       <Flex flexDirection='column' justifyContent='center' w='50%' p='10'>
//         <Box fontSize='2xl' fontWeight='bold'>
//           <span className='highlight'>{animatedHead}</span>
//           {nonAnimatedHead}
//         </Box>
//         <Box fontSize='lg' mt='8'>
//           {content}
//         </Box>
//       </Flex>
//     </Flex>
//   </Flex>
// );

const Home = () => (
  <Flex flexDirection='column' bg='brand.100' h='100%'>
    <TopBorder />
    <NavBar />
    <Hero />
    <Image mx='10%' src={SampleDashboard} alt='Sample Dashboard' />
    <Flex flexDirection='column' alignItems='center' color='brand.600'>
      {/* <ProcessBlock
        flexD='row'
        imageSrc={LoginIllustration}
        animatedHead='Sign in'
        nonAnimatedHead='to your free account'
        content='All you need is your gmail address to create an account/sign in.Lorem ipsum dolor sit
          amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.'
      /> */}
    </Flex>
  </Flex>
);

export default Home;
