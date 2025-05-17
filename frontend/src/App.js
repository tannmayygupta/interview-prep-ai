import React from 'react';
import { ClerkProvider, SignIn, SignUp } from '@clerk/clerk-react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

// Clerk Publishable Key
const clerkPublishableKey = 'pk_test_c3VyZS1naG91bC04NC5jbGVyay5hY2NvdW50cy5kZXYk';

function App() {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <Router>
        <Routes>
          {/* Landing Page Route */}
          <Route path="/" element={<LandingPage />} />

          {/* Clerk Auth Routes */}
          <Route
            path="/sign-in"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <SignIn routing="path" path="/sign-in" redirectUrl="/dashboard" />
              </div>
            }
          />
          <Route
            path="/sign-up"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <SignUp routing="path" path="/sign-up" redirectUrl="/dashboard" />
              </div>
            }
          />

          {/* Dashboard Route */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </ClerkProvider>
  );
}

export default App;