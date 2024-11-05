import { UserStatusEnum } from "../_enums/user.status.enum";

export interface MyProfileModel {
    id: string;
    userId: number;
    contactNumber: string;
    emailId: string;
    userName: string;
    name: string;
    status: UserStatusEnum;
    hashedPassword: string;
    accountType: string;
    enableGlobalSearch: boolean;
    isEmailVerified: boolean;
    createdAt: number;
    creationDay: number;
    modifiedAt: number;
    webLoginCount: number;
    mobileLoginCount: number;
    allowMultipleLogin: boolean;
    reference: string;
    profileImageUrl: string;
}