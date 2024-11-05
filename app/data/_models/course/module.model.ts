import { VideoTypesEnum } from "../../_enums/video.types.enum";

export interface ModuleModel {
    id: string;
    title: string;
    courseId: string;
    description: string;
    introVideoType: VideoTypesEnum;
    introVideoLink: string;
    introVideoUrl: string;
    creatorId: number;
    createdAt: number;
    thumbnailUrl: string;
    thumbnailPath: string;
    introVideoPath: string;


}
