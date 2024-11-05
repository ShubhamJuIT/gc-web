import { AccoutTypesEnum } from "../_enums/account.types.enum";
import { UserStatusEnum } from "../_enums/user.status.enum";

export interface MentorModel {
    accountStatus: UserStatusEnum;
    createdAt: number;
    id: string;
    name: string;
    userId: number;
    profileImageUrl: string;
    emailId: string;
    coursesCreated: number;
    publishedCourses: number;
    totalEnrollments: number;
    userName: string;
    contactNumber: string;
    accountType: AccoutTypesEnum;
    lastLogin: number;
    isMobileVerified: boolean;
    isEmailVerified: boolean;

}