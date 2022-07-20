import {
  Box,
  Button,
  Flex,
  useMultiStyleConfig,
  useTab,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

const CustomTab = forwardRef((props, ref) => {
  const tabProps = useTab({ ...props, ref });
  const isSelected = !!tabProps['aria-selected'];

  const styles = useMultiStyleConfig('Tabs', tabProps);

  return (
    <Button __css={styles.tab} {...tabProps} _focus={{}}>
      <Flex alignItems='center'>
        <Box as='span' mr='2' fontSize='18'>
          {isSelected && <IoMdCheckmarkCircleOutline />}
        </Box>
        {tabProps.children}
      </Flex>
    </Button>
  );
});

CustomTab.displayName = 'CustomTab';
export default CustomTab;
