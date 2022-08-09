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
  Tfoot,
} from '@chakra-ui/react';

const Tableview = () => {
  return (
    <TableContainer w='80vw' mb='40px'>
      <Table variant='striped' colorScheme='gray'>
        <TableCaption>Questions in each subject per class</TableCaption>
        <Thead>
          <Tr>
            <Th>Class</Th>
            <Th>Subject</Th>
            <Th isNumeric>Questions</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Class X</Td>
            <Td>Science Physics</Td>
            <Td isNumeric>15 Questions</Td>
          </Tr>
          <Tr>
            <Td>Class X</Td>
            <Td>Science Physics</Td>
            <Td isNumeric>15 Questions</Td>
          </Tr>
          <Tr>
            <Td>Class X</Td>
            <Td>Science Physics</Td>
            <Td isNumeric>15 Questions</Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>X / XII</Th>
            <Th>Topic</Th>
            <Th isNumeric>Threshold Value 10 Questions</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default Tableview;
