import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MapView from "./pages/MapView";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Reports from "./pages/Reports"; // 1. Import the Reports page you created
import AuthLayout from "./components/AuthLayout"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard Route */}
        <Route 
          path="/dashboard"
          element={
            <AuthLayout>
              <Dashboard />
            </AuthLayout>
          }
        />

        {/* Map View Route */}
        <Route 
          path="/map"
          element={
            <AuthLayout>
              <MapView />
            </AuthLayout>
          }
        />

        {/* 2. Added Reports Route here to fix "Page Not Found" */}
        <Route 
          path="/reports"
          element={
            <AuthLayout>
              <Reports />
            </AuthLayout>
          }
        />
        
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
