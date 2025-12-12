import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Assessment from './pages/Assessment';
import Results from './pages/Results';
import MemoryMate from './pages/MemoryMate';
import MedXplain from './pages/MedXplain';
import FakeMedPage from './pages/FakeMed';
import './index.css';

/**
 * Main App Component with routing
 */
export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/results" element={<Results />} />
            <Route path="/memorymate" element={<MemoryMate />} />
            <Route path="/medxplain" element={<MedXplain />} />
            <Route path="/fakemed" element={<FakeMedPage />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}
