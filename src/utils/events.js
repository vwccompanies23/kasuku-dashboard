export const triggerDashboardRefresh = () => {
  window.dispatchEvent(new Event('dashboard-refresh'));
};