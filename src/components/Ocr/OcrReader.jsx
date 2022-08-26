import { IconButton, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { createWorker } from 'tesseract.js';
import { IoCamera } from 'react-icons/io5';

// OCR Statuses
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
      <IconButton
        aria-label='Upload question'
        icon={<IoCamera />}
        size='xs'
        bg='gray.100'
        color='gray.400'
        _hover={{ backgroundColor: 'gray.200', color: 'gray.600' }}
        onClick={() => document.querySelector('#ocrInput').click()}
        isLoading={ocrState === STATUSES.PENDING}
      />
    </>
  );
};

export default OcrReader;
