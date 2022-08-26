import { IconButton, Input, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';
import { createWorker } from 'tesseract.js';
import { IoCamera } from 'react-icons/io5';

const STATUSES = {
  IDLE: '',
  FAILED: 'Failed to perform OCR',
  PENDING: 'Processing...',
  SUCCEEDED: 'OCR processing complete',
};

const OcrReader = ({ onReadOcrData }) => {
  const [ocrState, setOcrState] = useState(STATUSES.IDLE);
  const worker = createWorker();

  // Process image with OCR
  const readImageText = async (selectedTempImage) => {
    setOcrState(STATUSES.PENDING);
    try {
      await worker.load();
      // Set the language to recognize
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const {
        data: { text },
      } = await worker.recognize(selectedTempImage);
      await worker.terminate();

      onReadOcrData(text);
      setOcrState(STATUSES.SUCCEEDED);
    } catch (err) {
      setOcrState(STATUSES.FAILED);
    }
  };

  const uploadImageFunction = (e) => {
    readImageText(e.target.files[0]);
  };

  return (
    <>
      <Input
        type='file'
        name='ocr-image'
        id='ocrInput'
        display='none'
        onChange={uploadImageFunction}
      />
      <Tooltip label='Read text from Image' placement='left' size='xs'>
        <IconButton
          aria-label='Upload question'
          icon={<IoCamera />}
          size='xs'
          bg='brand.300'
          color='brand.600'
          _hover={{ backgroundColor: 'brand.400', color: 'brand.600' }}
          onClick={() => document.querySelector('#ocrInput').click()}
          isLoading={ocrState === STATUSES.PENDING}
        />
      </Tooltip>
    </>
  );
};

export default OcrReader;
