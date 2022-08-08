import { useCallback, useRef } from 'react';
import { Flex, Image } from '@chakra-ui/react';
import TopBorder from '../components/TopBorder';
import NavBar from '../components/Landing/Navbar';
import Hero from '../components/Landing/Hero';
import ProcessBlock from '../components/Landing/ProcessBlock';
import About from '../components/Landing/About';
import FutureScopeCard from '../components/Landing/FutureScopeCard';
import Footer from '../components/Landing/Footer';
import SampleDashboard from '../assets/sample.png';
import LoginImg from '../assets/login.svg';
import PostQuestionsImg from '../assets/postQuestions.svg';
import GenerateImg from '../assets/generatePaper.svg';

const Home = () => {
  const processRef = useRef(null);
  const aboutRef = useRef(null);
  const footerRef = useRef(null);

  const executeScroll = useCallback((ref) => {
    console.log('first');
    ref.current.scrollIntoView({ behavior: 'smooth' });
    console.log('second');
  }, []);

  return (
    <Flex flexDirection='column' bg='brand.100' h='100%'>
      <TopBorder borderH='0.5rem' />
      <NavBar
        executeProcessScroll={() => executeScroll(processRef)}
        executeAboutScroll={() => executeScroll(aboutRef)}
        executeFooterScroll={() => executeScroll(footerRef)}
      />
      <Hero />
      <Image
        mx={['4', '10', '16', '32']}
        src={SampleDashboard}
        alt='Sample Dashboard'
      />
      {/* Process Flow */}
      <Flex
        flexDirection='column'
        alignItems='center'
        color='brand.600'
        ref={processRef}
      >
        <ProcessBlock
          flexD='row'
          imageSrc={LoginImg}
          animatedHead='Sign in'
          nonAnimatedHead=' to your free account'
          content='All you need is your gmail address to create an account/sign in. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.'
        />
        <ProcessBlock
          flexD='row-reverse'
          imageSrc={PostQuestionsImg}
          animatedHead='Post questions'
          nonAnimatedHead=' for review'
          content='You can now add questions to our bank based on various filters provided. Wait for the reviewing committee to approve it. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.'
        />
        <ProcessBlock
          flexD='row'
          imageSrc={GenerateImg}
          animatedHead='Generate'
          nonAnimatedHead=' question papers'
          content='Select the necessary filters and get a downloadable pdf of the randomly set exam paper. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.'
        />
      </Flex>
      <About aboutRef={aboutRef} />
      {/* Future scope section */}
      <Flex
        mt={['24', '40', '44', '52', '44']}
        justifyContent='center'
        flexDirection={['column', 'column', 'row']}
        alignItems={['center', 'center', 'normal']}
        flexWrap='wrap'
      >
        <FutureScopeCard
          heading='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore.'
        />
        <FutureScopeCard
          heading='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore.'
        />
      </Flex>
      <Footer footerRef={footerRef} />
    </Flex>
  );
};

export default Home;
