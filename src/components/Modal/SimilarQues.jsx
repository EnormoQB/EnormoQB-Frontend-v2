import {
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Modal,
  Text,
  Box,
} from '@chakra-ui/react';
import SimilarQuestion from '../QuestionAccordion/similarQuestion';

const SimilarQuesModal = ({ modalOpen, onModalClose, similarArray }) => {
  return (
    <Modal
      isOpen={modalOpen}
      onClose={onModalClose}
      isCentered
      motionPreset='slideInBottom'
    >
      <ModalOverlay />
      <ModalContent
        sx={{
          height: '80vh',
          maxH: '80vh',
          width: '80vw',
          maxW: '80vw',
          backgroundColor: 'brand.100',
          display: 'flex',
          flexDir: 'column',
          position: 'fixed',
          padding: '30px',
        }}
      >
        <ModalCloseButton _focus={{}} mr='1.5' mt='1.5' />
        <ModalBody p='0' h='100%'>
          <Text as='h3' fontWeight='600' fontSize='2xl' mb='3' pr={6} pl={3}>
            Similar Questions
          </Text>
          <Box overflow='auto' h='92%' pr={6} pl={3}>
            {similarArray.map((ques) => (
              <SimilarQuestion key={ques._id} data={ques} />
            ))}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SimilarQuesModal;
