import { Flex, Progress } from '@chakra-ui/react';
import { HiOutlineDocumentText } from 'react-icons/hi';

const Cards = () => {
  return (
    <Flex
      flexDir='row'
      h='300px'
      w='full'
      alignItems='center'
      justifyContent='space-around'
    >
      <Flex
        h='130px'
        w='20vw'
        bgColor='black'
        color='white'
        borderRadius='20px'
        flexDir='column'
      >
        <Flex
          h='130px'
          alignItems='center'
          flexDir='row'
          justifyContent='space-around'
        >
          <Flex alignItems='center' textAlign='left' flexDir='column'>
            <Flex fontSize='30px' ml='-65px'>
              <strong>120</strong>
            </Flex>
            <Flex ml='-15px'>Total Menus</Flex>
          </Flex>
          <Flex
            bgColor='gray'
            h='50px'
            w='50px'
            alignItems='center'
            justifyContent='space-evenly'
            borderRadius='10px'
          >
            <HiOutlineDocumentText fontSize='2rem' />
          </Flex>
        </Flex>
      </Flex>

      {/* <Flex h='70px' alignItems='top' flexDir='column' display='none'>
          <Flex w='15vw' ml='2.5vw' justifyContent='space-between'>
            <Flex>0%</Flex>
            <Flex>100%</Flex>
          </Flex>
          <Progress
            hasStripe
            colorScheme='gray'
            value={64}
            w='15vw'
            ml='2.5vw'
          />
        </Flex> */}
      <Flex
        h='130px'
        w='20vw'
        borderRadius='20px'
        flexDir='column'
        border='1px solid gray'
      >
        <Flex
          h='130px'
          alignItems='center'
          flexDir='row'
          justifyContent='space-around'
        >
          <Flex alignItems='center' textAlign='left' flexDir='column'>
            <Flex fontSize='30px' ml='-85px'>
              <strong>180</strong>
            </Flex>
            <Flex ml='12px'>Total Orders Today</Flex>
          </Flex>
          <Flex
            bgColor='pink'
            h='50px'
            w='50px'
            alignItems='center'
            justifyContent='space-evenly'
            borderRadius='10px'
          >
            <HiOutlineDocumentText fontSize='2rem' />
          </Flex>
        </Flex>
      </Flex>

      <Flex
        h='130px'
        w='20vw'
        borderRadius='20px'
        flexDir='column'
        border='1px solid gray'
      >
        <Flex
          h='130px'
          alignItems='center'
          flexDir='row'
          justifyContent='space-around'
        >
          <Flex alignItems='center' textAlign='left' flexDir='column'>
            <Flex fontSize='30px' ml='-85px'>
              <strong>180</strong>
            </Flex>
            <Flex ml='12px'>Total Orders Today</Flex>
          </Flex>
          <Flex
            bgColor='#a9fcc4'
            h='50px'
            w='50px'
            alignItems='center'
            justifyContent='space-evenly'
            borderRadius='10px'
          >
            <HiOutlineDocumentText fontSize='2rem' />
          </Flex>
        </Flex>
      </Flex>
      <Flex
        h='130px'
        w='20vw'
        borderRadius='20px'
        flexDir='column'
        border='1px solid gray'
      >
        <Flex
          h='130px'
          alignItems='center'
          flexDir='row'
          justifyContent='space-around'
        >
          <Flex alignItems='center' textAlign='left' flexDir='column'>
            <Flex fontSize='30px' ml='-85px'>
              <strong>180</strong>
            </Flex>
            <Flex ml='12px'>Total Orders Today</Flex>
          </Flex>
          <Flex
            bgColor='#a9d2fc'
            h='50px'
            w='50px'
            alignItems='center'
            justifyContent='space-evenly'
            borderRadius='10px'
          >
            <HiOutlineDocumentText fontSize='2rem' />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Cards;
