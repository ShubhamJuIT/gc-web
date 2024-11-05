import { CourseContentEnum } from "../_enums/course.content.enum";
import { CourseModel } from "./course/course.model";
import { ModuleModel } from "./course/module.model";
import { QuizModel } from "./course/quiz.model";
import { EnrollmentModel } from "./enrollment.model";
import { UserQuizModel } from "./user.quiz.model";
export interface StudyAreaModel {
    courseModel: CourseModel;
    enrollmentModel: EnrollmentModel
    currentContentType: CourseContentEnum;
    moduleModel: ModuleModel;
    quizModel: QuizModel;
    certificateModel: any;
    openedList: string[];
    userQuizModel?: UserQuizModel;

    currentContentProgress: {
        completedAt: number;
        contentId: string;
        quizPassed: boolean;
        quizPercentage: number;
        quizScore: number;
        startedAt: number;
        type: CourseContentEnum;
        userQuizId: string;
    }
}


