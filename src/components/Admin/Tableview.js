import React from 'react';
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
} from '@chakra-ui/react';

const Tableview = ({ onOpen }) => {
  return (
    <TableContainer w='80vw' mb='40px' textAlign='center'>
      <Table variant='striped' colorScheme='gray'>
        <TableCaption>Questions in each subject per class</TableCaption>
        <Thead>
          <Tr>
            <Th>Class</Th>
            <Th>Subject</Th>
            <Th mr='10'>No. of Questions</Th>
            <Th>Send Mail</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>X</Td>
            <Td>Physics</Td>
            <Td>15</Td>
            <Td>
              <Button onClick={onOpen} mt='-1.5'>
                Send Mail
              </Button>
            </Td>
          </Tr>
          <Tr>
            <Td>X</Td>
            <Td>Physics</Td>
            <Td>15</Td>
            <Td>
              <Button onClick={onOpen} mt='-1.5'>
                Send Mail
              </Button>
            </Td>
          </Tr>
          <Tr>
            <Td>X</Td>
            <Td>Physics</Td>
            <Td>15</Td>
            <Td>
              <Button onClick={onOpen} mt='-1.5'>
                Send Mail
              </Button>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Tableview;
