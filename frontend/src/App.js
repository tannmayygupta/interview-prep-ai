// App.js
import {
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserButton,
} from "@clerk/clerk-react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";

function ProtectedPage() {
  return (
    <SignedIn>
      <div className="p-4">
        <UserButton />
        <h1 className="text-2xl font-bold">Welcome to the Interview Prep App!</h1>
      </div>
    </SignedIn>
  );
}

function RequireAuth({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* Landing Page Route */}
      <Route path="/" element={<LandingPage />} />

      {/* Clerk Auth Routes */}
      <Route
        path="/sign-in"
        element={
          <div className="min-h-screen flex items-center justify-center">
            <SignIn routing="path" path="/sign-in" />
          </div>
        }
      />
      <Route
        path="/sign-up"
        element={
          <div className="min-h-screen flex items-center justify-center">
            <SignUp routing="path" path="/sign-up" />
          </div>
        }
      />

      {/* Protected Dashboard Route */}
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <ProtectedPage />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
