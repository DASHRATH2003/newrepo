import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import 'animate.css';

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
// import DeliverablesSection from "./components/DeliverablesSection"; // Commented out unused import
import ClientsSection from "./components/ClientsSection";
// import TestimonialsSection from "./components/TestimonialsSection"; // Commented out unused import
import WhyChooseUs from "./components/WhyChooseUs";
import Services from './components/Services';
import StaffingSolutions from './components/StaffingSolutions';
import HRCompliance from './components/HRCompliance';
import IndustriesWeServe from './components/IndustriesWeServe';
// import MultiStepForm from './components/MultiStepForm'; // Commented out unused import
import EmployerForm from './components/EmployerForm';
import Jobs from './components/Jobs';
import WhatsAppFloatingIcon from './components/WhatsAppFloatingIcon';
import IenguriPopupForm from './components/IenguriPopupForm';
import JobManager from './components/admin/JobManager';
import AddJob from './components/admin/AddJob';
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/admin/Login";
import RecentJobToasts from "./components/RecentJobToasts"
import FreePlacementToast from "./components/FreePlacementToast"

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <Topbar />
      <Navbar />
      <FreePlacementToast/>

      {isHomePage && (
        <>
          <HeroSection />
          <StaffingIntro />
          <MissionVisionHomeSection />
          <Services />
          {/* <MultiStepForm /> */}
          <CoreValuesHomeSection />
          {/* <DeliverablesSection /> */}
          <WhyChooseUs />
          <ClientsSection />
          {/* <TestimonialsSection /> */}
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
      <RecentJobToasts />
      <IenguriPopupForm />
      <WhatsAppFloatingIcon />
      <DevTools />

    </>
  );
}


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
