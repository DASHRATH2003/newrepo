import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import 'animate.css';
import { JobProvider } from "./components/context/JobContext";

// Import DevTools for development environment
import DevTools from './components/DevTools';

import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import About from './components/About';
import MissionVisionValues from './components/MissionVisionValues';
import OurCompany from './components/OurCompany';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import StaffingIntro from "./components/StaffingIntro";
import MissionVisionHomeSection from './components/MissionVisionHomeSection';
import CoreValuesHomeSection from './components/CoreValuesHomeSection';
import ClientsSection from "./components/ClientsSection";
import WhyChooseUs from "./components/WhyChooseUs";
import Services from './components/Services';
import StaffingSolutions from './components/StaffingSolutions';
import HRCompliance from './components/HRCompliance';
import IndustriesWeServe from './components/IndustriesWeServe';
import EmployerForm from './components/EmployerForm';
import Jobs from './components/Jobs';
import ViewJob from './components/ViewJob';
import WhatsAppFloatingIcon from './components/WhatsAppFloatingIcon';
import IenguriPopupForm from './components/IenguriPopupForm';
import JobManager from './components/admin/JobManager';
import AddJob from './components/admin/AddJob';
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/admin/Login";
import FreePlacementToast from "./components/FreePlacementToast";
import RecentJobPopup from './components/RecentJobPopup';

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="App">
      <Topbar />
      <Navbar />
      <FreePlacementToast/>
      <RecentJobPopup />

      {isHomePage && (
        <>
          <HeroSection />
          <StaffingIntro />
          <MissionVisionHomeSection />
          <Services />
          <CoreValuesHomeSection />
          <WhyChooseUs />
          <ClientsSection />
        </>
      )}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<></>} />
        <Route path="/about" element={<About />} />
        <Route path="/about/mission" element={<MissionVisionValues />} />
        <Route path="/about/company" element={<OurCompany />} />
        <Route path="/services/staffing" element={<StaffingSolutions />} />
        <Route path="/services/compliance" element={<HRCompliance />} />
        <Route path="/services/industries" element={<IndustriesWeServe />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/employer-form" element={<EmployerForm />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/view-job/:id" element={<ViewJob />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={
          <PrivateRoute><JobManager /></PrivateRoute>
        } />
        <Route path="/admin/manage-jobs" element={
          <PrivateRoute><JobManager /></PrivateRoute>
        } />
        <Route path="/admin/add-job" element={
          <PrivateRoute><AddJob /></PrivateRoute>
        } />
        <Route path="/admin/edit-job/:id" element={
          <PrivateRoute><AddJob /></PrivateRoute>
        } />
      </Routes>

      <Footer />
      <IenguriPopupForm />
      <WhatsAppFloatingIcon />
      <DevTools />
    </div>
  );
}

function App() {
  return (
    <JobProvider>
      <Router>
        <AppContent />
      </Router>
    </JobProvider>
  );
}

export default App;
