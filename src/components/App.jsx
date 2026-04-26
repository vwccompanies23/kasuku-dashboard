import Dashboard from './pages/Dashboard';
import { Toaster } from 'react-hot-toast';

// ✅ ADDED (routing)
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <>
        {/* 🔥 GLOBAL TOAST */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1c1c1c',
              color: '#fff',
              border: '1px solid #333',
            },
            success: {
              style: {
                border: '1px solid #7c3aed',
              },
            },
            error: {
              style: {
                border: '1px solid #e11d48',
              },
            },
          }}
        />

        {/* 🚀 ROUTES (ADDED — Dashboard still default) */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancel" element={<PaymentCancel />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;