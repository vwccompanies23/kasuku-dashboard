import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// ALL YOUR IMPORTS
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Success from './pages/Success';
import Signup from './pages/Signup';

import Withdraw from './pages/Withdraw';
import CreateRelease from './pages/CreateRelease';
import MyMusic from './pages/MyMusic';
import ConnectStripe from './pages/ConnectStripe';
import Profile from './pages/Profile';

import MusicPlayer from './components/MusicPlayer';

import Royalties from './pages/Royalties';
import Analytics from './pages/Analytics';

import Layout from './components/Layout';
import MyReleases from './pages/MyReleases';
import PublicRelease from './pages/PublicRelease';
import SmartLink from './pages/SmartLink';
import Payment from './pages/Payment';

import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Landing from './pages/Landing';
import ForgotPassword from './pages/ForgotPassword';
import Collaborators from './pages/Collaborators';
import Report from './pages/Report';

import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';

import Help from './pages/Help';
import Pricing from './pages/Pricing';
import About from './pages/About';

// ADMIN
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import AdminUsers from './pages/admin/AdminUsers.jsx';
import AdminApprovals from './pages/admin/AdminApprovals.jsx';
import AdminRevenue from './pages/admin/AdminRevenue.jsx';
import AdminSubscriptions from './pages/admin/AdminSubscriptions.jsx';
import AdminReferrals from './pages/admin/AdminReferrals.jsx';
import AdminActivity from './pages/admin/AdminActivity.jsx';
import AdminEmail from './pages/admin/AdminEmail.jsx';
import AdminSongs from './pages/admin/AdminSongs.jsx';
import AdminVideos from './pages/admin/AdminVideos.jsx';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminPosts from './pages/admin/AdminPosts';
import AdminWithdraw from './pages/admin/AdminWithdraw.jsx';
import AdminPayoutHistory from './pages/admin/AdminPayoutHistory';
import AdminFinanceDashboard from './pages/admin/AdminFinanceDashboard';
import AdminTax from './pages/admin/AdminTax';
import AdminAlbums from './pages/admin/AdminAlbums';

import AdminCopyrightClaims
from './pages/admin/AdminCopyrightClaims';

import AdminCopyrightReviewing
from './pages/admin/AdminCopyrightReviewing';

import AdminArtistVerifications
from './pages/admin/AdminArtistVerifications';

import AdminCopyrightApproved
from './pages/admin/AdminCopyrightApproved';

import AdminCopyrightRejected
from './pages/admin/AdminCopyrightRejected';

import AdminCopyrightStatus
from './pages/admin/AdminCopyrightStatus';

// SETTINGS
import Subscription from './settings/Subscription';
import SettingsLayout from './settings/SettingsLayout';
import Contact from './settings/Contact';
import Card from './settings/Card';
import Contract from './settings/Contract';
import ManageMusic from './pages/ManageMusic';
import DeleteAccount from './pages/DeleteAccount';

// OTHER
import TaxForm from './pages/TaxForm';
import PayoutOnboarding from './steps/PayoutOnboarding';
import PaypalWithdraw from './pages/PaypalWithdraw';
import EditRelease from './pages/EditRelease';
import Verify from './pages/Verify';
import CardForm from './settings/CardForm';
import StripeSuccess from './pages/StripeSuccess';

import DMCA from './pages/DMCA';
import RefundPolicy from './pages/RefundPolicy';
import CommunityGuidelines from './pages/CommunityGuidelines';
import CookiePolicy from './pages/CookiePolicy';
import CopyrightClaim from './pages/CopyrightClaim';
import ContentRules from './pages/ContentRules';
import VerifyArtist from './pages/VerifyArtist';

