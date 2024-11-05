

import { User } from '@/app/data/_models/user';
import axios from 'axios';


export class ReorderService {



    static async reorderCourseContent(courseId: string, contentIds: string[]) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/course/reorder/${courseId}`;
        try {
            const response = await axios.put(url, contentIds, {
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
    static async reorderQuizQuestions(quizId: string, questinIds: string[]) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/lms/quiz/reorder/${quizId}`;
        try {
            const response = await axios.put(url, questinIds, {
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