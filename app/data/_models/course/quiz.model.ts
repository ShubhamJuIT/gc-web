import { QuestionModel } from "./question.model";
import { QuestionWithOptionsModel } from "./question.with.options.model";

export interface QuizModel {
    id: string;
    title: string;
    courseId: string;
    description: string;
    thumbnailPath: string;
    thumbnailUrl: string;
    creatorId: number;
    createdAt: number;
    questions: QuestionModel[];
    questionsModel?: QuestionWithOptionsModel[];
    totalQuestions: number;
    maxScore: number;
    durationInMin: number;
    passPercentage: number;
    creatorName: string;


}


