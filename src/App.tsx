import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

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

import Settings from './pages/Settings';
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

// ✅ ADMIN
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

// ✅ SETTINGS
import Subscription from './settings/Subscription';
import SettingsLayout from './settings/SettingsLayout';
import Contact from './settings/Contact';
import Card from './settings/Card';

// ✅ TAX + ONBOARDING
import TaxForm from './pages/TaxForm';
import PayoutOnboarding from './steps/PayoutOnboarding';
import PaypalWithdraw from './pages/PaypalWithdraw';
import AdminAlbums from './pages/admin/AdminAlbums';

function App() {
  const protect = (component) => {
    const token = localStorage.getItem('token');
    return token ? component : <Navigate to="/login" replace />;
  };

  const withLayout = (component) => {
    return <Layout>{component}</Layout>;
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/success" element={<Success />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/withdraw/paypal" element={protect(withLayout(<PaypalWithdraw />))} />

        {/* STATIC */}
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/help" element={<Help />} />

        {/* PAYMENT */}
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-cancel" element={<PaymentCancel />} />

        {/* PUBLIC RELEASE */}
        <Route path="/release/:slug" element={<PublicRelease />} />
        <Route path="/smart/:slug" element={<SmartLink />} />

        {/* TAX */}
        <Route path="/tax" element={<TaxForm />} />

        {/* ONBOARDING */}
        <Route path="/onboarding" element={protect(withLayout(<PayoutOnboarding />))} />

        {/* SETTINGS */}
        <Route path="/settings/subscription" element={protect(withLayout(<Subscription />))} />

        <Route path="/settings" element={protect(withLayout(<SettingsLayout />))}>
          <Route path="contact" element={<Contact />} />
          <Route path="card" element={<Card />} />
        </Route>

        {/* USER */}
        <Route path="/dashboard" element={protect(withLayout(<Dashboard />))} />
        <Route path="/upload" element={protect(withLayout(<CreateRelease />))} />
        <Route path="/create-release" element={protect(withLayout(<CreateRelease />))} />
        <Route path="/music" element={protect(withLayout(<MusicPlayer />))} />
        <Route path="/my-music" element={protect(withLayout(<MyMusic />))} />
        <Route path="/my-releases" element={protect(withLayout(<MyReleases />))} />
        <Route path="/analytics" element={protect(withLayout(<Analytics />))} />
        <Route path="/royalties" element={protect(withLayout(<Royalties />))} />
        <Route path="/withdraw" element={protect(withLayout(<Withdraw />))} />
        <Route path="/connect-stripe" element={protect(withLayout(<ConnectStripe />))} />
        <Route path="/profile" element={protect(withLayout(<Profile />))} />
        <Route path="/collaborators" element={protect(withLayout(<Collaborators />))} />
        <Route path="/report" element={protect(withLayout(<Report />))} />

        {/* PRICING */}
        <Route path="/pricing" element={<Pricing />} />

        {/* ADMIN */}
        <Route path="/admin" element={protect(<AdminLayout><AdminDashboard /></AdminLayout>)} />
        <Route path="/admin/users" element={protect(<AdminLayout><AdminUsers /></AdminLayout>)} />
        <Route path="/admin/email" element={protect(<AdminLayout><AdminEmail /></AdminLayout>)} />
        <Route path="/admin/approvals" element={protect(<AdminLayout><AdminApprovals /></AdminLayout>)} />
        <Route path="/admin/revenue" element={protect(<AdminLayout><AdminRevenue /></AdminLayout>)} />
        <Route path="/admin/subscriptions" element={protect(<AdminLayout><AdminSubscriptions /></AdminLayout>)} />
        <Route path="/admin/referrals" element={protect(<AdminLayout><AdminReferrals /></AdminLayout>)} />
        <Route path="/admin/activity" element={protect(<AdminLayout><AdminActivity /></AdminLayout>)} />
        <Route path="/admin/analytics" element={protect(<AdminLayout><AdminAnalytics /></AdminLayout>)} />
        <Route path="/admin/posts" element={protect(<AdminLayout><AdminPosts /></AdminLayout>)} />
        <Route path="/admin/approvals/songs" element={protect(<AdminLayout><AdminSongs /></AdminLayout>)} />
        <Route path="/admin/approvals/videos" element={protect(<AdminLayout><AdminVideos /></AdminLayout>)} />
        <Route path="/admin/payouts" element={protect(<AdminLayout><AdminPayoutHistory /></AdminLayout>)} />
        <Route path="/admin/finance" element={protect(<AdminLayout><AdminFinanceDashboard /></AdminLayout>)} />
        <Route path="/admin/withdraw" element={protect(<AdminLayout><AdminWithdraw /></AdminLayout>)} />
        <Route path="/admin/tax" element={protect(<AdminLayout><AdminTax /></AdminLayout>)} />
        <Route path="/admin/approvals/albums" element={<AdminAlbums />} />

        {/* ✅ SAFE FALLBACK */}
        <Route path="*" element={<div style={{color:'#fff', padding:20}}>Page not found</div>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;