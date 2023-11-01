import  { useState, useEffect } from "react";

const TextAnimation = () => {
  const sentences = ["Sentence 1", "Sentence 2", "Sentence 3"];
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let index = 0;
    const typingSpeed = 70; // Adjust the typing speed (milliseconds)

    const textLoop = () => {
      if (!isDeleting && index <= sentences[sentenceIndex].length) {
        setDisplayText((_prevText) => sentences[sentenceIndex].slice(0, index));
        index++;
      } else if (isDeleting && index >= 0) {
        setDisplayText((_prevText) => sentences[sentenceIndex].slice(0, index));
        index--;
      }

      if (index > sentences[sentenceIndex].length) {
        setIsDeleting(true);
      } else if (index === 0) {
        setIsDeleting(false);
        setSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length);
      }

      setTimeout(textLoop, isDeleting ? 500 : typingSpeed);
    };

    textLoop();
  }, [sentenceIndex, isDeleting]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div id="type" className="text-4xl font-bold">
        {displayText}
      </div>
    </div>
  );
};

export default TextAnimation;
