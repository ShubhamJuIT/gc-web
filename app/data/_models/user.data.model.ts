import { AccoutTypesEnum } from "../_enums/account.types.enum";

export interface UserDataModel {
    id: string;
    userId: number;
    name: string;
    emailId: string;
    contactNumber: string;
    userName: string;
    accountType: AccoutTypesEnum;
    status: string;
    accessToken: string;
    profileImage: string;
}




