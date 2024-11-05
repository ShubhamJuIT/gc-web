import { CourseStatusEnum } from "../../_enums/course.status.enum";
import { VideoTypesEnum } from "../../_enums/video.types.enum";
import { CourseContentModel } from "./course.content.model";

export interface CourseModel {
    createdAt: number;
    updatedAt?: number;
    creatorId: number;
    creatorName: string;
    creatorRole: string;
    description: string;
    durationInMin: number;
    id: string;
    introVideoLink?: string;
    introVideoType: VideoTypesEnum;
    introVideoUrl?: string;
    status: CourseStatusEnum
    title: string;
    thumbnailUrl?: string;
    contents?: CourseContentModel[],
    rejectReason?: string;
    deleteReason?: string;
    archiveReason?: string;
    restoreReason?: string;
    enrollmentCount?: number;
    featured?: boolean;
    basePrice?: number;
    salePrice?: number;



    // local use
    progressPercentage?: number;


}

