import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  Text,
  FormControl,
  Textarea,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useState } from 'react';
import { getToast } from '../../utils/helpers';

const feedbackOptions = [
  { value: 'Irrelevant Question', label: 'Irrelevant Question' },
  { value: 'Wrong Subject/Topic', label: 'Wrong Subject/Topic' },
  { value: 'Similar Question', label: 'Similar Question' },
  {
    value: 'Irrelevant/Duplicate options',
    label: 'Irrelevant/Duplicate options',
  },
  {
    value: 'Grammatical Error',
    label: 'Grammatical Error',
  },
  { value: 'Others', label: 'Others' },
];

const FeedbackModal = ({ onClose, isOpen, onConfirm }) => {
  const toast = useToast();
  const [feed, setFeed] = useState('');
  const [feedText, setFeedText] = useState('');
  const validate = () => {
    if (feed === '' || (feed.value === 'Others' && feedText === '')) {
      toast(
        getToast({
          id: 'error',
          title: 'Error',
          description: 'Please enter a feedback',
          status: 'error',
        }),
      );
      return;
    }
    const feedback = feed.value === 'Others' ? feedText : feed.value;
    onConfirm(feedback);
    onClose();
  };

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
              value={feed}
              onChange={(e) => setFeed(e)}
            />
          </FormControl>
          {feed.value === 'Others' && (
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
              validate();
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
