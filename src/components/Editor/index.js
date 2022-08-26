/* eslint-disable import/extensions, import/no-extraneous-dependencies */
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.css';
import '../../styles/editor.scss';
import 'froala-editor/js/third_party/spell_checker.min.js';
import 'froala-editor/js/plugins.pkgd.min.js';

import React, { useState } from 'react';
import FroalaEditor from 'react-froala-wysiwyg';
import { Box, Text, Flex } from '@chakra-ui/react';
import OcrReader from '../Ocr/OcrReader';

const config = {
  placeholderText: 'Please enter a question',
  charCounterCount: false,
  toolbarButtons: {
    moreText: {
      buttons: [
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'subscript',
        'superscript',
        'fontFamily',
        'fontSize',
        'textColor',
        'backgroundColor',
        'inlineClass',
        'inlineStyle',
        'clearFormatting',
      ],
    },
    moreParagraph: {
      buttons: [
        'alignLeft',
        'alignCenter',
        'formatOLSimple',
        'alignRight',
        'alignJustify',
        'formatOL',
        'formatUL',
        'paragraphFormat',
        'paragraphStyle',
        'lineHeight',
        'outdent',
        'indent',
        'quote',
      ],
    },
    moreRich: {
      buttons: [
        'insertLink',
        // 'insertImage',
        // 'insertVideo',
        'insertTable',
        'emoticons',
        'fontAwesome',
        'specialCharacters',
        'embedly',
        // 'insertFile',
        'insertHR',
      ],
    },
    moreMisc: {
      buttons: [
        'undo',
        'redo',
        'fullscreen',
        'print',
        'getPDF',
        'spellChecker',
        'selectAll',
        'html',
        'help',
      ],
      align: 'right',
      //   buttonsVisible: 2,
    },
  },
  events: {
    initialized: () => {
      console.log('initialized');
    },
  },
};

const Editor = ({ setQuestion }) => {
  const [title, setTitle] = useState('');

  const onReadOcrData = (ocrTempData) => {
    console.log(ocrTempData);
    setTitle(ocrTempData);
  };

  const handleModelChange = (model) => {
    setTitle(model);
    setQuestion(model);
  };

  return (
    <Box mb='4'>
      <Flex justifyContent='space-between' alignItems='center'>
        <Text fontSize={18} htmlFor='question' fontWeight='500' mb='2'>
          Question&nbsp;
          <Text color='red.500' display='inline' as='span'>
            *
          </Text>
        </Text>
        <OcrReader onReadOcrData={onReadOcrData} />
      </Flex>
      <FroalaEditor
        tag='textarea'
        config={config}
        model={title}
        onModelChange={handleModelChange}
      />
    </Box>
  );
};

export default Editor;
