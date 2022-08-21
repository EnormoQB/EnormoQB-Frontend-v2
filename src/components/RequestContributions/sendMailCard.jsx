import {
  Box,
  IconButton,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { MdOutgoingMail } from 'react-icons/md';
import { TiTick, TiTimes } from 'react-icons/ti';

const SendMailCard = ({ needContributions, topicName, quesCount }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      flexDirection='column'
      boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
      borderRadius='10'
      p='3'
      w='24%'
      borderBottomWidth='medium'
      color={needContributions ? '' : 'gray.500'}
      borderBottomColor={needContributions ? 'brand.500' : 'gray.300'}
      mb='5'
    >
      <Flex fontSize='sm' fontWeight='medium' color='gray.500' mb='auto'>
        {topicName}
      </Flex>
      <Flex mt='2' justifyContent='space-between' alignItems='center'>
        <Flex flexDirection='column'>
          <Box fontSize='2xl' fontWeight='medium'>
            {quesCount}
          </Box>
          <Box fontSize='xs' color='gray.500'>
            Question Count
          </Box>
        </Flex>
        <IconButton
          onClick={onOpen}
          icon={<MdOutgoingMail size='30px' />}
          p='2'
          borderRadius='6'
          transition='opacity ease-in-out 200ms'
          _disabled={{
            bgColor: 'gray.300',
            color: 'gray.100',
            cursor: 'not-allowed',
          }}
          _hover={{ ...(!needContributions && { color: 'gray.100' }) }}
          disabled={!needContributions}
        />
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          motionPreset='slideInBottom'
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton _focus={{}} />
            <ModalBody p='10'>
              <Box display='flex' flexDir='column' alignItems='center' my='4'>
                <Flex
                  mb='20px'
                  fontSize='xl'
                  fontWeight='medium'
                  textAlign='center'
                >
                  Are you sure you want to continue sending mail to all the
                  contributors?
                </Flex>
                <Flex justifyContent='center'>
                  <Button
                    fontWeight='medium'
                    bg='brand.400'
                    color='brand.600'
                    rightIcon={<TiTick size='18px' />}
                    mx='2'
                    _hover={{ backgroundColor: 'brand.450' }}
                  >
                    Yes
                  </Button>
                  <Button
                    fontWeight='medium'
                    mx='2'
                    bg='brand.600'
                    rightIcon={<TiTimes size='18px' />}
                    _hover={{ backgroundColor: 'myGray.500' }}
                    onClick={onClose}
                  >
                    No
                  </Button>
                </Flex>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </Flex>
  );
};

export default SendMailCard;
