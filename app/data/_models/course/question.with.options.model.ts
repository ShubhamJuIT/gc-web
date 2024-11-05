import { QuestionTypesEnum } from "../../_enums/question.types.enum";

export interface QuestionWithOptionsModel {
    id: string;
    quizId: string;
    question: string;
    type: QuestionTypesEnum;
    score: number;
    wrongScore: number;
    options: { text: string, correct: boolean }[];
    correctAnswer: number[];
    creatorId: number;
    createdAt: number;
}
