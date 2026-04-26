import { api } from './api';

export const walletApi = {
  getHistory: () => api.get('/payouts/history'),
  getWallet: () => api.get('/payouts/wallet'),
};