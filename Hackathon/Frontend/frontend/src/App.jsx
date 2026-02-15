import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { Hero } from "./Components/Hero";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import RegistrationPage from "./Pages/RegistrationPage";
import ResetPassword from "./Pages/ResetPassword";
import DecisionCard from "./Components/DecisionCard";
import Footer from "./Components/Footer";
import ECommerceDashboard from "./Pages/ECommerceDashboard";
import EdtechDashboard from "./Pages/EdtechDashboard";
import FintechDashboard from "./Pages/FintechDashboard";
import HealthCareDashboard from "./Pages/HealthCareDashboard";

function Layout() {
  const location = useLocation();

  // Hide navbar on all auth pages (login, register, forgot)
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/RegistrationPage";

  return (
    <div className="bg-white min-h-screen text-gray-900">
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/RegistrationPage" element={<RegistrationPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />}/>
        <Route path="/decisionCard" element={<DecisionCard/>}/>
        <Route path="/Footer" element={<Footer/>}/>
        <Route path="/ecommerce" element={<ECommerceDashboard />} />
        <Route path="/edtech" element={<EdtechDashboard />} />
        <Route path="/fintech" element={<FintechDashboard />} />
        <Route path="/healthcare" element={<HealthCareDashboard />} />
        
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
