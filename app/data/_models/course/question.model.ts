import { QuestionTypesEnum } from "../../_enums/question.types.enum";

export interface QuestionModel {
    id: string;
    question: string;
    score: number;
    type: QuestionTypesEnum;

}


