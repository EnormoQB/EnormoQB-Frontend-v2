import { Box, Button, useMultiStyleConfig, useTab } from '@chakra-ui/react';
import { forwardRef } from 'react';

const CustomTab = forwardRef((props, ref) => {
  const tabProps = useTab({ ...props, ref });
  const isSelected = !!tabProps['aria-selected'];

  const styles = useMultiStyleConfig('Tabs', tabProps);

  return (
    <Button __css={styles.tab} {...tabProps}>
      <Box as='span' mr='2'>
        {isSelected ? '😎' : '😐'}
      </Box>
      {tabProps.children}
    </Button>
  );
});

CustomTab.displayName = 'CustomTab';
export default CustomTab;
