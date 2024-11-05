

import { User } from '@/app/data/_models/user';
import axios from 'axios';


export class UserProfileService {

    static async createMentor(data: {
        name: string,
        userName: string;
        emailId: string;
        contactNumber: string,
        password?: string;
        confirmPassword?: string;
    }) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/mentor`;
        try {
            const response = await axios.post(url, data, {
                headers: {
                    "accepts": "application/json",
                    "accessToken": User.getAccessToken(),

                },
            });
            return response.data
        } catch (error) {
            console.error(error);
            throw error
        }
    }






    static async getMentorProfile(userId: number) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/mentor/${userId}`;
        try {
            const response = await axios.get(url, {
                headers: {
                    "accepts": "application/json",
                    "accessToken": User.getAccessToken(),
                },
            });
            return response.data
        } catch (error) {
            console.error(error);
            throw error
        }
    }



    static async getStudentProfile(userId: number) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/student/${userId}`;
        try {
            const response = await axios.get(url, {
                headers: {
                    "accepts": "application/json",
                    "accessToken": User.getAccessToken(),
                },
            });
            return response.data
        } catch (error) {
            console.error(error);
            throw error
        }
    }






}