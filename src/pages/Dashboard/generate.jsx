import {
  Tabs,
  TabList,
  TabPanels,
  Box,
  TabPanel,
  Heading,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CustomTab from '../../components/Generate/customTab';
import GenerateForm from '../../components/Generate/form';
import GenerateResult from '../../components/Generate/result';
import { useLazyGeneratePreviewQuery } from '../../redux/services/questionPaperApi';

const Generate = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const formDetails = useSelector((state) => state.generateState.generateForm);
  const [trigger, { data, isLoading, isFetching }] =
    useLazyGeneratePreviewQuery();

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
        <Tabs
          isLazy
          defaultIndex={0}
          size='lg'
          index={tabIndex}
          onChange={(i) => setTabIndex(i)}
        >
          <TabList>
            <CustomTab>Form</CustomTab>
            <CustomTab isDisabled={!formDetails}>Preview</CustomTab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <GenerateForm
                trigger={trigger}
                isLoading={isLoading}
                isFetching={isFetching}
                switchPreview={() => setTabIndex(1)}
              />
            </TabPanel>
            <TabPanel>
              <GenerateResult queryData={data} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
};

export default Generate;
