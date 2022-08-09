import React from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import Tableview from '../../components/Admin/Tableview';

const Sendmail = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const style1 = {
    height: '30vh',
    maxH: '30vh',
    width: '40vw',
    maxW: '40vw',
    backgroundColor: 'white',
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
  };
  return (
    <Box>
      <Heading as='h1' fontSize='4xl' fontWeight='bold' mb={10}>
        <mark
          style={{
            backgroundColor: '#C3D0F9',
            borderRadius: '25px',
            padding: '0 12px 2px 12px',
            marginRight: '3px',
          }}
        >
          Admin
        </mark>
        Panel
      </Heading>
      <Tableview onOpen={onOpen} />
      <Flex fontWeight='medium'>
        Send Mails to all the contibutors for more contributions
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
          <ModalContent sx={style1}>
            <ModalCloseButton _focus={{}} position='absolute' />
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
    </Box>
  );
};

export default Sendmail;
