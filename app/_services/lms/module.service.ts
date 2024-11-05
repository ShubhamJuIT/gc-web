

import { VideoTypesEnum } from '@/app/data/_enums/video.types.enum';
import { User } from '@/app/data/_models/user';
import axios from 'axios';


export class ModuleService {

    static async createModule(courseId: string, data: {
        title: string,
        description: string
    }) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/course/module/${courseId}`;
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

    static async updateModule(moduleId: string, data: {
        title: string,
        description: string,
        durationInMin?: number,
        introVideoType?: VideoTypesEnum,
        introVideoLink?: string,
    }) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/module/${moduleId}`;
        try {
            const response = await axios.put(url, data, {
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


    static async deleteModule(moduleId: string) {
        const url = `${process.env.NEXT_PUBLIC_LMS}/api/lms/module/${moduleId}`;

        try {
            const response = await axios.delete(url, {
                headers: {
                    "accept": "application/json",
                    "accessToken": User.getAccessToken()
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getModule(moduleId: string) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/module/${moduleId}`;
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




    static async getIntroVideoUploadLink(moduleId: string) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/module/introVideoUploadLink/${moduleId}`;
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



    static async updateIntroVideoInModule(moduleId: string, key: string) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/module/introVideoUploaded/${moduleId}`;
        try {
            const response = await axios.put(url, null, {
                headers: {
                    "accepts": "application/json",
                    "accessToken": User.getAccessToken(),

                },
                params: {
                    key
                }
            });
            return response.data
        } catch (error) {
            console.error(error);
            throw error
        }
    }


    static async updateModuleThumbnail(moduleId: string, blob: Blob) {
        const url = `${process.env.NEXT_PUBLIC_LMS}/api/lms/module/thumbnail/${moduleId}`;

        const formData = new FormData();
        formData.append('thumbnail', blob);

        try {
            const response = await axios.put(url, formData, {
                headers: {
                    "accept": "application/json",
                    "accessToken": User.getAccessToken(),
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async deleteModuleThumbnail(moduleId: string) {
        const url = `${process.env.NEXT_PUBLIC_LMS}/api/lms/module/thumbnail/${moduleId}`;

        try {
            const response = await axios.delete(url, {
                headers: {
                    "accept": "application/json",
                    "accessToken": User.getAccessToken()
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}