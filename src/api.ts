import axios from 'axios';

//////////////////////////////////////////////////
// 🔥 API URL
//////////////////////////////////////////////////
const API_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://kasuku-backend.onrender.com';

//////////////////////////////////////////////////
// 🔥 AXIOS INSTANCE
//////////////////////////////////////////////////
export const api = axios.create({
  baseURL: API_URL,

  withCredentials: false,
});

//////////////////////////////////////////////////
// 🔐 REQUEST INTERCEPTOR
//////////////////////////////////////////////////
api.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem('token');

    console.log(
      '🔥 TOKEN:',
      token,
    );

    //////////////////////////////////////////////////
    // 🔒 ATTACH TOKEN
    //////////////////////////////////////////////////
    if (
      token &&
      token !== 'undefined' &&
      token !== 'null'
    ) {

      config.headers =
        config.headers || {};

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) =>
    Promise.reject(error),
);

//////////////////////////////////////////////////
// 🚨 RESPONSE INTERCEPTOR
//////////////////////////////////////////////////
api.interceptors.response.use(

  (response) => response,

  (error) => {

    console.error(
      '❌ API ERROR:',
      error?.response || error,
    );

    const status =
      error?.response?.status;

    //////////////////////////////////////////////////
    // 🔒 UNAUTHORIZED
    //////////////////////////////////////////////////
    if (status === 401) {

      console.warn(
        '⚠️ Session expired',
      );

      //////////////////////////////////////////////////
      // 🔥 CLEAR SESSION
      //////////////////////////////////////////////////
      localStorage.removeItem(
        'token',
      );

      localStorage.removeItem(
        'user',
      );

      localStorage.removeItem(
        'userId',
      );

      localStorage.removeItem(
        'artistName',
      );

      localStorage.removeItem(
        'role',
      );

      //////////////////////////////////////////////////
      // 🔥 REDIRECT
      //////////////////////////////////////////////////
      if (
        window.location.pathname !==
        '/login'
      ) {
        window.location.href =
          '/login';
      }
    }

    //////////////////////////////////////////////////
    // 🚀 SUBSCRIPTION REQUIRED
    //////////////////////////////////////////////////
    if (status === 403) {

      console.warn(
        '🚀 Subscription required',
      );

      const currentPath =
        window.location.pathname;

      localStorage.setItem(
        'redirectAfterLogin',
        currentPath,
      );

      window.location.href =
        '/pricing';
    }

    return Promise.reject(error);
  },
);

//////////////////////////////////////////////////
// 🎵 RELEASE API
//////////////////////////////////////////////////

export const createRelease = (
  data: any,
) => {
  return api.post(
    '/releases/upload-full',
    data,
  );
};

export const getReleases = () => {
  return api.get('/releases');
};

export const getMyReleases = () => {
  return api.get('/releases/me');
};

export const uploadTrackToRelease = (
  releaseId: number,
  formData: FormData,
) => {

  return api.post(
    `/releases/${releaseId}/upload-track`,
    formData,
    {
      headers: {
        'Content-Type':
          'multipart/form-data',
      },
    },
  );
};

export const distributeRelease = (
  releaseId: number,
) => {
  return api.post(
    `/releases/${releaseId}/distribute`,
  );
};

export const deleteRelease = (
  id: number,
) => {
  return api.delete(
    `/releases/${id}`,
  );
};