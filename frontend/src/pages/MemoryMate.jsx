import React, { useState } from 'react';
import MemoryMateLogin from '../components/MemoryMateLogin';
import MemoryMateDashboard from '../components/MemoryMateDashboard';

/**
 * MemoryMate Full Page
 */
export default function MemoryMatePage() {
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);

  const handleLoginSuccess = (email, name) => {
    setUserEmail(email);
    setUserName(name);
  };

  const handleLogout = () => {
    setUserEmail(null);
    setUserName(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        {!userEmail ? (
          <div className="max-w-md mx-auto">
            <MemoryMateLogin onLoginSuccess={handleLoginSuccess} />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <MemoryMateDashboard userEmail={userEmail} onLogout={handleLogout} />
          </div>
        )}
      </div>
    </div>
  );
}
