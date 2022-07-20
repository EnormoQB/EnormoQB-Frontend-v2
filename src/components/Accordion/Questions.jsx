import {
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Image,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { BiExpand } from 'react-icons/bi';

const DifficultyTag = ({ content, isExpanded }) => {
  return (
    <Flex
      bgColor={isExpanded ? 'brand.300' : 'brand.400'}
      color={isExpanded ? 'brand.600' : 'brand.600'}
      fontSize='xs'
      fontWeight='400'
      py='1'
      px='1.5'
      ml='2'
      borderRadius='md'
    >
      {content}
    </Flex>
  );
};

const Tag = ({ content, isExpanded }) => {
  return (
    <Flex
      color={isExpanded ? 'brand.100' : 'gray.500'}
      fontSize='xs'
      fontWeight='400'
      p='1'
      mr='2'
      mt='1'
    >
      {content}
    </Flex>
  );
};

const Option = ({ choice, option, answer }) => {
  return (
    <Flex my='1.5'>
      <BsCheckCircleFill
        size='1.5rem'
        style={{ marginLeft: '0.5rem' }}
        visibility={option === answer ? 'visible' : 'hidden'}
      />
      <Box ml='3'>{choice}</Box>
      <Box ml='2' w='90%'>
        {option}
      </Box>
    </Flex>
  );
};

const Questions = ({
  question,
  option1,
  option2,
  option3,
  option4,
  answer,
  standard,
  subject,
  chapter,
  difficulty,
  imageurl,
  alt,
  color,
  iconused,
  pending,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [onImage, setOnImage] = useState(false);
  return (
    <Flex>
      <Accordion allowMultiple w='full'>
        {/* allowMultiple */}
        <AccordionItem
          borderTop='none'
          borderBottom='none'
          borderRadius='lg'
          my='1'
          style={{ boxShadow: '0 4px 12px #00000022' }}
        >
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton
                  borderTopRadius='lg'
                  borderBottomRadius='none'
                  _focus={{}}
                  _expanded={{
                    color: 'brand.100',
                    bg: 'brand.600',
                  }}
                >
                  <Flex
                    flex='1'
                    flexDir='column'
                    textAlign='left'
                    p='2'
                    w='100%'
                  >
                    <Flex>
                      <Flex
                        color={isExpanded ? 'brand.100' : 'brand.600'}
                        fontWeight='600'
                        fontSize='lg'
                        pl='2'
                        // w='95%'
                      >
                        {question}
                      </Flex>
                      <DifficultyTag
                        content={difficulty}
                        isExpanded={isExpanded}
                      />
                    </Flex>

                    <Flex ml='1'>
                      <Tag
                        content={`Class ${standard}`}
                        isExpanded={isExpanded}
                      />
                      <Tag content={subject} isExpanded={isExpanded} />
                      <Tag content={chapter} isExpanded={isExpanded} />
                    </Flex>
                  </Flex>
                  <Flex mr='6' display={pending === '1' ? 'flex' : 'none'}>
                    <Button
                      variant='accept'
                      mr='4'
                      fontSize='sm'
                      fontWeight='medium'
                    >
                      Accept
                    </Button>
                    <Button variant='reject' fontSize='sm' fontWeight='medium'>
                      Reject
                    </Button>
                  </Flex>
                  <AccordionIcon
                    h='6'
                    w='6'
                    borderRadius='100%'
                    bgColor={isExpanded ? 'brand.300' : 'brand.600'}
                    color={isExpanded ? 'brand.600' : 'brand.100'}
                  />
                </AccordionButton>
              </h2>
              <AccordionPanel borderBottomRadius='lg' pb='2'>
                <Flex
                  flexDir='row'
                  width='100%'
                  pl='2'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Flex fontWeight='medium' flexDir='column' w='70%'>
                    <Option choice='A.' option={option1} answer={answer} />
                    <Option choice='B.' option={option2} answer={answer} />
                    <Option choice='C.' option={option3} answer={answer} />
                    <Option choice='D.' option={option4} answer={answer} />
                  </Flex>
                  <Flex
                    display={imageurl !== '' ? 'flex' : 'none'}
                    pos='relative'
                    alignItems='center'
                  >
                    {/* <Avatar maxHeight='200px' maxWidth='400px' objectFit='cover' /> */}
                    <Image
                      w='150px'
                      h='150px'
                      objectFit='cover'
                      src={imageurl}
                      alt={alt}
                      onClick={onOpen}
                      onMouseOver={() => setOnImage(true)}
                      onMouseOut={() => setOnImage(false)}
                      _hover={{
                        cursor: 'pointer',
                        filter: 'blur(3px)',
                        transition: '.3s all',
                      }}
                    />
                    {onImage ? (
                      <BiExpand
                        size='2rem'
                        color='#F9FBFF'
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                      />
                    ) : (
                      ''
                    )}
                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalCloseButton _focus={{}} />
                        <ModalBody w='fit-content' h='fit-content'>
                          <Image src={imageurl} alt={alt} />
                        </ModalBody>
                      </ModalContent>
                    </Modal>
                  </Flex>
                </Flex>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};

export default Questions;
