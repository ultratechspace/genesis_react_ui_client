import axios from "axios";
import { addNotificationAction } from "../../app-redux/settings/settingsSlice";

let store: any;
export const injectStore = (_store: any) => {
  store = _store;
}; // Access store directly

export const ax = axios.create();

ax.interceptors.request.use(async (config: any) => {
  const idToken = localStorage.getItem("token");
  config.baseURL = process.env.REACT_APP_API_URL || "no/api";
  config.headers.common.Authorization = `Bearer ${idToken}`;
  return config;
});

let isRefreshing = false;
let failedQueue: any = [];
const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};
ax.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.isSuccess === true && res.status === 0) {
      // API Successfull
      if (res.successMessage !== "")
        store.dispatch(
          addNotificationAction({
            message: res.successMessage,
            options: { variant: "success" },
          })
        );
    } else if (res.isSuccess === false && res.status === 1) {
      // API Errors
      res.errors
        ? res.errors.map((x: any) => {
            store.dispatch(
              addNotificationAction({
                message: x,
                options: { variant: "error" },
              })
            );
          })
        : "";
    } else if (res.isSuccess === false && res.status === 4) {
      // API Validation Errors
      res.validationErrors
        ? res.validationErrors.map((x: any) => {
            store.dispatch(
              addNotificationAction({
                message: x.errorMessage,
                options: { variant: "error" },
              })
            );
          })
        : "";
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      store.dispatch(
        addNotificationAction({
          message: "You are unauthorized for this action",
          options: { variant: "error" },
        })
      );
    }
    if (error.response.status === 403 && !originalRequest._retry) {
      if (isRefreshing) {
        console.log("Refresh block");
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return ax(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise(function (resolve, reject) {
        const token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");
        const newForm = { token: `${token}`, refreshToken: `${refreshToken}` };
        ax.post("renew-token", newForm)
          .then(({ data }) => {
            localStorage.setItem("token", data.value.token);
            localStorage.setItem("refreshToken", data.value.refreshToken);
            ax.defaults.headers.common.Authorization = `Bearer ${data.value.token}`;
            originalRequest.headers.Authorization = `Bearer ${data.value.token}`;
            processQueue(null, data.value.token);
            resolve(ax(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }
    return Promise.reject(error);
  }
);
