import {
  Text,
  Tabs,
  TabList,
  TabPanels,
  Box,
  TabPanel,
} from '@chakra-ui/react';
import CustomTab from '../../components/Generate/customTab';
import GenerateForm from '../../components/Generate/form';
import GenerateResult from '../../components/Generate/result';

const Generate = () => {
  return (
    <div>
      <Text as='h1' fontSize='4xl' fontWeight='bold' mb='5'>
        Generate Question Paper
      </Text>
      <Box w='full'>
        <Tabs isLazy defaultIndex={1} size='lg'>
          <TabList>
            <CustomTab>Form</CustomTab>
            <CustomTab>Result</CustomTab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <GenerateForm />
            </TabPanel>
            <TabPanel>
              <GenerateResult />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
};

export default Generate;
