import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * MemoryMate Medicine Dashboard Component
 */
export default function MemoryMateDashboard({ userEmail, onLogout }) {
  const [medicines, setMedicines] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(
    'Notification' in window && Notification.permission === 'granted'
  );
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: 'once',
    time_of_day: 'morning',
    start_date: '',
    end_date: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load medicines on mount
  useEffect(() => {
    // Request notification permission on load
    requestNotificationPermission();
    // Load email preference
    loadEmailPreference();
    loadMedicines();
    // Check for medicine reminders every minute
    const interval = setInterval(checkMedicineReminders, 60000);
    // Also check immediately on load
    checkMedicineReminders();
    return () => clearInterval(interval);
  }, []);

  const loadMedicines = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/memorymate/list_medicines/${userEmail}`
      );
      setMedicines(response.data.medicines || []);
    } catch (err) {
      setError('Failed to load medicines');
    }
  };

  const loadEmailPreference = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/memorymate/email_preference/${userEmail}`
      );
      setEmailNotificationsEnabled(response.data.email_notifications_enabled || false);
    } catch (err) {
      console.log('Could not load email preference');
    }
  };

  const toggleEmailNotifications = async () => {
    try {
      const newStatus = !emailNotificationsEnabled;
      const response = await axios.post(
        `http://localhost:5000/api/memorymate/email_preference/${userEmail}`,
        { enabled: newStatus }
      );
      
      if (response.data.success) {
        setEmailNotificationsEnabled(newStatus);
        showToast(response.data.message);
      }
    } catch (err) {
      setError('Failed to update email preference');
    }
  };

  const checkMedicineReminders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/memorymate/check_medicines/${userEmail}?send_email=${emailNotificationsEnabled}`
      );
      const dueMedicines = response.data.due_medicines || [];
      
      if (dueMedicines.length > 0) {
        dueMedicines.forEach(med => {
          // Show browser notification if permission granted
          if ('Notification' in window && Notification.permission === 'granted') {
            try {
              new Notification('💊 MemoryMate Medicine Reminder', {
                body: med.message,
                icon: '⚕️',
                tag: `medicine-${med.name}`,
                requireInteraction: true,
                badge: '💊'
              });
            } catch (notifErr) {
              console.error('Notification error:', notifErr);
            }
          }
          // Always show toast alert as backup
          showToast(med.message);
        });
        
        // Log email status
        if (response.data.email_sent) {
          console.log('Email notification sent successfully');
        }
      }
    } catch (err) {
      console.error('Error checking medicines:', err);
    }
  };

  const showToast = (message) => {
    // Enhanced toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse';
    toast.style.cssText = `
      position: fixed;
      top: 1rem;
      right: 1rem;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      z-index: 9999;
      font-weight: 600;
      border-left: 4px solid #fbbf24;
      animation: slideIn 0.3s ease-out;
    `;
    toast.innerHTML = `
      <div style="font-size: 0.95rem;">
        <strong>💊 Medicine Reminder:</strong><br>
        ${message}
      </div>
    `;
    document.body.appendChild(toast);
    
    // Add animation styles to document if not present
    if (!document.querySelector('style[data-toast-animation]')) {
      const style = document.createElement('style');
      style.setAttribute('data-toast-animation', 'true');
      style.textContent = `
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    setTimeout(() => {
      toast.style.animation = 'slideIn 0.3s ease-in reverse';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/memorymate/add_medicine',
        {
          email: userEmail,
          ...formData
        }
      );

      if (response.data.success) {
        setMedicines([...medicines, response.data.medicine]);
        setFormData({
          name: '',
          dosage: '',
          frequency: 'once',
          time_of_day: 'morning',
          start_date: '',
          end_date: ''
        });
        setShowForm(false);
        showToast('✅ Medicine added successfully!');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add medicine');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMedicine = async (medicineId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/memorymate/delete_medicine/${userEmail}/${medicineId}`
      );

      if (response.data.success) {
        setMedicines(medicines.filter(m => m.id !== medicineId));
        showToast('🗑️ Medicine deleted');
      }
    } catch (err) {
      setError('Failed to delete medicine');
    }
  };

  const requestNotificationPermission = () => {
    // Check if browser supports notifications
    if (!('Notification' in window)) {
      console.log('Browser does not support notifications');
      alert('Your browser does not support notifications');
      return;
    }

    // If permission already granted, do nothing
    if (Notification.permission === 'granted') {
      setNotificationEnabled(true);
      console.log('Notifications already enabled');
      return;
    }

    // If permission not decided, ask user
    if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          setNotificationEnabled(true);
          console.log('Notifications enabled by user');
          // Show a test notification
          try {
            new Notification('🎉 MemoryMate Notifications Enabled!', {
              body: 'You will now receive medicine reminders at the scheduled times',
              icon: '⚕️',
              badge: '💊',
              requireInteraction: false
            });
          } catch (err) {
            console.error('Error showing test notification:', err);
          }
        } else {
          setNotificationEnabled(false);
          console.log('Notifications permission denied');
        }
      }).catch(err => {
        console.error('Error requesting notification permission:', err);
        alert('Error requesting notification permission. Please enable notifications manually in your browser settings.');
      });
    } else {
      alert('Notifications are blocked. Please enable notifications in your browser settings for this site.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">💊 MemoryMate Dashboard</h2>
        <div className="space-x-2 flex items-center flex-wrap">
          <button
            onClick={requestNotificationPermission}
            className={`text-sm px-4 py-2 rounded-lg font-semibold transition ${
              notificationEnabled
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'btn-secondary'
            }`}
          >
            {notificationEnabled
              ? '🔔 Notifications Enabled'
              : '🔔 Enable Notifications'}
          </button>
          <button
            onClick={toggleEmailNotifications}
            className={`text-sm px-4 py-2 rounded-lg font-semibold transition ${
              emailNotificationsEnabled
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'btn-secondary'
            }`}
          >
            {emailNotificationsEnabled
              ? '📧 Email Enabled'
              : '📧 Enable Email'}
          </button>
          <button
            onClick={onLogout}
            className="btn-secondary text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="card bg-gradient-to-r from-primary-50 to-teal-50 border-2 border-primary-200">
        <p className="text-gray-700">
          Welcome! Keep track of your medications and receive timely reminders.
        </p>
        <div className="mt-3 space-y-2">
          {notificationEnabled && (
            <p className="text-green-700 text-sm font-semibold">
              ✅ Browser notifications are active - you'll receive medicine reminders!
            </p>
          )}
          {!notificationEnabled && 'Notification' in window && (
            <p className="text-blue-700 text-sm">
              💡 Click "Enable Notifications" above to get medicine reminders sent to your browser.
            </p>
          )}
          {emailNotificationsEnabled && (
            <p className="text-blue-700 text-sm font-semibold">
              📧 Email notifications are active - reminders will be sent to your email!
            </p>
          )}
          {!emailNotificationsEnabled && (
            <p className="text-orange-600 text-sm">
              📧 Enable email notifications above to receive reminders via email (requires SMTP configuration).
            </p>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Add Medicine Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          ➕ Add New Medicine
        </button>
      )}

      {/* Add Medicine Form */}
      {showForm && (
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Add Medicine</h3>
          <form onSubmit={handleAddMedicine} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Medicine Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Aspirin"
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Dosage*</label>
                <input
                  type="text"
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleChange}
                  placeholder="e.g., 500mg, 1 tablet"
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Frequency*</label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="once">Once daily</option>
                  <option value="twice">Twice daily</option>
                  <option value="thrice">Thrice daily</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Time of Day*</label>
                <select
                  name="time_of_day"
                  value={formData.time_of_day}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="night">Night</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Start Date*</label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">End Date*</label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? 'Saving...' : '✅ Save Medicine'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Medicines List */}
      <div>
        <h3 className="text-xl font-bold mb-4">Your Medicines</h3>
        {medicines.length === 0 ? (
          <div className="card text-center py-8">
            <p className="text-gray-500">No medicines added yet. Add your first medicine!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {medicines.map(medicine => (
              <div key={medicine.id} className="card">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-800">{medicine.name}</h4>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                      <p>💊 <strong>Dosage:</strong> {medicine.dosage}</p>
                      <p>⏰ <strong>Frequency:</strong> {medicine.frequency}</p>
                      <p>🕐 <strong>Time:</strong> {medicine.time_of_day}</p>
                      <p>📅 <strong>Duration:</strong> {medicine.start_date} to {medicine.end_date}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteMedicine(medicine.id)}
                    className="btn-secondary text-sm ml-4"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
