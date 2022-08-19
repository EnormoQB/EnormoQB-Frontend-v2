import { useEffect, useState } from 'react';
import {
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Center,
  Box,
  useToast,
} from '@chakra-ui/react';
import { BiExpand } from 'react-icons/bi';
import Option from './option';
import Tag from './Tags/tag';
import DifficultyTag from './Tags/difficulty';
import FeedbackModal from '../Modal/Feedback';
import SimilarQuestion from './similarQuestion';
import { useFeedbackupdateMutation } from '../../redux/services/questionApi';
import { getToast } from '../../utils/helpers';

const QuestionAccordion = ({ data, show, removeQuestion, similarq }) => {
  const [similarArray, setSimilarArray] = useState([]);

  useEffect(() => {
    if (similarq) {
      if (similarq.length > 0) {
        similarq.forEach((element) => {
          if (element.status === 'pending' || element.status === 'approved') {
            setSimilarArray((prev) => [...prev, element]);
          }
        });
      }
    }
  }, [similarq]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: modalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const {
    isOpen: modalOpenSimilarQuestion,
    onOpen: onModalOpenSimilarQuestion,
    onClose: onModalCloseSimilarQuestion,
  } = useDisclosure();

  const id = data._id;
  const [trigger] = useFeedbackupdateMutation();
  const toast = useToast();

  const handleUpdate = (status, feedback) => {
    trigger({ feedback, id, status: status.toLowerCase() })
      .then(() => {
        toast(
          getToast({
            title: 'Success',
            description: `Question ${status}!`,
            status: 'success',
          }),
        );
        removeQuestion();
      })
      .catch((err) => {
        console.log('Update Error', err);
        toast(
          getToast({
            title: 'Error',
            description: 'Some Error Occured!',
            status: 'error',
          }),
        );
      });
  };

  return (
    <Box>
      <FeedbackModal
        isOpen={modalOpen}
        onClose={onModalClose}
        onConfirm={(feedback) => handleUpdate('Rejected', feedback)}
        id={id}
      />

      <Accordion allowMultiple w='full'>
        <AccordionItem
          borderTop='none'
          borderBottom='none'
          borderRadius='lg'
          my='2'
          boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
        >
          {({ isExpanded }) => (
            <>
              <AccordionButton
                borderTopRadius='lg'
                borderBottomRadius='none'
                py='4'
                px='6'
                _focus={{}}
                _expanded={{ color: 'brand.600', bg: 'brand.400' }}
                role='group'
              >
                <Flex flexDir='column' textAlign='left' grow='1'>
                  <Text as='h2' fontWeight='600' fontSize='lg'>
                    {`Q. ${data.question}`}
                  </Text>
                  <Flex mt='2' alignItems='center' wrap='wrap'>
                    <Tag content={`Class ${data.standard}`} />
                    <Tag content={data.subject} />
                    {data.topics?.map((topic) => (
                      <Tag key={topic} content={topic} />
                    ))}
                    <DifficultyTag
                      content={data.difficulty}
                      isExpanded={isExpanded}
                    />
                  </Flex>
                </Flex>
                <AccordionIcon h='6' w='6' />
              </AccordionButton>
              <AccordionPanel borderBottomRadius='lg' py='4' px='8'>
                <Flex
                  flexDir='row'
                  width='100%'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Flex fontWeight='medium' flexDir='column' w='70%'>
                    {data.options.map((option, idx) => (
                      <Option
                        key={idx}
                        index={idx}
                        option={option}
                        isAnswer={option === data.answer}
                      />
                    ))}
                    {data.status === 'rejected' && data.feedback ? (
                      <Text>
                        <strong>Feedback :</strong> {data.feedback}
                      </Text>
                    ) : null}
                  </Flex>
                  {data.imageUrl && data.imageUrl !== '' && (
                    <Flex
                      display={data.imageUrl !== '' ? 'flex' : 'none'}
                      position='relative'
                      alignItems='center'
                      role='group'
                      onClick={onOpen}
                    >
                      <Image
                        h='150px'
                        src={data.imageUrl}
                        alt='Question'
                        _groupHover={{
                          cursor: 'pointer',
                          filter: 'blur(2px)',
                          transition: '.3s all',
                        }}
                      />
                      <Center
                        position='absolute'
                        top='0'
                        left='0'
                        w='full'
                        h='full'
                        opacity='0'
                        _groupHover={{ opacity: 1 }}
                        bg='#00000075'
                        cursor='pointer'
                      >
                        <BiExpand color='white' size={24} />
                      </Center>
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
                        <ModalContent bg='Transparent'>
                          <ModalCloseButton _focus={{}} />
                          <ModalBody
                            sx={{
                              height: '60vh',
                              width: '50vw',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              textAlign: 'center',
                              marginLeft: '-150px',
                            }}
                          >
                            <Image src={data.imageUrl} alt='Question' />
                          </ModalBody>
                        </ModalContent>
                      </Modal>
                    </Flex>
                  )}
                </Flex>
                {show ? (
                  <Box mt='3'>
                    <Button
                      fontSize='sm'
                      fontWeight='medium'
                      mr='4'
                      bg='brand.600'
                      _hover={{ backgroundColor: 'myGray.500' }}
                      onClick={() => handleUpdate('Approved', null)}
                    >
                      Accept
                    </Button>
                    <Button
                      fontSize='sm'
                      fontWeight='medium'
                      bg='brand.400'
                      color='brand.600'
                      mr='4'
                      _hover={{ backgroundColor: 'brand.450' }}
                      onClick={onModalOpen}
                    >
                      Reject
                    </Button>

                    {similarArray.length !== 0 && (
                      <Button
                        fontSize='sm'
                        fontWeight='medium'
                        bg='brand.300'
                        color='brand.600'
                        _hover={{ backgroundColor: 'brand.350' }}
                        onClick={onModalOpenSimilarQuestion}
                      >
                        {similarArray.length} Similar Questions
                      </Button>
                    )}
                    <Modal
                      isOpen={modalOpenSimilarQuestion}
                      onClose={onModalCloseSimilarQuestion}
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
                          <Text
                            as='h3'
                            fontWeight='600'
                            fontSize='2xl'
                            mb='3'
                            pr={6}
                            pl={3}
                          >
                            Similar Questions
                          </Text>
                          <Box overflow='auto' h='92%' pr={6} pl={3}>
                            {similarArray.map((ques) => (
                              <SimilarQuestion
                                key={ques._id.$oid}
                                data={ques}
                              />
                            ))}
                          </Box>
                        </ModalBody>
                      </ModalContent>
                    </Modal>
                  </Box>
                ) : null}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default QuestionAccordion;

QuestionAccordion.defaultProps = {
  show: false,
};
