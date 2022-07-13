import { Button, Flex, Image, Box, Circle } from '@chakra-ui/react';
import TopBorder from '../components/TopBorder';
import NavBar from '../components/Landing/Navbar';
import Hero from '../components/Landing/Hero';
import ProcessBlock from '../components/Landing/ProcessBlock';
import About from '../components/Landing/About';
import '../styles/Home/index.scss';

const Home = () => (
  <Flex flexDirection='column' bg='brand.100' h='100%'>
    <TopBorder borderH='0.5rem' />
    <NavBar />
    <Hero />
    <Image mx='32' src='/assets/sample.png' alt='Sample Dashboard' />
    {/* Process Flow */}
    <Flex flexDirection='column' alignItems='center' color='brand.600'>
      <ProcessBlock
        flexD='row'
        imageSrc='/assets/login.svg'
        animatedHead='Sign in'
        nonAnimatedHead=' to your free account'
        content='All you need is your gmail address to create an account/sign in. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.'
      />
      <ProcessBlock
        flexD='row-reverse'
        imageSrc='/assets/postQuestions.svg'
        animatedHead='Post questions'
        nonAnimatedHead=' for review'
        content='You can now add questions to our bank based on various filters provided. Wait for the reviewing committee to approve it. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.'
      />
      <ProcessBlock
        flexD='row'
        imageSrc='/assets/generatePaper.svg'
        animatedHead='Generate'
        nonAnimatedHead=' question papers'
        content='Select the necessary filters and get a downloadable pdf of the randomly set exam paper. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.'
      />
    </Flex>
    <About />
  </Flex>
);

export default Home;
