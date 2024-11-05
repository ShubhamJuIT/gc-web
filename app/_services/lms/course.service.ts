

import { VideoTypesEnum } from '@/app/data/_enums/video.types.enum';
import { User } from '@/app/data/_models/user';
import axios from 'axios';


export class CourseService {

    static async createCourse(title: string) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/course`;
        try {
            const response = await axios.post(url, null, {
                headers: {
                    "accepts": "application/json",
                    "accessToken": User.getAccessToken(),

                },
                params: {
                    title
                }
            });
            return response.data
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    static async updateCourse(courseId: string, data: {
        title: string,
        description: string,
        introVideoType: VideoTypesEnum,
        introVideoLink?: string,
    }) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/course/${courseId}`;
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

    static async getCourse(courseId: string) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/course/${courseId}`;
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


    static async getPublicCourseSSR(courseId: string) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/course/public/${courseId}`;
        const response = await fetch(url, {
            cache: "no-store",
            headers: {
                "accepts": "application/json",
                "ekoUser": "eko",
            },
        });

        if (!response.ok) {
            console.log(`error occure in url ${response.url}`)
            // console.log(response)
            return null;
        }
        return response.json();
    }
    static async findPagiatedPublicCoursesSSR(options: {
        query?: string,
        searchType?: 'QUERY',
        page?: number,
        pageSize?: number,
        sortBy?: string,
        sortType?: string,
        fields?: string,
        status?: string,
        feature?: boolean,
    }) {
        const baseUrl = process.env.NEXT_PUBLIC_LMS + `/api/lms/course/public/findPaginated`;

        // Build the query string from options
        const queryString = new URLSearchParams(this.setParams(options, {})).toString();

        const url = `${baseUrl}?${queryString}`;


        const response = await fetch(url, {
            cache: "no-store",
            headers: {
                "accepts": "application/json",
                "ekoUser": "eko",
            },
        });

        if (!response.ok) {
            console.log(`error occurred in url ${response.url}`);
            return null;
        }
        return response.json();
    }


    static async findPagiatedCourses(options: {
        query?: string,
        searchType?: 'QUERY'
        page?: number,
        pageSize?: number,
        sortBy?: string,
        sortType?: string,
        fields?: string,
        status?: string,
        userId?: number
    }) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/course/findPaginated`;
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
        status?: string,
        userId?: number,
        feature?: boolean
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
            if (options?.status) {
                httpParams.status = options.status
            }
            if (options?.userId) {
                httpParams.userId = options.userId
            }
            if (options?.feature !== undefined) {
                httpParams.feature = options?.feature
            }


        }
        return httpParams
    }




    static async getIntroVideoUploadLink(courseId: string) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/course/introVideoUploadLink/${courseId}`;
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



    static async updateIntroVideoInCourse(courseId: string, key: string) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/course/introVideoUploaded/${courseId}`;
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


    static async updateCourseThumbnail(courseId: string, blob: Blob) {
        const url = `${process.env.NEXT_PUBLIC_LMS}/api/lms/course/thumbnail/${courseId}`;

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

    static async deleteCourseThumbnail(courseId: string) {
        const url = `${process.env.NEXT_PUBLIC_LMS}/api/lms/course/thumbnail/${courseId}`;

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


    static async publishCourse(courseId: string) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/course/publish/${courseId}`;
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
    static async acceptCourse(courseId: string) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/course/accept/${courseId}`;
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

    static async rejectCourse(courseId: string, reason: string) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/course/reject/${courseId}`;
        try {
            const response = await axios.put(url, null, {
                headers: {
                    "accepts": "application/json",
                    "accessToken": User.getAccessToken(),

                },
                params: {
                    reason
                }
            });
            return response.data
        } catch (error) {
            console.error(error);
            throw error
        }
    }


    static async markCourseArchived(courseId: string, reason: string) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/course/markArchived/${courseId}`;
        try {
            const response = await axios.put(url, null, {
                headers: {
                    "accepts": "application/json",
                    "accessToken": User.getAccessToken(),
                },
                params: {
                    reason
                }
            });
            return response.data
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    static async markCourseDeleted(courseId: string, reason: string) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/course/markDeleted/${courseId}`;
        try {
            const response = await axios.put(url, null, {
                headers: {
                    "accepts": "application/json",
                    "accessToken": User.getAccessToken(),
                },
                params: {
                    reason
                }
            });
            return response.data
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    static async deleteCoursePermanently(courseId: string) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/course/${courseId}`;
        try {
            const response = await axios.delete(url, {
                headers: {
                    "accepts": "application/json",
                    "accessToken": User.getAccessToken()
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async restoreCourse(courseId: string, reason: string) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/course/restore/${courseId}`;
        try {
            const response = await axios.put(url, null, {
                headers: {
                    "accepts": "application/json",
                    "accessToken": User.getAccessToken(),
                },
                params: {
                    reason
                }
            });
            return response.data
        } catch (error) {
            console.error(error);
            throw error
        }
    }







    static async getMentorCoursesList(userId: number, options: {
        query?: string,
        searchType?: 'QUERY'
        page?: number,
        pageSize?: number,
        sortBy?: string,
        sortType?: string,
        fields?: string,
    }) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/course/mentor/${userId}`;
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
    static async toggleFeatureCourse(courseId: string, isFeatured: boolean) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/course/featured/${courseId}/${isFeatured}`;
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


    static async updateCoursePrice(courseId: string, data: { basePrice: number, salePrice: number }) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/course/price/${courseId}`;
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

}