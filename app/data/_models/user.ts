import { AccoutTypesEnum } from "../_enums/account.types.enum";

export class User {
  static accessToken?: string;
  static accountType?: string;
  static isEmailVerified?: boolean;
  static isMobileVerified?: boolean;
  static userId?: number;
  static id?: string;
  static fullName?: string;
  static contactNumber?: string;
  static emailId?: string;
  static status?: string;
  static profileImage?: string;
  static userName?: string;



  static isLoggedIn() {

    this.init();
    if (User.accessToken && User.accessToken.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  static initilized = false;

  static init() {

    if (this.initilized) {
      return;
    }

    var data: string | null = localStorage?.getItem('currentUser');
    if (data != null) {
      var json = JSON.parse(data);
      this.cloneFromLocalStorageData(json);
      this.initilized = true;
    }
  }

  static store() {
    localStorage.setItem('currentUser', JSON.stringify({
      accessToken: User.accessToken,
      accountType: User.accountType,
      isEmailVerified: User.isEmailVerified,
      isMobileVerified: User.isMobileVerified,
      userId: User.userId,
      id: User.id,
      fullName: User.fullName,
      contactNumber: User.contactNumber,
      emailId: User.emailId,
      status: User.status,
      profileImage: User.profileImage,
      userName: User.userName
    }));
  }

  static loggedInCallback() {
  }

  static loggedOutCallback() {
    User.clear();

  }


  static cloneFromLoginData(loginData: any) {
    User.clear();

    User.accessToken = loginData.accessToken;
    User.accountType = loginData.accountType;
    User.isEmailVerified = loginData.isEmailVerified;
    User.isMobileVerified = loginData.isMobileVerified;
    User.userId = loginData.userId;
    User.id = loginData.id;
    User.fullName = loginData.name;
    User.contactNumber = loginData.contactNumber;
    User.emailId = loginData.emailId;
    User.status = loginData.status;
    User.profileImage = loginData.profileImage;
    User.userName = loginData.userName



    User.store();
  }

  static cloneFromLocalStorageData(temp: any) {
    if (!temp) {
      return;
    }

    User.accessToken = temp.accessToken;
    User.accountType = temp.accountType;
    User.isEmailVerified = temp.isEmailVerified;
    User.isMobileVerified = temp.isMobileVerified;
    User.userId = temp.userId;
    User.id = temp.id;
    User.fullName = temp.name;
    User.contactNumber = temp.contactNumber;
    User.emailId = temp.emailId;
    User.status = temp.status;
    User.profileImage = temp.profileImage;
    User.userName = temp.userName

  }

  static clear() {

    localStorage.removeItem('currentUser');
    User.accessToken = undefined;
    User.accountType = undefined;
    User.isEmailVerified = undefined;
    User.isMobileVerified = undefined;
    User.userId = undefined;
    User.id = undefined;
    User.fullName = undefined;
    User.contactNumber = undefined;
    User.emailId = undefined;
    User.status = undefined;
    User.profileImage = undefined;
    User.userName = undefined;
  }



  static getAccessToken() {
    if (!this.initilized) {
      User.init();
    }
    return User.accessToken;
  }



  static getUserId() {
    if (!this.initilized) {
      User.init();
    }
    return User.userId;
  }


  static updateLocalProfileData(data: any) {


    if (data?.emailId) {
      User.emailId = data.emailId;
    }
    if (data?.contactNumber) {
      User.contactNumber = data.contactNumber;
    }
    if (data?.userName) {
      User.userName = data.userName;
    }
    if (data?.name) {
      User.fullName = data.name;
    }
    User.profileImage = data.profileImage;
    User.store();
  }

  static isAdmin() {

    if (!this.initilized) {
      User.init();
    }
    return User.accountType === AccoutTypesEnum?.SUPER_ADMIN || User.accountType === AccoutTypesEnum?.ADMIN;



  }

}
