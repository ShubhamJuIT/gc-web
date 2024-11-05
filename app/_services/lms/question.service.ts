

import { QuestionTypesEnum } from '@/app/data/_enums/question.types.enum';
import { User } from '@/app/data/_models/user';
import axios from 'axios';


export class QuestionService {

    static async createQuestion(quizId: string, data: {
        question: string,
        score: number,
        wrongScore: number,
        type: QuestionTypesEnum,
        options: { text: string, correct: boolean }[]
    }) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/quiz/question/${quizId}`;
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

    static async updateQuestion(questionId: string, data: {
        question: string,
        score: number,
        type: QuestionTypesEnum,
        wrongScore: number,
        options: { text: string, correct: boolean }[]
    }) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/question/${questionId}`;
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


    static async deleteQuestion(questionId: string) {
        const url = `${process.env.NEXT_PUBLIC_LMS}/api/lms/question/${questionId}`;

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
    static async getQuestion(questionId: string) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/question/${questionId}`;
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