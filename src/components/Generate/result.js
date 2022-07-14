import CustomQuestion from './customQues';
import QuestionTab from './questionTab';
import { dummy } from './config';

const GenerateResult = () => {
  return (
    <div>
      <CustomQuestion />
      {dummy.map((ques, idx) => (
        // eslint-disable-next-line no-underscore-dangle
        <QuestionTab key={ques._id.$oid} index={idx + 1} data={ques} />
      ))}
    </div>
  );
};

export default GenerateResult;
