import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  FormControl,
  Textarea,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useState } from 'react';

const feedbackOptions = [
  { value: '0', label: 'Irrelevant Question' },
  { value: '1', label: 'Wrong Subject/Topic' },
  { value: 'Others', label: 'Others' },
];

const FeedbackModal = ({ onClose, isOpen, onConfirm }) => {
  const [feedback, setFeedback] = useState('');
  const [feedText, setFeedText] = useState('');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='lg'>
      <ModalOverlay />
      <ModalContent top='8rem'>
        <ModalHeader>Feedback</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb='6'>
          <Text>Please provide some feedback for rejecting the question.</Text>
          <FormControl mt='2' isRequired>
            <Select
              size='sm'
              options={feedbackOptions}
              placeholder='Select Feedback'
              chakraStyles={{
                control: (provided) => ({
                  ...provided,
                  boxShadow: 'base',
                }),
              }}
              value={feedback}
              onChange={(e) => setFeedback(e)}
            />
          </FormControl>
          {feedback.value === 'Others' && (
            <Textarea
              id='feedtext'
              placeholder='Enter Feedback'
              size='sm'
              mt='2'
              w='100%'
              rows='3'
              value={feedText}
              onChange={(e) => setFeedText(e.target.value)}
              boxShadow='base'
              resize='none'
            />
          )}
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            bg='brand.200'
            color='brand.600'
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FeedbackModal;
