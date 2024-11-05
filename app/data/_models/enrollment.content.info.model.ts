import { CourseContentEnum } from "../_enums/course.content.enum";

export interface EnrollmentContentInfoModel {
    type: CourseContentEnum;
    contentId: string;
    contentName: string;
    startedAt?: number;
    completedAt: number;
    quizPassed: boolean;
    quizPercentage: number;
    quizScore: number;
    userQuizId: string;
}