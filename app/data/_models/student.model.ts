import { AccoutTypesEnum } from "../_enums/account.types.enum";
import { UserStatusEnum } from "../_enums/user.status.enum";

export interface StudentModel {
    accountStatus: UserStatusEnum;
    createdAt: number;
    id: string;
    name: string;
    userId: number;
    profileImageUrl: string;
    emailId: string;
    coursesEnrolled: number;
    coursesInProgress: number;
    coursesCompleted: number;
    creditPoints: number;
    redeemPoints: number;
    userName: string;
    contactNumber: string;
    accountType: AccoutTypesEnum;
    lastLogin: number;
    isMobileVerified: boolean;
    isEmailVerified: boolean;

}