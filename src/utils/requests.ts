import axios from 'axios';

export const responseInterceptor = async (refreshToken: string, retryCallback: (token: string) => any) => {
    console.log(refreshToken);
    return axios.interceptors.response.use(function (response) {
        return response;
    }, async function (error) {
        if (error.response.status === 401) {
            const intercepteedResponse = await axios({
                method: 'post',
                url: import.meta.env.VITE_BASE_API_URL + '/auth/refresh',
                data: { refreshToken }
            });
            localStorage.setItem('accessToken', intercepteedResponse.data.accessToken);
            const retryResponse = await retryCallback(intercepteedResponse.data.accessToken);
            if (retryResponse.status === 200) {
                return retryResponse
            }
            return intercepteedResponse
        }
        return error.response
    });
}