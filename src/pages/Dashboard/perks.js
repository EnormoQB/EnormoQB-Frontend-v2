import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

const Perks = () => {
  return (
    <Box>
      <Heading as='h1' fontSize='4xl' fontWeight='bold' mb={10}>
        <mark
          style={{
            backgroundColor: '#C3D0F9',
            borderRadius: '25px',
            padding: '0 12px 2px 12px',
            marginRight: '3px',
          }}
        >
          Perk
        </mark>
        Profile
      </Heading>
    </Box>
  );
};

export default Perks;
