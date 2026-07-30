import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnimatePresence } from 'framer-motion';

// Layouts
import MainLayout from './layouts/mainLayout';
import AuthLayout from './layouts/authLayout';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AIInput from './pages/AI_Input';
import DynamicForm from './pages/Dynamic_Form';
import Review from './pages/Review';
import Success from './pages/Success';

// Context
import { AuthProvider } from './context/AuthContext';
import { FormProvider } from './context/FormContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <FormProvider>
          <AnimatePresence mode="wait">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              {/* Protected Routes */}
              <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/ai-input" element={<AIInput />} />
                <Route path="/form" element={<DynamicForm />} />
                <Route path="/review" element={<Review />} />
                <Route path="/success" element={<Success />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </FormProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
