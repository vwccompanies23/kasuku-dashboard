import axios from 'axios';

// ✅ ADD THIS (environment-based URL)
const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000';

// ✅ Create API instance
export const api = axios.create({
  baseURL: API_URL, // 🔥 UPDATED (was localhost only)
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

    // ❌ DO NOT REMOVE TOKEN HERE
    if (error?.response?.status === 401) {
      console.warn('Unauthorized request ⚠️');

      // 🔥 JUST LOG — DO NOTHING ELSE
      // localStorage.removeItem('token'); ❌ REMOVE THIS LINE
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