function App() {

  // =========================
  // AUTH STATE
  // =========================

  const [isAuth, setIsAuth] =
    useState(() => {

      const token =
        localStorage.getItem('token');

      return !!(
        token &&
        token !== 'undefined' &&
        token !== 'null'
      );

    });

  // =========================
  // AUTH SYNC
  // =========================

  useEffect(() => {

    const syncAuth = () => {

      const token =
        localStorage.getItem('token');

      if (
        token &&
        token !== 'undefined' &&
        token !== 'null'
      ) {

        setIsAuth(true);

      } else {

        setIsAuth(false);

      }

    };

    syncAuth();

    window.addEventListener(
      'storage',
      syncAuth
    );

    window.addEventListener(
      'authChanged',
      syncAuth
    );

    return () => {

      window.removeEventListener(
        'storage',
        syncAuth
      );

      window.removeEventListener(
        'authChanged',
        syncAuth
      );

    };

  }, []);

  // =========================
  // USER ACTIVITY
  // =========================

  useEffect(() => {

    const updateActivity = () => {

      localStorage.setItem(
        'lastActivity',
        Date.now().toString()
      );

    };

    window.addEventListener(
      'click',
      updateActivity
    );

    window.addEventListener(
      'keydown',
      updateActivity
    );

    updateActivity();

    return () => {

      window.removeEventListener(
        'click',
        updateActivity
      );

      window.removeEventListener(
        'keydown',
        updateActivity
      );

    };

  }, []);

  // =========================
  // CRISP CHAT
  // =========================

  useEffect(() => {

    window.$crisp = [];

    window.CRISP_WEBSITE_ID =
      'a9201a94-f3a2-460d-ae42-6b796c0b3ee2';

    const d = document;

    const s =
      d.createElement('script');

    s.src =
      'https://client.crisp.chat/l.js';

    s.async = true;

    d
      .getElementsByTagName('head')[0]
      .appendChild(s);

  }, []);

  // =========================
  // AUTO LOGOUT
  // =========================

  useEffect(() => {

    const interval =
      setInterval(() => {

        const last =
          localStorage.getItem(
            'lastActivity'
          );

        if (!last) return;

        const inactiveTime =
          Date.now() -
          Number(last);

        if (
          inactiveTime >
          60 * 60 * 1000
        ) {

          localStorage.clear();

          window.location.href =
            '/login';

        }

      }, 5000);

    return () =>
      clearInterval(interval);

  }, []);

  // =========================
  // PROTECT USER
  // =========================

  const protect =
    (component) => {

      return isAuth
        ? component
        : (
          <Navigate
            to="/login"
            replace
          />
        );

    };

  // =========================
  // PROTECT ADMIN
  // =========================

  const protectAdmin =
    (component) => {

      const role =
        (
          localStorage.getItem(
            'role'
          ) || ''
        ).toLowerCase();

      if (!isAuth) {

        return (
          <Navigate
            to="/login"
            replace
          />
        );

      }

      if (role !== 'admin') {

        return (
          <Navigate
            to="/dashboard"
            replace
          />
        );

      }

      return component;

    };

  return (

    <BrowserRouter>

      <Routes>

        {/* PUBLIC */}

        <Route
          path="/"
          element={
            isAuth
              ? (
                <Navigate
                  to="/dashboard"
                  replace
                />
              )
              : (
                <Landing />
              )
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/verify"
          element={<Verify />}
        />

        <Route
          path="/success"
          element={<Success />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/help"
          element={<Help />}
        />

        <Route
          path="/pricing"
          element={<Pricing />}
        />

        <Route
          path="/terms"
          element={<Terms />}
        />

        <Route
          path="/privacy"
          element={<Privacy />}
        />

        <Route
          path="/dmca"
          element={<DMCA />}
        />

        <Route
          path="/refund-policy"
          element={<RefundPolicy />}
        />

        <Route
          path="/community-guidelines"
          element={<CommunityGuidelines />}
        />

        <Route
          path="/cookie-policy"
          element={<CookiePolicy />}
        />

        <Route
          path="/copyright-claim"
          element={<CopyrightClaim />}
        />

        <Route
          path="/content-rules"
          element={<ContentRules />}
        />

        <Route
          path="/verify-artist"
          element={<VerifyArtist />}
        />

        <Route
          path="/stripe-success"
          element={<StripeSuccess />}
        />

        {/* PAYMENT */}

        <Route
          path="/payment"
          element={<Payment />}
        />

        <Route
          path="/payment-success"
          element={<PaymentSuccess />}
        />

        <Route
          path="/payment-cancel"
          element={<PaymentCancel />}
        />

        {/* PUBLIC MUSIC */}

        <Route
          path="/release/:slug"
          element={<PublicRelease />}
        />

        <Route
          path="/smart/:slug"
          element={<SmartLink />}
        />

        {/* USER ROUTES */}

        <Route
          path="/dashboard"
          element={
            protect(
              <Layout>
                <Dashboard />
              </Layout>
            )
          }
        />

        <Route
          path="/upload"
          element={
            protect(
              <Layout>
                <CreateRelease />
              </Layout>
            )
          }
        />

        <Route
          path="/create-release"
          element={
            protect(
              <Layout>
                <CreateRelease />
              </Layout>
            )
          }
        />

        <Route
          path="/music"
          element={
            protect(
              <Layout>
                <MusicPlayer />
              </Layout>
            )
          }
        />

        <Route
          path="/my-music"
          element={
            protect(
              <Layout>
                <MyMusic />
              </Layout>
            )
          }
        />

        <Route
          path="/my-releases"
          element={
            protect(
              <Layout>
                <MyReleases />
              </Layout>
            )
          }
        />

        <Route
          path="/analytics"
          element={
            protect(
              <Layout>
                <Analytics />
              </Layout>
            )
          }
        />

        <Route
          path="/royalties"
          element={
            protect(
              <Layout>
                <Royalties />
              </Layout>
            )
          }
        />

        <Route
          path="/withdraw"
          element={
            protect(
              <Layout>
                <Withdraw />
              </Layout>
            )
          }
        />

        <Route
          path="/withdraw/paypal"
          element={
            protect(
              <Layout>
                <PaypalWithdraw />
              </Layout>
            )
          }
        />

        <Route
          path="/connect-stripe"
          element={
            protect(
              <Layout>
                <ConnectStripe />
              </Layout>
            )
          }
        />

        <Route
          path="/profile"
          element={
            protect(
              <Layout>
                <Profile />
              </Layout>
            )
          }
        />

        <Route
          path="/collaborators"
          element={
            protect(
              <Layout>
                <Collaborators />
              </Layout>
            )
          }
        />

        <Route
          path="/report"
          element={
            protect(
              <Layout>
                <Report />
              </Layout>
            )
          }
        />

        <Route
          path="/tax"
          element={
            protect(
              <Layout>
                <TaxForm />
              </Layout>
            )
          }
        />

        <Route
          path="/onboarding"
          element={
            protect(
              <Layout>
                <PayoutOnboarding />
              </Layout>
            )
          }
        />

        <Route
          path="/edit/:id"
          element={
            protect(
              <Layout>
                <EditRelease />
              </Layout>
            )
          }
        />

        {/* SETTINGS */}

        <Route
          path="/settings"
          element={
            protect(
              <Layout>
                <SettingsLayout />
              </Layout>
            )
          }
        >

          <Route
            path="subscription"
            element={<Subscription />}
          />

          <Route
            path="contact"
            element={<Contact />}
          />

          <Route
            path="card"
            element={<Card />}
          />

          <Route
            path="contract"
            element={<Contract />}
          />

          <Route
            path="card-form"
            element={<CardForm />}
          />

          <Route
            path="music"
            element={<ManageMusic />}
          />

          <Route
            path="delete-account"
            element={<DeleteAccount />}
          />

        </Route>

        {/* ADMIN */}

        <Route
          path="/admin"
          element={
            protectAdmin(
              <AdminLayout />
            )
          }
        >

          <Route
            index
            element={<AdminDashboard />}
          />

          <Route
            path="users"
            element={<AdminUsers />}
          />

          <Route
            path="email"
            element={<AdminEmail />}
          />

          <Route
            path="approvals"
            element={<AdminApprovals />}
          />

          <Route
            path="revenue"
            element={<AdminRevenue />}
          />

          <Route
            path="subscriptions"
            element={<AdminSubscriptions />}
          />

          <Route
            path="referrals"
            element={<AdminReferrals />}
          />

          <Route
            path="activity"
            element={<AdminActivity />}
          />

          <Route
            path="analytics"
            element={<AdminAnalytics />}
          />

          <Route
            path="posts"
            element={<AdminPosts />}
          />

          <Route
            path="withdraw"
            element={<AdminWithdraw />}
          />

          <Route
            path="payouts"
            element={<AdminPayoutHistory />}
          />

          <Route
            path="finance"
            element={<AdminFinanceDashboard />}
          />

          <Route
            path="tax"
            element={<AdminTax />}
          />

          <Route
            path="approvals/songs"
            element={<AdminSongs />}
          />

          <Route
            path="approvals/videos"
            element={<AdminVideos />}
          />

          <Route
            path="approvals/albums"
            element={<AdminAlbums />}
          />

          <Route
            path="copyright-claims"
            element={<AdminCopyrightClaims />}
          />

          <Route
            path="copyright-reviewing"
            element={<AdminCopyrightReviewing />}
          />

          <Route
            path="copyright-approved"
            element={<AdminCopyrightApproved />}
          />

          <Route
            path="copyright-rejected"
            element={<AdminCopyrightRejected />}
          />

          <Route
            path="copyright-status"
            element={<AdminCopyrightStatus />}
          />

          <Route
            path="artist-verifications"
            element={<AdminArtistVerifications />}
          />

        </Route>

        {/* 404 */}

        <Route
          path="*"
          element={
            <div
              style={{
                color:'#fff',
                padding:20
              }}
            >
              Page not found
            </div>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;