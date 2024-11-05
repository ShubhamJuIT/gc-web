import axios from "axios";
import { User } from "../../data/_models/user";


export class OrderingService {

    static async createOrder(data: {
        courseId: string,
    }) {

        const url = process.env.NEXT_PUBLIC_LMS + `/api/ordering/order`;
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

    static async getOrder(orderId: string) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/ordering/order/${orderId}`;
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

    static async initiatePayment(data: {
        userId: number;
        orderId: string;
        finalAmount: number;
        currency: string;
        userName: string;
        emailId: string;
        contactNumber: string;
        description: string;
        successUrl: string;
        errorUrl: string;
        pendingUrl: string;
    }) {

        const url = process.env.NEXT_PUBLIC_LMS + `/api/ordering/payment/order`;
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

    static async findPagiatedOrders(options: {
        query?: string,
        searchType?: 'QUERY'
        page?: number,
        pageSize?: number,
        sortBy?: string,
        sortType?: string,
        fields?: string,
        status?: string,
    }) {
        const url = process.env.NEXT_PUBLIC_LMS + `/api/ordering/order/findPaginated`;
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

        }
        return httpParams
    }

}

