import {
  Tabs,
  TabList,
  TabPanels,
  Box,
  TabPanel,
  Heading,
} from '@chakra-ui/react';
import CustomTab from '../../components/Generate/customTab';
import GenerateForm from '../../components/Generate/form';
import GenerateResult from '../../components/Generate/result';

const Generate = () => {
  return (
    <div id='generateForm'>
      <Heading as='h1' fontSize='4xl' fontWeight='bold' mb={10}>
        Generate
        <mark
          style={{
            backgroundColor: '#C3D0F9',
            borderRadius: '25px',
            padding: '0 12px 2px 12px',
            marginLeft: '3px',
          }}
        >
          Question Paper
        </mark>
      </Heading>
      <Box w='full'>
        <Tabs isLazy defaultIndex={0} size='lg'>
          <TabList>
            <CustomTab>Form</CustomTab>
            <CustomTab>Preview</CustomTab>
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
