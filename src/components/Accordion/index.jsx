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
} from '@chakra-ui/react';
import { BiExpand } from 'react-icons/bi';
import Option from './option';
import Tag from './Tags/tag';
import DifficultyTag from './Tags/difficulty';

const Question = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex>
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
                <Box
                  mr='6'
                  ml='7'
                  display={data.status === 'pending' ? 'flex' : 'none'}
                  opacity={isExpanded ? '1' : '0'}
                  _groupHover={{ opacity: 1 }}
                  transition='opacity ease-in-out 200ms'
                >
                  <Button
                    variant='accept'
                    fontSize='sm'
                    fontWeight='medium'
                    borderRightRadius='0'
                    bg='brand.600'
                    _hover={{ backgroundColor: 'myGray.500' }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant='reject'
                    fontSize='sm'
                    fontWeight='medium'
                    bg='brand.100'
                    color='brand.600'
                    border='1px'
                    borderLeft='none'
                    borderColor='brand.600'
                    borderLeftRadius='0'
                    _hover={{ backgroundColor: 'brand.200' }}
                  >
                    Reject
                  </Button>
                </Box>
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
                      <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalCloseButton _focus={{}} />
                          <ModalBody
                            w='fit-content'
                            h='fit-content'
                            maxH='80vh'
                          >
                            <Image src={data.imageUrl} alt='Question' />
                          </ModalBody>
                        </ModalContent>
                      </Modal>
                    </Flex>
                  )}
                </Flex>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};

export default Question;
