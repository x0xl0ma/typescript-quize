import React, { useState } from 'react';
import { fetchQuizQuestions, Difficulty, QuestionState } from './API'
import QuestionCard from './components/QuestionCard';

import { GlobalStyles, Wrapper } from './App.styles'

export type AnswerObject = {
  question: string;
  answer: string;
  correctAnswer: string;
  correct: boolean;
}

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [isLoading, setIsloading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuize = async () => {
    setIsloading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

    setQuestions(newQuestions);
    setNumber(0);
    setScore(0);
    setUserAnswers([]);
    setGameOver(false);
    setIsloading(false);

  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;

      const correct = questions[number].correct_answer === answer;

      if (correct) setScore(prevScore => prevScore + 1);

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };

      setUserAnswers([...userAnswers, answerObject])
    }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
    }
    else {
      setNumber(nextQuestion)
    }
  }

  console.log(gameOver, userAnswers)

  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <h1>React Quize</h1>

        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? <button className='start' onClick={startQuize}>
          Start
      </button> : null}

        {!gameOver && <p className='score'>Score: {score}</p>}
        {isLoading && <p>Loading questions...</p>}
        {!isLoading && !gameOver && <QuestionCard
          totalQuestions={TOTAL_QUESTIONS}
          questionNumber={number + 1}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />}

        {!isLoading && !gameOver && userAnswers.length === number + 1 && userAnswers.length !== TOTAL_QUESTIONS && <button className='next' onClick={nextQuestion}>Next Question</button>}
      </Wrapper>
    </>
  );
}

export default App;
