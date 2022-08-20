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
          w='55vw'
          h='55vh'
          maxH='85vh'
        >
          <ModalOverlay />
          <ModalContent
            sx={{
              height: '30vh',
              maxH: '30vh',
              width: '40vw',
              maxW: '40vw',
              backgroundColor: 'brand.100',
              display: 'flex',
              flexDir: 'column',
              justifyContent: 'center',
              position: 'fixed',
              overflowX: 'hidden',
              overflowY: 'hidden',
              alignItems: 'center',
              textAlign: 'center',
              padding: '30px',
              borderRadius: '10px',
            }}
          >
            <ModalCloseButton
              _focus={{}}
              position='fixed'
              mt='260px'
              mr='470px'
            />
            <ModalBody>
              <Box display='flex' flexDir='column' alignItems='center'>
                <Flex
                  mb='20px'
                  fontSize='20px'
                  fontWeight='medium'
                  mt='10px'
                  alignItems='center'
                >
                  Do you want to continue to send mail to all the contributors?
                </Flex>
                <Box display='flex' justifyContent='flex-end'>
                  <Button
                    fontSize='sm'
                    fontWeight='medium'
                    bg='brand.400'
                    color='brand.600'
                    mr='4'
                    _hover={{ backgroundColor: 'brand.450' }}
                  >
                    Accept
                  </Button>
                  <Button
                    fontSize='sm'
                    fontWeight='medium'
                    mr='4'
                    bg='brand.600'
                    _hover={{ backgroundColor: 'myGray.500' }}
                    onClick={onClose}
                  >
                    Reject
                  </Button>
                </Box>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </Flex>
  );
};

export default SendMailCard;
