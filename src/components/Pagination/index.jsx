import { Flex, IconButton } from '@chakra-ui/react';
import { FaForward, FaBackward } from 'react-icons/fa';
import { IoMdPlay } from 'react-icons/io';

const Page = ({ pageNumber, setPageNumber, metadata }) => {
  const FirstPage = () => {
    setPageNumber(1);
  };

  const PreviousPage = () => {
    setPageNumber(pageNumber > 1 ? pageNumber - 1 : 1);
  };

  const NextPage = () => {
    if (pageNumber < metadata.totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const LastPage = () => {
    setPageNumber(metadata.totalPages);
  };

  return (
    <Flex
      w='100%'
      flexDirection='row'
      alignItems='center'
      justifyContent='center'
      pt='20px'
      pb='5px'
    >
      <IconButton
        variant='outline'
        bg='brand.400'
        color='brand.600'
        _hover={{ backgroundColor: 'brand.450' }}
        aria-label='First Page'
        icon={<FaBackward />}
        mr='5px'
        onClick={() => FirstPage()}
      />
      <IconButton
        aria-label='Previous'
        variant='outline'
        bg='brand.400'
        color='brand.600'
        _hover={{ backgroundColor: 'brand.450' }}
        icon={<IoMdPlay style={{ transform: 'rotateY(180deg)' }} />}
        mr='15px'
        onClick={() => PreviousPage()}
      />
      <Flex fontSize='20px' ml='15px' mr='15px'>
        {pageNumber}&nbsp;
        <span fontWeight='100'>of</span>&nbsp;{metadata.totalPages}
      </Flex>
      <IconButton
        variant='outline'
        bg='brand.400'
        color='brand.600'
        _hover={{ backgroundColor: 'brand.450' }}
        aria-label='Next'
        icon={<IoMdPlay />}
        ml='15px'
        onClick={() => NextPage()}
      />
      <IconButton
        bg='brand.400'
        color='brand.600'
        _hover={{ backgroundColor: 'brand.450' }}
        variant='outline'
        aria-label='Last Page'
        icon={<FaForward />}
        ml='5px'
        onClick={() => LastPage()}
      />
    </Flex>
  );
};

export default Page;
