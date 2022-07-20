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
} from '@chakra-ui/react';
import { useState } from 'react';
import { BiExpand } from 'react-icons/bi';
import Option from './option';
import Tag from './tag';

const Question = ({
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
                  _expanded={{ color: 'brand.100', bg: 'brand.600' }}
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
                        height='22px'
                        width='22px'
                        align='center'
                        bgColor={isExpanded ? 'brand.300' : color}
                        justifyContent='center'
                        borderRadius='30px'
                        borderBottomRightRadius='0'
                        mt='1'
                        color={isExpanded ? 'brand.600' : 'brand.100'}
                      >
                        {iconused}
                      </Flex>
                      <Flex
                        color={isExpanded ? 'brand.100' : 'brand.600'}
                        fontWeight='600'
                        fontSize='lg'
                        pl='2'
                        w='95%'
                      >
                        {question}
                      </Flex>
                    </Flex>

                    <Flex ml='6'>
                      <Tag
                        content={`Class ${standard}`}
                        isExpanded={isExpanded}
                      />
                      <Tag content={subject} isExpanded={isExpanded} />
                      <Tag content={chapter} isExpanded={isExpanded} />
                      <Tag content={difficulty} isExpanded={isExpanded} />
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
              <AccordionPanel
                pb={4}
                bgColor='brand.300'
                borderBottomRadius='lg'
              >
                <Flex
                  flexDir='row'
                  width='100%'
                  pl='2'
                  justifyContent='space-between'
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

export default Question;
