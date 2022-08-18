import { Flex, Image } from '@chakra-ui/react';
import EmptyFolder from '../assets/emptyFolder.svg';

const Empty = ({
  imgSrc = EmptyFolder,
  textContent = 'No Data Found!',
  imgHeight = '65vh',
}) => {
  return (
    <Flex
      flexDirection='column'
      alignItems='center'
      h={imgHeight}
      justify='center'
    >
      <Image src={imgSrc} alt='Empty image' h='400px' />
      <Flex as='h2' fontWeight='600' fontSize='lg'>
        {textContent}
      </Flex>
    </Flex>
  );
};

export default Empty;
