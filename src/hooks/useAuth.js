import { useEffect, useState } from 'react';

export function useAuth() {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // LOAD USER
  // =========================

  const loadUser = () => {

    try {

      const token =
        localStorage.getItem('token');

      const storedUser =
        localStorage.getItem('user');

      // ✅ NO TOKEN
      if (
        !token ||
        token === 'undefined' ||
        token === 'null'
      ) {

        setUser(null);

        setLoading(false);

        return;
      }

      // ✅ NO USER
      if (!storedUser) {

        setUser(null);

        setLoading(false);

        return;
      }

      const parsed =
        JSON.parse(storedUser);

      // ✅ NORMALIZE
      const normalizedUser = {

        ...parsed,

        // PLAN
        plan: Number(
          parsed?.plan || 0
        ),

        // SUBSCRIPTION
        subscriptionActive:
          parsed?.subscriptionActive === true ||
          parsed?.subscriptionActive === 'true',

        // FREE ACCESS
        freeAccess:
          parsed?.freeAccess === true ||
          parsed?.freeAccess === 'true',

        // OVERRIDE
        isFreeOverride:
          parsed?.isFreeOverride === true ||
          parsed?.isFreeOverride === 'true',

        // ROLE
        role:
          parsed?.role || 'user',
      };

      setUser(normalizedUser);

    } catch (err) {

      console.error(
        'AUTH LOAD ERROR:',
        err
      );

      localStorage.removeItem('token');

      localStorage.removeItem('user');

      setUser(null);

    } finally {

      setLoading(false);

    }

  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {

    loadUser();

  }, []);

  // =========================
  // AUTH CHANGES
  // =========================

  useEffect(() => {

    const syncAuth = () => {

      loadUser();

    };

    // ✅ CUSTOM EVENT
    window.addEventListener(
      'authChanged',
      syncAuth
    );

    // ✅ STORAGE EVENT
    window.addEventListener(
      'storage',
      syncAuth
    );

    return () => {

      window.removeEventListener(
        'authChanged',
        syncAuth
      );

      window.removeEventListener(
        'storage',
        syncAuth
      );

    };

  }, []);

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {

    localStorage.removeItem('token');

    localStorage.removeItem('user');

    localStorage.removeItem('role');

    localStorage.removeItem('plan');

    localStorage.removeItem(
      'subscriptionActive'
    );

    localStorage.removeItem(
      'selectedPlan'
    );

    localStorage.removeItem(
      'redirectAfterLogin'
    );

    localStorage.removeItem(
      'otp_pending'
    );

    localStorage.removeItem(
      'verifyEmail'
    );

    setUser(null);

    // ✅ FORCE REFRESH
    window.dispatchEvent(
      new Event('authChanged')
    );

  };

  return {

    user,

    loading,

    logout,

    refreshAuth: loadUser,

  };

}