import { CourseContentEnum } from "../../_enums/course.content.enum";

export interface CourseContentModel {
    type: CourseContentEnum,
    contentId: string,
    contentTitle: string,
    thumbnailUrl?: string,
    durationInMin: number;
    sequence: number;

}