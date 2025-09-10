import { useState } from "react";
import "./App.css";

type Question = {
    text: string;
};

export default function QuizForm() {
    const [question, setQuestion] = useState<Question>({ text: "" });
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isPlayVisible, setIsPlayVisible] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

    const addQuestion = () => {
        if (question.text.trim() === "") return;

        const updatedQuestions = [...questions, question];
        setQuestions(updatedQuestions);

        setQuestion({ text: "" });

        if (updatedQuestions.length >= 3) {
            setIsPlayVisible(true);
        }
    };

    const playQuiz = () => {
        if (questions.length === 0) return;

        const randomIndex = Math.floor(Math.random() * questions.length);
        setCurrentQuestion(questions[randomIndex]);
    };

    return (
        <div className="quiz-form">
            <h1>Tietovisa</h1>

            <input
                type="text"
                placeholder="Kirjoita kysymys"
                value={question.text}
                onChange={(e) => setQuestion({ text: e.target.value })}
            />

            <button onClick={addQuestion}>Lisää kysymys</button>

            <p>Kysymys lisätty: {questions.length}</p>

            {isPlayVisible ? (
                <button onClick={playQuiz}>Pelaa</button>
            ) : null}

            {currentQuestion ? (
                <div className="current-question">
                    <h2>Satunnainen kysymys</h2>
                    <p>{currentQuestion.text}</p>
                </div>
            ) : null}

        </div>
    );
}
