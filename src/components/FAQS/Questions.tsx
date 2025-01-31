import SingleQuestion from "./SingleQuestion";

interface QuestionProps {
  title: string;
  info: string;
  index: number;
}

const Questions: React.FC<{ questions: QuestionProps[] }> = ({ questions }) => {
  return (
    <section className="container mx-auto max-w-7xl h-full py-5 w-full bg-white">
      <h1 className="text-center py-12 font-bold text-2xl">Frequently Asked Questions</h1>
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
