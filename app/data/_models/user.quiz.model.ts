export interface UserQuizModel {
    id: string;
    quizId: string;
    courseEnrollmentId: string;
    courseId: string;
    unique: string;
    status: string;
    userId: number;
    userName: string;
    startedAt: number;
    currentQuestionId: string;
    questions: string[];
    score: number;
    percentage: number;
    pass: boolean;
    completedAt: number;
    answers?: {
        questionId: string;
        startedAt: number;
        completedAt: number;
        answers?: string[];
        answerIndexes?: number[];
        answer?: string;
        answerIndex?: number;
        score: number;
        correct: boolean;

    }[];

};