import axios from 'axios';

const API_URL =
  import.meta.env.VITE_API_URL ||
  'https://kasuku-backend.onrender.com';

export const api = axios.create({
  baseURL: API_URL,
});

// ================================
// 🔐 REQUEST INTERCEPTOR
// ================================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    console.log('🔥 TOKEN:', token);

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ================================
// 🚨 RESPONSE INTERCEPTOR (FIXED)
// ================================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API ERROR:', error?.response || error);

    if (error?.response?.status === 401) {
      console.warn('Unauthorized request ⚠️');
    }

    // 🔥 NEW
    if (error?.response?.status === 403) {
      console.warn('Subscription required 🚀');

      const currentPath = window.location.pathname;
      localStorage.setItem('redirectAfterLogin', currentPath);

      window.location.href = '/pricing';
    }

    return Promise.reject(error);
  }
);

// ========================================
// 🎵 RELEASE API (UNCHANGED)
// ========================================

export const createRelease = (data: any) => {
  return api.post('/releases/upload-full', data);
};

export const getReleases = () => {
  return api.get('/releases');
};

export const getMyReleases = () => {
  return api.get('/releases/me');
};

export const uploadTrackToRelease = (
  releaseId: number,
  formData: FormData
) => {
  return api.post(
    `/releases/${releaseId}/upload-track`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};

export const distributeRelease = (releaseId: number) => {
  return api.post(`/releases/${releaseId}/distribute`);
};

export const deleteRelease = (id: number) => {
  return api.delete(`/releases/${id}`);
};