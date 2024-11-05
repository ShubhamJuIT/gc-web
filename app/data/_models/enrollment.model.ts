import { CourseContentEnum } from "../_enums/course.content.enum";
import { EnrollmentContentInfoModel } from "./enrollment.content.info.model";

export interface EnrollmentModel {
    id: string;
    courseId: string;
    unique: string;
    userId: number;
    enrolledAt: number;
    startedAt: number;
    userName: string;
    currentContentType: CourseContentEnum;
    currentContentId: string;
    progressPercentage: number;
    contents: EnrollmentContentInfoModel[];
};