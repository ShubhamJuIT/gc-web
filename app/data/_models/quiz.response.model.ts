import { QuestionTypesEnum } from "../_enums/question.types.enum";
import { QuizModel } from "./course/quiz.model";
import { UserQuizModel } from "./user.quiz.model";




export interface QuizResponseModel {
    quizModel: QuizModel;
    userQuizModel: UserQuizModel;
    status: "IN_PROGRESS" | "COMPLETED";
    question: {
        id: string;
        quizId: string;
        question: string;
        type: QuestionTypesEnum
        score: number;
        wrongScore?: number;
        options?: string[];
    }

    lastQuestion: boolean;
    questionNo: number;
}