import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface SingleQuestionProps {
  title: string;
  info: string;
}

const SingleQuestion: React.FC<SingleQuestionProps> = ({ title, info }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <article className="mx-auto w-[90vw] max-w-3xl bg-white rounded-md p-6 shadow-md border border-gray-200 mb-6 transition-all duration-300 ease-in-out">
      <header className="flex justify-between items-center">
        <h5 className="text-lg font-semibold text-gray-800">{title}</h5>
        <button
          className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-orange-400 transition-all duration-300"
          onClick={() => setShowInfo(!showInfo)}
        >
          {showInfo ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </header>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showInfo ? "max-h-[300px] opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-600 leading-relaxed">{info}</p>
      </div>
    </article>
  );
};

export default SingleQuestion;
