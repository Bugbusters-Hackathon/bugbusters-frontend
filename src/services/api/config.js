import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.response.use(
    response => response,
    error => {
      return Promise.reject(error);
    }
);

const request = async ({ ...options }) => {
    const onSuccess = response => {
        return response;
    }

    const onError = error => error

    return instance(options).then(onSuccess).catch(onError)
};

export default request;