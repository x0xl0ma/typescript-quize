import React from 'react';
import { AnswerObject } from '../App'
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

type Props = {
    question: string;
    answers: string[];
    userAnswer: AnswerObject | undefined;
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    questionNumber: number;
    totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({ question, answers, userAnswer, callback, questionNumber, totalQuestions }) => {
    return (
        <Wrapper>
            <p className="number">
                Question: {questionNumber} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{ __html: question }} />
            <div>
                {answers.map((answer, index) => (
                    <ButtonWrapper key={index} correct={userAnswer?.correctAnswer === answer}
                        userClicked={userAnswer?.answer === answer}>
                        <button onClick={callback} value={answer} disabled={userAnswer ? true : false}>
                            <span dangerouslySetInnerHTML={{ __html: answer }} />
                        </button>
                    </ButtonWrapper>
                ))}
            </div>
        </Wrapper>
    )
}

export default QuestionCard;
