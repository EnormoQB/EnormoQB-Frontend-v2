import { Button, Flex, Box, Image } from '@chakra-ui/react';
import '../../styles/Home/index.scss';
import TopBorder from '../TopBorder';

const ProcessBlock = ({
  flexD,
  imageSrc,
  animatedHead,
  nonAnimatedHead,
  content,
}) => (
  <Flex w='80%' my='4' flexDirection={flexD}>
    <Image src={imageSrc} alt='Login Illustration' w='50%' p='7' />
    <Flex flexDirection='column' justifyContent='center' w='50%' p='14'>
      <Box fontSize='2xl' fontWeight='bold'>
        <span className='highlight'>{animatedHead}</span>
        {nonAnimatedHead}
      </Box>
      <Box fontSize='md' my='8'>
        {content}
      </Box>
      <TopBorder borderH='0.35rem' />
    </Flex>
  </Flex>
);

export default ProcessBlock;
