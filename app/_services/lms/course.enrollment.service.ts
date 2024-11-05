

import { CourseContentEnum } from '@/app/data/_enums/course.content.enum';
import { User } from '@/app/data/_models/user';
import axios from 'axios';


export class CourseEnrollmentService {


    static async enrollInCourse(courseId: string) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/courseEnrollment/enroll/${courseId}`;
        try {
            const response = await axios.put(url, null, {
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

    static async myCourseEnrollments() {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/courseEnrollment/my`;
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

    static async isEnrolled(courseId: string) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/courseEnrollment/enrolled/${courseId}`;
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
    static async startCourse(courseId: string) {

        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/courseEnrollment/startCourse/${courseId}`;
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

    static async getNextCourseContent(courseId: string, contentType: CourseContentEnum, contentId: string) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/courseEnrollment/nextContent/${courseId}`;
        try {
            const response = await axios.put(url, {
                contentType,
                contentId
            }, {
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

    static async getCourseContent(courseId: string, data: {
        contentType: CourseContentEnum,
        contentId: string
    }) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/courseEnrollment/viewContent/${courseId}`;
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


    static async findPagiatedCourseEnrollment(options: {
        query?: string,
        searchType?: 'QUERY'
        page?: number,
        pageSize?: number,
        sortBy?: string,
        sortType?: string,
        fields?: string,
        courseId?: string,
    }) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/courseEnrollment/findPaginated`;
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




    static async getCourseEnrollmentInfo(courseEnrollmentId: string,) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/courseEnrollment/${courseEnrollmentId}`;
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

    private static setParams = (options: {
        query?: string,
        searchType?: 'QUERY',
        page?: number,
        pageSize?: number,
        sortBy?: string,
        sortType?: string,
        fields?: string,
        courseId?: string,
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

            if (options?.courseId) {
                httpParams.courseId = options.courseId
            }


        }
        return httpParams
    }

    static async getStudentCourseProgress(userId: number) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/courseEnrollment/user/${userId}`;
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

