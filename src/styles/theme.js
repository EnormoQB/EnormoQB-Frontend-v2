import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    100: '#F9FBFF',
    200: '#EEF4FF',
    300: '#DEE3F5',
    400: '#C3D0F9',
    500: '#005CE6',
    600: '#1B1C1E',
  },
  multiSelect: {
    300: '#C3D0F9',
    500: '#C3D0F9',
  },
  hover: {
    600: '#1B1C1E22',
  },
  myGray: {
    500: '#3A3C40',
  },
  blue: {
    100: '#7CAEF8',
    200: '#4E8FF1',
    300: '#2272EB',
    400: '#005CE6',
  },
};

const theme = extendTheme({
  colors,
  styles: {
    global: {
      body: {
        fontFamily: 'Poppins',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        _focus: { boxShadow: 'none' },
        _hover: {
          bg: 'brand.400',
          color: 'brand.600',
        },
      },
      variants: {
        base: {
          bg: 'brand.500',
          color: 'brand.200',
        },
      },
      defaultProps: {
        variant: 'base',
      },
    },
    Tooltip: {
      baseStyle: {
        bg: 'brand.600',
        fontSize: 'xs',
      },
    },
  },
});

export default theme;
