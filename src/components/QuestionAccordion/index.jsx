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
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BiExpand } from 'react-icons/bi';
import { MdDelete, MdEdit } from 'react-icons/md';
import { AiFillFlag } from 'react-icons/ai';
import Option from './option';
import Tag from './Tags/tag';
import DifficultyTag from './Tags/difficulty';
import FeedbackModal from '../Modal/Feedback';
import SimilarQuesModal from '../Modal/SimilarQues';
import {
  useFeedbackupdateMutation,
  useDeleteQuestionMutation,
} from '../../redux/services/questionApi';
import { getToast } from '../../utils/helpers';
import WarningModal from '../Modal/Warning';
import {
  useLazyGetUserDataQuery,
  useToggleStatusMutation,
} from '../../redux/services/userApi';

const QuestionAccordion = ({
  data,
  show,
  removeQuestion,
  similarQues,
  showEdit,
}) => {
  const user = useSelector((state) => state.userState.user);
  const toast = useToast();
  const [similarArray, setSimilarArray] = useState([]);
  const [warnModalData, setWarnModalData] = useState({
    title: 'Title',
    body: 'Body',
    onConfirm: () => {},
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
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
  const {
    isOpen: isWarnOpen,
    onOpen: onWarnOpen,
    onClose: onWarnClose,
  } = useDisclosure();
  const id = data._id;
  const [trigger] = useFeedbackupdateMutation();
  const [triggerDelete] = useDeleteQuestionMutation();
  const [triggerToggleStatus] = useToggleStatusMutation();
  const [triggerGetUser] = useLazyGetUserDataQuery();

  useEffect(() => {
    if (similarQues) {
      if (similarQues.length > 0) {
        similarQues.forEach((element) => {
          if (element.status === 'pending' || element.status === 'approved') {
            setSimilarArray((prev) => [...prev, element]);
          }
        });
      }
    }
  }, [similarQues]);

  useEffect(() => {
    if (data) {
      if (data.userId === '' || data.userId === null) {
        // console.log(data);
        console.log('Hello Here');
      }
    }
  }, [data]);

  const handleUpdate = async (status, feedback) => {
    try {
      await trigger({ feedback, id, status: status.toLowerCase() });
      toast(
        getToast({
          title: 'Success',
          description: `Question ${status}!`,
          status: 'success',
        }),
      );
      removeQuestion();
    } catch (err) {
      console.log('Update Error', err);
      toast(
        getToast({
          title: 'Error',
          description: 'Some Error Occured!',
          status: 'error',
        }),
      );
    }
  };

  const reportQues = async ({ userId, quesId }) => {
    try {
      await triggerToggleStatus({ userId, quesId });
      await triggerGetUser();
      toast(
        getToast({
          title: 'Success',
          description: `Question rejected and reported!`,
          status: 'success',
        }),
      );
      removeQuestion();
    } catch (err) {
      console.log('Toggle Error', err);
      toast(
        getToast({
          title: 'Error',
          description: 'Some Error Occured!',
          status: 'error',
        }),
      );
    }
  };

  const deleteQuestion = () => {
    triggerDelete({ id })
      .then(() => {
        toast(
          getToast({
            title: 'Success',
            description: `Question deleted!`,
            status: 'success',
          }),
        );
        removeQuestion();
      })
      .catch((err) => {
        console.log('Delete Error', err);
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
        userId={data.userId}
      />
      <Accordion allowMultiple w='full'>
        <AccordionItem
          borderTop='none'
          borderBottom='none'
          borderRadius='lg'
          my='2.5'
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
                    {data.topic?.map((topic) => (
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
                  alignItems='flex-start'
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
                  </Flex>
                  {data.imageKey && data.imageKey !== '' && (
                    <Flex
                      display={data.imageKey !== '' ? 'flex' : 'none'}
                      position='relative'
                      alignItems='center'
                      role='group'
                      onClick={onOpen}
                    >
                      <Image
                        h='150px'
                        src={`${process.env.REACT_APP_SERVER_URL}/api/assets/${data.imageKey}`}
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
                        size='xl'
                        motionPreset='slideInBottom'
                      >
                        <ModalOverlay />
                        <ModalContent bg='brand.100'>
                          <ModalCloseButton _focus={{}} />
                          <ModalBody py='8' px='10'>
                            <Flex
                              w='full'
                              h='full'
                              maxH='full'
                              justify='center'
                              alignItems='center'
                            >
                              <Image
                                src={`${process.env.REACT_APP_SERVER_URL}/api/assets/${data.imageKey}`}
                                alt='Question'
                                w='full'
                              />
                            </Flex>
                          </ModalBody>
                        </ModalContent>
                      </Modal>
                    </Flex>
                  )}
                </Flex>
                <Flex mt='3' w='full'>
                  <WarningModal
                    isOpen={isWarnOpen}
                    onClose={onWarnClose}
                    onConfirm={warnModalData.onConfirm}
                    title={warnModalData.title}
                    body={warnModalData.body}
                  />
                  {showEdit && (
                    <Flex alignItems='center' w='full'>
                      {data.status === 'rejected' && data.feedback && (
                        <Text mr='4'>
                          <strong>Feedback :</strong>&nbsp;
                          <span>{data.feedback}</span>
                        </Text>
                      )}
                      <Button
                        fontSize='sm'
                        fontWeight='medium'
                        ml={data.feedback && 'auto'}
                        bg='brand.600'
                        _hover={{ backgroundColor: 'myGray.500' }}
                        rightIcon={<MdEdit />}
                        flexShrink='0'
                        onClick={() =>
                          navigate(`/dashboard/contribute?id=${data._id}`, {
                            state: data,
                          })
                        }
                      >
                        <span>Edit</span>
                      </Button>
                      <Tooltip label='Delete' fontSize='xs'>
                        <IconButton
                          icon={<MdDelete />}
                          bg='brand.300'
                          color='brand.600'
                          onClick={() => {
                            setWarnModalData({
                              title: 'Delete Question',
                              body: 'Are you sure you want to delete this question?',
                              onConfirm: () => deleteQuestion(),
                            });
                            onWarnOpen();
                          }}
                          ml='4'
                        />
                      </Tooltip>
                    </Flex>
                  )}
                  {show && user.userType !== 'contributor' && (
                    <>
                      <Button
                        fontSize='sm'
                        fontWeight='medium'
                        mr='4'
                        bg='brand.600'
                        _hover={{ backgroundColor: 'myGray.500' }}
                        onClick={() => {
                          setWarnModalData({
                            title: 'Accept Question',
                            body: 'Are you sure you want to accept this question?',
                            onConfirm: () => handleUpdate('Approved', null),
                          });
                          onWarnOpen();
                        }}
                      >
                        Accept
                      </Button>

                      {data.userId === '' || data.userId === null ? (
                        <Button
                          fontSize='sm'
                          fontWeight='medium'
                          bg='brand.400'
                          color='brand.600'
                          mr='4'
                          _hover={{ backgroundColor: 'brand.450' }}
                          onClick={() => deleteQuestion()}
                        >
                          Reject
                        </Button>
                      ) : (
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
                      )}
                      {similarArray.length !== 0 && (
                        <>
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
                          <SimilarQuesModal
                            modalOpen={modalOpenSimilarQuestion}
                            onModalClose={onModalCloseSimilarQuestion}
                            similarArray={similarArray}
                          />
                        </>
                      )}
                      <Flex ml='auto' alignItems='center'>
                        {user.userType !== 'reviewer' && (
                          <Tooltip label='Delete' fontSize='xs'>
                            <IconButton
                              icon={<MdDelete />}
                              bg='brand.300'
                              color='brand.600'
                              onClick={() => {
                                setWarnModalData({
                                  title: 'Delete Question',
                                  body: 'Are you sure you want to delete this question?',
                                  onConfirm: () => deleteQuestion(),
                                });
                                onWarnOpen();
                              }}
                              mr='4'
                            />
                          </Tooltip>
                        )}
                        {data.userId === '' || data.userId === null ? null : (
                          <Tooltip label='Report' fontSize='xs'>
                            <IconButton
                              icon={<AiFillFlag />}
                              bg='brand.300'
                              color='brand.600'
                              onClick={() => {
                                setWarnModalData({
                                  title: 'Report Question',
                                  body: `Are you sure you want to report this question? 
                                This will freeze the author's account for further contributions.`,
                                  onConfirm: () =>
                                    reportQues({
                                      userId: data.userId,
                                      quesId: data._id,
                                    }),
                                });
                                onWarnOpen();
                              }}
                            />
                          </Tooltip>
                        )}
                      </Flex>
                    </>
                  )}
                  {show && user.userType === 'contributor' && (
                    <Button
                      fontSize='sm'
                      fontWeight='medium'
                      mr='4'
                      bg='brand.300'
                      color='brand.600'
                      rightIcon={<MdDelete />}
                      flexShrink='0'
                      onClick={() => {
                        setWarnModalData({
                          title: 'Delete Question',
                          body: 'Are you sure you want to delete this question?',
                          onConfirm: () => deleteQuestion(),
                        });
                        onWarnOpen();
                      }}
                    >
                      <span>Delete</span>
                    </Button>
                  )}
                </Flex>
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
