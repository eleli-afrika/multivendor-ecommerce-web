import AllQuestions from "../data/FAQS";
import Questions from "../components/FAQS/Questions";
import { useState } from "react";
import "./../faq.css";

const FAQSPage = () => {
  const [questions] = useState(AllQuestions);
  return (
    <section className="bg-gray-200">
      <main>
        <Questions questions={questions} />
      </main>
    </section>
  );
};

export default FAQSPage;
