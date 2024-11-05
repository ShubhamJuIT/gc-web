import { AccoutTypesEnum } from "../../_enums/account.types.enum";
import { UserStatusEnum } from "../../_enums/user.status.enum";

export interface AdminUserModel {
    accountType: AccoutTypesEnum;
    allowMultipleLogin: boolean;
    contactNumber: string;
    createdAt: number;
    creationDay: number;
    emailId: string;
    enableGlobalSearch: boolean;
    hashedPassword: string;
    id: string;
    mobileLoginCount: number;
    modifiedAt: number;
    name: string;
    reference: string;
    status: UserStatusEnum;
    userId: number;
    webLoginCount: number;
    profileImageUrl: string;
    lastLogin: number;
}