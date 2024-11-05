import { User } from "./_models/user";
import axios from 'axios'




export class Interceptor {
    static init() {

        // Add a response interceptor
        axios.interceptors.response.use(function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
        }, function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            // toast.error(error.response.data.message);
            //showErrorToast(error);

            if (error?.response?.status == 401) {
                User.clear();
                location.reload();
                // User.init();
            }
            return Promise.reject(error);
        });
    }
}