import {
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Modal,
  Text,
  Box,
  Button,
  Flex,
} from '@chakra-ui/react';
import { useState } from 'react';
import SimilarQuestion from '../QuestionAccordion/similarQuestion';

const SimilarQuesModal = ({
  modalOpen,
  onModalClose,
  customArray,
  isSimilarModal,
  onConfirm,
}) => {
  const [checkedIds, setCheckedIds] = useState({});
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
            {isSimilarModal ? 'Similar Questions' : 'Custom Questions'}
          </Text>
          {!isSimilarModal && (
            <Box mx='4' my='2' fontSize='xs'>
              Note: Check the questions you wish to add to your question paper.
            </Box>
          )}
          <Box overflow='auto' h={isSimilarModal ? '92%' : '80%'} pr={6} pl={3}>
            {customArray.map((ques, idx) => (
              <SimilarQuestion
                key={ques._id}
                data={ques}
                isSimilarQues={isSimilarModal}
                setCheckedIds={setCheckedIds}
                index={idx}
              />
            ))}
          </Box>
          {!isSimilarModal && (
            <Flex pb='8' ml='4' alignSelf='flex-end'>
              <Button
                fontSize='sm'
                fontWeight='medium'
                mr='4'
                bg='brand.600'
                _hover={{ backgroundColor: 'myGray.500' }}
                onClick={() => onConfirm(checkedIds)}
              >
                Confirm
              </Button>
              <Button
                fontSize='sm'
                fontWeight='medium'
                bg='brand.400'
                color='brand.600'
                mr='4'
                _hover={{ backgroundColor: 'brand.450' }}
                onClick={onModalClose}
              >
                Cancel
              </Button>
            </Flex>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SimilarQuesModal;

SimilarQuesModal.defaultProps = {
  onConfirm: () => {},
};
