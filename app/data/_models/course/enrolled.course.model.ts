import { CourseModel } from "./course.model";




export interface EnrolledCourseModel {
    id: string;
    courseId: string;
    unique: string;
    userId: number;
    enrolledAt: number;
    courseModel: CourseModel;
    startedAt?: number;
    completedAt?: number;
    progressPercentage?: number;
}


