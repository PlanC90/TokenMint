import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import TokenForm from './components/TokenForm';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

const MainLayout: React.FC = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <section id="create" className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <TokenForm />
        </div>
      </section>
      <FAQ />
      <Footer
        onPrivacyClick={() => setIsPrivacyOpen(true)}
        onTermsClick={() => setIsTermsOpen(true)}
      />

      <LegalModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        title="Privacy Policy"
      >
        <PrivacyPolicy />
      </LegalModal>

      <LegalModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        title="Terms of Service"
      >
        <TermsOfService />
      </LegalModal>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;