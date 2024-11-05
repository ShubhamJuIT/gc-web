

import { User } from '@/app/data/_models/user';
import axios from 'axios';


export class QuizService {

    static async createQuiz(courseId: string, data: {
        title: string,
        description: string,
        passPercentage: number,
        durationInMin: number,
    }) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/course/quiz/${courseId}`;
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

    static async updateQuiz(quizId: string, data: {
        title: string,
        description: string,
        passPercentage: number,
        durationInMin: number,

    }) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/quiz/${quizId}`;
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
    static async deleteQuiz(quizId: string) {
        const url = `${process.env.NEXT_PUBLIC_LMS}/api/lms/quiz/${quizId}`;

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
    static async getQuiz(quizId: string) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/quiz/${quizId}`;
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







    static async updateQuizThumbnail(quizId: string, blob: Blob) {
        const url = `${process.env.NEXT_PUBLIC_LMS}/api/lms/quiz/thumbnail/${quizId}`;

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

    static async deleteQuizThumbnail(quizId: string) {
        const url = `${process.env.NEXT_PUBLIC_LMS}/api/lms/quiz/thumbnail/${quizId}`;

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





    static async startQuiz(courseId: string, quizId: string) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/courseEnrollment/startQuiz/${courseId}/${quizId}`;
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


    static async saveAndNextAnswer(userQuizId: string, data: {
        questionId: string,
        answerIndex?: number,
        answer?: string,
        answerIndexes?: number[],
        answers?: string[],
    }) {
        const url = `${process.env.NEXT_PUBLIC_LMS}/api/lms/userQuiz/saveAndNext/${userQuizId}`;
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