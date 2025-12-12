# 📧 Email Notifications - Quick Start

## ⚡ Quick Setup (5 Minutes)

### 1. **Create `.env` file in `backend/` folder**

```
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password-here
MAIL_DEFAULT_SENDER=MemoryMate <noreply@memorymate.com>
```

### 2. **Get App Password (Gmail users)**
- Go to https://myaccount.google.com/apppasswords
- Copy the 16-character password
- Paste it in `.env` as `MAIL_PASSWORD`

### 3. **Install Requirements**
```powershell
pip install Flask-Mail python-dotenv
```

### 4. **Restart Backend**
```powershell
python app.py
```

### 5. **Enable in App**
- Go to http://localhost:3000/memorymate
- Click **"📧 Enable Email"** button
- Button turns blue ✅

---

## 📧 What Gets Sent

**When a medicine is due:**

```
From: MemoryMate <noreply@memorymate.com>
To: your-email@gmail.com
Subject: 💊 MemoryMate - Medicine Reminder

Beautiful HTML email with:
- Your name
- Medicine name
- Dosage
- Frequency
- Link back to dashboard
```

---

## 🧪 Test It

1. **Add a medicine** with current time
   - Morning: 6 AM - 12 PM
   - Afternoon: 12 PM - 6 PM
   - Night: 6 PM - 6 AM

2. **Wait 1 minute**

3. **Check your email** (check spam folder too!)

---

## 🔧 Email Providers

| Provider | Server | Port | TLS |
|----------|--------|------|-----|
| Gmail | smtp.gmail.com | 587 | True |
| Outlook | smtp-mail.outlook.com | 587 | True |
| Yahoo | smtp.mail.yahoo.com | 587 | True |
| Custom | your-server.com | 587 | True |

---

## ❌ Troubleshooting

| Issue | Fix |
|-------|-----|
| Email not sent | Check `.env` has correct credentials |
| Can't find `.env` | Create text file named `.env` in `backend/` folder |
| Gmail blocked | Use App Password, not regular password |
| No email received | Check spam folder, wait 1 min, verify medicine time |

---

## 📱 Notifications You'll Get

✅ **Browser notification** (immediate, stays on screen)
✅ **Email notification** (formatted HTML, in your inbox)
✅ **Toast alert** (green popup on dashboard)

All three work together for maximum reliability!

---

See **EMAIL_NOTIFICATIONS_SETUP.md** for complete setup guide.

