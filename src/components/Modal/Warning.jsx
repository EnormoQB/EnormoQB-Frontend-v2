import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';

const WarningModal = ({ onClose, isOpen, onConfirm, title, body }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent top='8rem'>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            No
          </Button>
          <Button
            bg='brand.200'
            color='brand.600'
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WarningModal;

WarningModal.defaultProps = {
  title: 'Warning ⚠️',
  body: 'This may lead to resetting other depended input fields. Are you sure you want to continue?',
};
