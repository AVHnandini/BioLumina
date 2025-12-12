import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Header Component - Navigation bar
 */
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-primary-600 to-teal-600 text-white shadow-medium">
      <div className="max-w-6xl mx-auto px-6 py-4">
        {/* Desktop Layout */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-2xl text-teal-600 font-bold">⚕️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">SymptoTwin</h1>
              <p className="text-xs opacity-80">Health Assistant</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:opacity-80 transition">
              Home
            </Link>
            <Link to="/assessment" className="hover:opacity-80 transition">
              Assessment
            </Link>
            <Link to="/memorymate" className="hover:opacity-80 transition flex items-center gap-1">
              <span>💊</span> MemoryMate
            </Link>
            <Link to="/medxplain" className="hover:opacity-80 transition flex items-center gap-1">
              <span>📋</span> MedXplain
            </Link>
            <Link to="/fakemed" className="hover:opacity-80 transition flex items-center gap-1">
              <span>🔍</span> FakeMed
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-xl"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-3 border-t border-white border-opacity-20 pt-4">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:opacity-80 transition"
            >
              Home
            </Link>
            <Link
              to="/assessment"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:opacity-80 transition"
            >
              Assessment
            </Link>
            <Link
              to="/memorymate"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:opacity-80 transition flex items-center gap-1"
            >
              <span>💊</span> MemoryMate
            </Link>
            <Link
              to="/medxplain"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:opacity-80 transition flex items-center gap-1"
            >
              <span>📋</span> MedXplain
            </Link>
            <Link
              to="/fakemed"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:opacity-80 transition flex items-center gap-1"
            >
              <span>🔍</span> FakeMed
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
