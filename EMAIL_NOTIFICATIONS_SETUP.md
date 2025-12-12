# 📧 Email Notifications Setup Guide

**Status**: ✅ **FULLY IMPLEMENTED & READY TO CONFIGURE**

This guide will help you set up email notifications for MemoryMate medicine reminders.

---

## 🎯 What You Get

With email notifications enabled, you'll receive:

- **Formatted HTML emails** with your medicine details
- **Scheduled reminders** when medicines are due
- **Beautiful email templates** with medicine tables and dosage info
- **Dual notifications** (browser + email) for maximum reliability

---

## 📋 Prerequisites

1. ✅ Backend is running on port 5000
2. ✅ Frontend is running on port 3000
3. ✅ An email account (Gmail, Outlook, Yahoo, or custom SMTP)
4. ✅ Internet connection for sending emails

---

## 🔧 Setup Instructions

### Option 1: Gmail Setup (Easiest)

#### Step 1: Enable 2-Factor Authentication
1. Go to https://myaccount.google.com/
2. Click "Security" in the left menu
3. Enable "2-Step Verification"

#### Step 2: Create App Password
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" as the app
3. Select "Windows Computer" (or your device) as the device
4. Click "Generate"
5. Copy the 16-character password shown (you'll need this)

#### Step 3: Create .env File in Backend
In the folder `backend/`, create a file named `.env`:

```bash
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-16-char-app-password
MAIL_DEFAULT_SENDER=MemoryMate <noreply@memorymate.com>
```

**Replace:**
- `your-email@gmail.com` with your actual Gmail address
- `your-16-char-app-password` with the 16-character password from Step 2

#### Step 4: Install Python Dependencies
In PowerShell, navigate to the `backend` folder and run:

```powershell
pip install Flask-Mail python-dotenv
```

Or reinstall requirements:

```powershell
pip install -r requirements.txt
```

---

### Option 2: Outlook/Hotmail Setup

```
MAIL_SERVER=smtp-mail.outlook.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=your-email@outlook.com
MAIL_PASSWORD=your-password
```

---

### Option 3: Yahoo Mail Setup

```
MAIL_SERVER=smtp.mail.yahoo.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=your-email@yahoo.com
MAIL_PASSWORD=your-password
```

---

### Option 4: Custom SMTP Server

If you have your own email server or SMTP provider:

```
MAIL_SERVER=your-smtp-server.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=your-username
MAIL_PASSWORD=your-password
```

---

## 🚀 Enable Email Notifications in App

### Step 1: Restart Backend
1. Kill the current Flask server (Ctrl+C)
2. Start it again:
   ```powershell
   cd backend
   python app.py
   ```

### Step 2: Go to MemoryMate
1. Open http://localhost:3000/memorymate
2. Login with your account

### Step 3: Click Email Button
Look for the **"📧 Enable Email"** button at the top of the dashboard (blue button)
- Click it to enable email notifications
- Button will turn blue: **"📧 Email Enabled"**

### Step 4: Add a Medicine
1. Click **"➕ Add New Medicine"**
2. Fill in the medicine details:
   - **Name**: Any medicine (e.g., "Aspirin")
   - **Dosage**: Amount (e.g., "500mg")
   - **Frequency**: How often (e.g., "Once daily")
   - **Time**: When to take (e.g., "Morning")
   - **Dates**: Start and end date
3. Click **"✅ Save Medicine"**

### Step 5: Wait for Reminder
- The system checks for due medicines every **1 minute**
- When a medicine is due, you'll get:
  - 🔔 Browser notification (if enabled)
  - 📧 Email notification (if enabled)
  - 💬 Toast alert on screen

---

## 📧 What the Email Looks Like

When your medicine is due, you'll receive an email with:

```
Subject: 💊 MemoryMate - Medicine Reminder

Body:
Hi [Your Name],

This is your medicine reminder from MemoryMate. 
The following medicines are due now:

┌─────────────────┬──────────┬───────────────┐
│ Medicine Name   │ Dosage   │ Frequency     │
├─────────────────┼──────────┼───────────────┤
│ Aspirin         │ 500mg    │ Once daily    │
└─────────────────┴──────────┴───────────────┘

⏰ Action Required: Please take your medications as prescribed.

[View MemoryMate Dashboard Button]

You're receiving this email because you have medicine 
reminders enabled in MemoryMate.
```

---

## ✅ Test Your Setup

### Method 1: Manual Testing
1. Add a medicine with the **current time** as the time period
   - If it's 10 AM, set time to "Morning"
   - If it's 2 PM, set time to "Afternoon"
   - If it's 8 PM, set time to "Night"

2. Wait up to 1 minute
3. Check your email inbox (and spam folder!)
4. You should receive a reminder email

### Method 2: Check Logs
The backend will show email status:
- ✅ "Email notification sent successfully to [email]"
- ❌ "Failed to send medicine reminder email"

---

## 🔍 Troubleshooting

### "Email notifications blocked"

**Problem**: Button won't toggle or email isn't sending

**Solutions**:
1. Check `.env` file exists in `backend/` folder
2. Verify email credentials are correct
3. Check backend console for error messages
4. Make sure backend is running (`python app.py`)
5. Look for error in browser console (F12)

### "No email received"

**Problem**: Notifications say they're enabled but you didn't get email

**Solutions**:
1. **Check spam/junk folder** - emails might go there initially
2. **Add to contacts** - Mark email as "not spam" so future emails go to inbox
3. **Verify medicine timing** - Make sure medicine time matches current time
4. **Check time zone** - System uses your local time
5. **Wait 1 minute** - System checks every 60 seconds, not continuously

### "Gmail says 'Less secure app'"

**Problem**: Getting error about app passwords

**Solutions**:
1. Make sure you created an **App Password** (not regular password)
2. Use the 16-character password from myaccount.google.com/apppasswords
3. Do NOT use your regular Gmail password
4. Make sure 2-Factor Authentication is enabled

### "SMTP Connection Error"

**Problem**: Backend shows "Failed to connect to mail server"

**Solutions**:
1. Check email server address is correct
2. Verify port number (usually 587 for TLS)
3. Try `MAIL_USE_TLS=True` first, then `MAIL_USE_SSL=True`
4. Check internet connection
5. Some ISPs block port 587 - try different email provider

### "Authentication failed"

**Problem**: Shows "SMTP authentication failed"

**Solutions**:
1. Double-check username/password in `.env`
2. No extra spaces before/after credentials
3. Use app-specific password for Gmail (not main password)
4. Some email providers need special app passwords
5. Try escaping special characters: `password=p@ssw0rd!` → `password=p%40ssw0rd%21`

---

## 🔒 Security Notes

⚠️ **Important**: Never commit `.env` file to Git!

The `.env` file contains your email password and should be:
- ✅ Kept locally
- ✅ Added to `.gitignore`
- ❌ Never shared or uploaded
- ❌ Never committed to repository

---

## 📊 Notification Frequency

| Time Period | Hours | Checks |
|-------------|-------|--------|
| Morning | 6 AM - 12 PM | Every minute |
| Afternoon | 12 PM - 6 PM | Every minute |
| Night | 6 PM - 6 AM | Every minute |

---

## 🎯 How It Works

1. **You enable email notifications** → Button turns blue
2. **Add a medicine** with a specific time (morning/afternoon/night)
3. **System checks every 60 seconds** → Looks for due medicines
4. **Medicine is due** → System sends:
   - 🔔 Browser notification
   - 📧 Email with formatted table
   - 💬 Toast alert on screen
5. **You get reminded** → Can view email or browser notification

---

## 🚀 Advanced Configuration

### Custom Email Template

To customize the email appearance, edit `utils.py` in the `send_medicine_reminder_email()` function:

```python
html_body = f"""
<html>
  <body>
    <!-- Your custom HTML here -->
  </body>
</html>
"""
```

### Multiple Notifications

If multiple medicines are due at the same time:
- 📧 Each gets its own email
- 🔔 Each gets its own browser notification
- All shown in same batch in dashboard

### Disable Notifications Later

Click the **"📧 Email Enabled"** button again to toggle off:
- Button turns back to gray
- No more emails will be sent
- Browser notifications still work if enabled

---

## 📱 Mobile & Email Apps

- ✅ Works with Gmail app
- ✅ Works with Outlook app
- ✅ Works with Apple Mail
- ✅ Works with any standard email client
- ✅ Responsive design (works on mobile)

---

## 💡 Tips for Best Results

1. **Use Gmail** - Most reliable, easiest setup
2. **Enable both** - Browser notifications + Email for redundancy
3. **Check spam folder** - First few emails might go to spam
4. **Keep browser open** - Desktop notifications need browser running
5. **Add reminder time buffer** - Set time slightly before actual medication time
6. **Test with one medicine** - Before adding all your medicines
7. **Check time zone** - System uses your computer's local time

---

## 📞 Support

### If Email Isn't Working
1. Check backend logs (terminal window where `python app.py` runs)
2. Look for error messages starting with "Failed to send"
3. Check browser console (F12) for connection errors
4. Verify `.env` file exists in `backend/` folder
5. Restart backend after creating/modifying `.env`

### Common Error Messages

| Error | Meaning | Fix |
|-------|---------|-----|
| "Connection timed out" | Can't reach mail server | Check internet, verify server address |
| "Authentication failed" | Wrong username/password | Check `.env` credentials |
| "SSL error" | Security issue | Try `MAIL_USE_TLS=True` |
| "Port blocked" | ISP blocking port | Contact ISP or use different email |

---

## 🎉 Complete Setup Checklist

- [ ] Email account created (Gmail, Outlook, etc.)
- [ ] 2FA enabled (if using Gmail)
- [ ] App password generated (if using Gmail)
- [ ] `.env` file created in `backend/` folder
- [ ] Credentials added to `.env`
- [ ] `pip install -r requirements.txt` run
- [ ] Backend restarted (`python app.py`)
- [ ] MemoryMate opened in browser
- [ ] Login successful
- [ ] "📧 Enable Email" button clicked and turned blue
- [ ] Medicine added with time
- [ ] Waited 1-2 minutes
- [ ] Email received in inbox or spam folder
- [ ] Test successful! ✅

---

## 🚀 You're All Set!

Email notifications are now **fully implemented** and ready to use. Follow the steps above to configure your email and start receiving medicine reminders!

---

**Feature**: Email Push Notifications  
**Status**: ✅ **FULLY IMPLEMENTED & READY**  
**Last Updated**: December 11, 2025  
**Backend Files Modified**: app.py, models.py, memorymate_routes.py, utils.py, requirements.txt  
**Frontend Files Modified**: MemoryMateDashboard.jsx  

