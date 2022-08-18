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
  useToast,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useState } from 'react';
import { useFeedbackupdateMutation } from '../../redux/services/questionApi';

const feedbackOptions = [
  { value: 'Irrelevant Question', label: 'Irrelevant Question' },
  { value: 'Wrong Subject/Topic', label: 'Wrong Subject/Topic' },
  { value: 'Others', label: 'Others' },
];

const FeedbackModal = ({ onClose, isOpen, onConfirm, id }) => {
  const [feed, setFeed] = useState('');
  const [feedText, setFeedText] = useState('');
  const status = 'rejected';
  const [trigger] = useFeedbackupdateMutation();
  const toast = useToast();

  const submit = () => {
    const feedback = feed.value === 'Others' ? feedText : feed.value;
    trigger({ feedback, id, status })
      .then(() => {
        setFeed('');
        setFeedText('');
        toast({
          id: 'generate',
          title: 'success',
          position: 'top-right',
          description: 'Question Rejected !',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          id: 'generate',
          title: 'success',
          position: 'top-right',
          description: 'Some Error Occured !',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      });
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
              onConfirm();
              onClose();
              submit();
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
