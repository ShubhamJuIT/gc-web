
import { User } from '@/app/data/_models/user';
import axios from 'axios';


export class AuthService {

    static async signup(data: {
        agreeTerms: boolean;
        userName: string;
        emailId: string;
        password: string;
        confirmPassword: string;
    }) {
        const url = process.env.NEXT_PUBLIC_AUTH + `/api/auth/signUp`;
        try {
            const response = await axios.post(url, data, {
                headers: {
                    "accepts": "application/json",
                    "ekoUser": "eko",

                },
            });
            User.cloneFromLoginData(response.data);
            return response.data
        } catch (error) {
            console.error(error);
            throw error
        }
    }


    static async signIn(data: {
        id: string;
        password: string;
    }) {
        const url = process.env.NEXT_PUBLIC_AUTH + `/api/auth/signIn`;
        try {
            const response = await axios.get(url, {
                headers: {
                    "accepts": "application/json",
                    "ekoUser": "eko",

                },
                params: {
                    id: data.id,
                    password: data.password
                }
            });
            User.cloneFromLoginData(response.data);
            return response.data
        } catch (error) {
            console.error(error);
            throw error
        }
    }




    static async autoSignIn() {
        const url = process.env.NEXT_PUBLIC_AUTH + `/api/auth/autoSignIn/${User.getAccessToken()}`;
        try {
            const response = await axios.get(url, {
                headers: {
                    "accepts": "application/json",
                    "accessToken": User.getAccessToken(),

                },
            });
            User.cloneFromLoginData(response.data);

            return response.data
        } catch (error) {
            console.error(error);
            throw error
        }
    }



    static async findPagiatedAccounts(options: {
        query?: string,
        searchType?: 'QUERY'
        page?: number,
        pageSize?: number,
        sortBy?: string,
        sortType?: string,
        fields?: string,
        accountType?: string
        status?: string,
    }) {
        const url = process.env.NEXT_PUBLIC_AUTH + `/api/auth/accounts/findPaginated`;
        let httpParams: any = {};
        try {
            const response = await axios.get(url, {
                headers: {
                    "accepts": "application/json",
                    "accessToken": User.getAccessToken(),

                },
                params: this.setParams(options, httpParams),
            });
            return response.data
        } catch (error) {
            console.error(error);
            throw error
        }
    }





    private static setParams = (options: {
        query?: string,
        searchType?: 'QUERY',
        page?: number,
        pageSize?: number,
        sortBy?: string,
        sortType?: string,
        fields?: string,
        accountType?: string,
        status?: string,
    }, httpParams: any) => {
        if (options) {
            if (options.query && options.query.length > 0) {
                httpParams.query = options.query;
            }
            if (options.searchType && options.searchType.length > 0) {
                httpParams.searchType = options.searchType;
            }
            if (options.pageSize && options.pageSize > 0) {
                httpParams.pageSize = options.pageSize;
            }

            if (options.page! >= 0) {
                httpParams.page = options.page;
            }

            if (options.sortBy && options.sortBy.length > 0) {
                httpParams.sortBy = options.sortBy;
            }
            if (options.sortType && options.sortType.length > 0) {
                httpParams.sortType = options.sortType;
            }

            if (options.fields && options.fields.length > 0) {
                httpParams.fields = options.fields;
            }

            if (options?.accountType) {
                httpParams.accountType = options.accountType
            }
            if (options?.status) {
                httpParams.status = options.status
            }

        }
        return httpParams
    }

    static async getMyProfile() {
        const url = process.env.NEXT_PUBLIC_AUTH + `/api/auth/accounts/profile`;
        try {
            const response = await axios.get(url, {
                headers: {
                    "accepts": "application/json",
                    "accessToken": User.getAccessToken(),
                },
            });

            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    static async updateMyProfile(data: {
        name: string;
        userName?: string;
        emailId: string;
        contactNumber: string;
        password?: string;
    }) {
        const url = process.env.NEXT_PUBLIC_AUTH + `/api/auth/accounts/profile`;
        try {
            const response = await axios.put(url, data, {
                headers: {
                    "accepts": "application/json",
                    "accessToken": User.getAccessToken(),
                },
            });
            User.updateLocalProfileData(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async updateProfileByUserId(userId: number, data: {
        name: string;
        userName?: string;
        emailId: string;
        contactNumber: string;
        password?: string;
    }) {
        const url = process.env.NEXT_PUBLIC_AUTH + `/api/auth/accounts/profile/${userId}`;
        try {
            const response = await axios.put(url, data, {
                headers: {
                    "accepts": "application/json",
                    "accessToken": User.getAccessToken(),
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }



    static async updateAccountStatus(userId: number, status: string) {
        const url = process.env.NEXT_PUBLIC_AUTH + `/api/auth/accounts/status/${userId}/${status}`;
        try {
            const response = await axios.put(url, null, {
                headers: {
                    "accepts": "application/json",
                    "accessToken": User.getAccessToken(),
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async updateAccountType(userId: number, accountType: string) {
        const url = process.env.NEXT_PUBLIC_AUTH + `/api/auth/accounts/type/${userId}/${accountType}`;
        try {
            const response = await axios.put(url, null, {
                headers: {
                    "accepts": "application/json",
                    "accessToken": User.getAccessToken(),
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async updateAccountImage(userId: number, image: Blob) {
        const url = process.env.NEXT_PUBLIC_AUTH + `/api/auth/accounts/image/${userId}`;
        try {
            const formData = new FormData();
            formData.append('image', image);
            const response = await axios.put(url, formData, {
                headers: {
                    "accepts": "application/json",
                    "accessToken": User.getAccessToken(),
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async deleteAccountImage(userId: number) {
        const url = process.env.NEXT_PUBLIC_AUTH + `/api/auth/accounts/image/${userId}`;
        try {
            const response = await axios.delete(url, {
                headers: {
                    "accepts": "application/json",
                    "accessToken": User.getAccessToken(),
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }





}