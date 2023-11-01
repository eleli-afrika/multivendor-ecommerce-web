import SingleQuestion from "./SingleQuestion";

interface QuestionProps {
  title: string;
  info: string;
  index: number;
}

const Questions: React.FC<{ questions: QuestionProps[] }> = ({ questions }) => {
  return (
    <section className="container">
      <h1>Frequently Asked Questions</h1>
      {questions.map((question) => (
        <SingleQuestion
          key={question.index}
          title={question.title}
          info={question.info}
        />
      ))}
    </section>
  );
};

export default Questions;
