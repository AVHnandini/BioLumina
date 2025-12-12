# 🔔 MemoryMate Notifications Guide

**Status**: ✅ **FULLY ENABLED & WORKING**

---

## 🎯 How to Enable Notifications

### Step 1: Go to MemoryMate
1. Open http://localhost:3000/memorymate
2. Register or login to your account

### Step 2: Enable Notifications
You'll see a button at the top right: **"🔔 Enable Notifications"**

Click this button to enable browser notifications.

### Step 3: Confirm Browser Permission
A browser dialog will appear asking to allow notifications from the site:
- Click **"Allow"** to enable notifications
- The button will turn green: **"🔔 Notifications Enabled"**

### Step 4: You're Ready!
Once enabled, you'll receive notifications when:
- You have a medicine due at the scheduled time
- The system checks every minute for due medicines

---

## 📲 What You'll Receive

When a medicine is due, you'll get:

### **Browser Notification**
- Title: 💊 MemoryMate Medicine Reminder
- Message: Shows your medicine name, dosage, and timing
- Icon: Displays medical symbol (⚕️)
- Persistent: Stays until you click it

### **Toast Alert** (Backup)
- Green notification appears top-right of your screen
- Shows medicine reminder details
- Auto-dismisses after 4 seconds
- Has animated entry/exit

---

## ⏰ When Notifications Trigger

Notifications are automatically checked every **1 minute** based on:

### **Morning Reminders** (6:00 AM - 11:59 AM)
- Medicines set to "morning" time
- Automatically checked during morning hours

### **Afternoon Reminders** (12:00 PM - 5:59 PM)
- Medicines set to "afternoon" time
- Automatically checked during afternoon hours

### **Night Reminders** (6:00 PM - 5:59 AM)
- Medicines set to "night" time
- Automatically checked during evening/night hours

---

## 🎨 Notification Features

### **Multiple Notification Methods**
1. **Browser Notifications** (Primary)
   - Works even in background tabs
   - Sound and visual indicators
   - Click to focus window

2. **Toast Alerts** (Fallback)
   - Appears on-screen automatically
   - Animated slide-in from right
   - Green color with medical icon
   - Auto-dismisses after 4 seconds

3. **On-Load Check**
   - When you open MemoryMate, it immediately checks for due medicines
   - No need to wait for the 1-minute check interval

---

## 🔧 Browser Compatibility

### **Browsers Supporting Notifications**
- ✅ Chrome (Desktop & Mobile)
- ✅ Firefox
- ✅ Edge
- ✅ Safari (macOS 10.14+)
- ✅ Opera

### **Not Supported**
- ❌ Internet Explorer
- ❌ Very old browser versions

---

## 🛠️ Troubleshooting

### **"Browser does not support notifications"**
- Your browser doesn't support notifications
- Try using Chrome, Firefox, Edge, or Safari

### **"Notifications are blocked"**
- You previously denied notifications
- Fix: Clear site permissions in your browser

**How to Reset:**
1. Click the lock icon in your browser's address bar
2. Find "Notifications" permission
3. Change from "Block" to "Ask" or "Allow"
4. Refresh the page and try again

### **Not receiving notifications?**
1. Make sure notifications are **enabled** (green button)
2. Keep the browser tab open or browser running
3. Check system volume is not muted
4. Check browser volume is not muted (some browsers have per-tab audio)
5. Make sure medicines have the correct time set

### **Notifications showing but empty message**
- Check your medicine dosage is entered correctly
- Restart the application
- Check browser console for errors

---

## 💡 Pro Tips

### **Test Notifications**
1. Enable notifications
2. You'll see a test notification: "🎉 MemoryMate Notifications Enabled!"
3. This confirms notifications are working

### **Set Medicines for Testing**
1. Set a medicine for the current time
   - Morning: Set for 7:00 AM time if it's morning
   - Afternoon: Set for 2:00 PM time if it's afternoon  
   - Night: Set for 8:00 PM time if it's evening

2. Wait up to 1 minute
3. You'll receive a notification when the time matches

### **Keep Browser Running**
- Notifications work best when:
  - Browser is open (tab can be background)
  - Computer is on
  - Internet connection is active

### **Multiple Medicines**
- If multiple medicines are due at the same time
- You'll get separate notifications for each
- Each will show its own details

---

## 🎯 Notification Contents

### **Browser Notification Format**
```
Title: 💊 MemoryMate Medicine Reminder

Body: 
Take Paracetamol
500mg, Once daily
Morning time

Icon: ⚕️
```

### **Toast Alert Format**
```
💊 Medicine Reminder:
Take Paracetamol 500mg, Once daily (Morning)
```

---

## ✅ Notification Status Indicators

### **Notifications Enabled** ✅
- Button is **green**: "🔔 Notifications Enabled"
- Text shows: "✅ Notifications are active - you'll receive medicine reminders!"
- Notifications will be sent for due medicines

### **Notifications Disabled** ⚠️
- Button is **gray**: "🔔 Enable Notifications"
- Text shows: "💡 Click 'Enable Notifications' above..."
- No notifications will be sent (but toast alerts still appear)

---

## 🔐 Privacy & Permissions

### **What We Don't Do**
- ❌ Never track your browser activity
- ❌ Never access your location
- ❌ Never access your contacts
- ❌ Never access your camera/microphone
- ❌ Never collect personal data

### **What Notifications Need**
- ✅ Permission to send browser notifications
- ✅ Your medicine schedule (only stored locally)
- ✅ Browser clock for timing checks

---

## 📋 Requirements for Notifications to Work

1. ✅ Browser supports notifications
2. ✅ Site has notification permission
3. ✅ MemoryMate dashboard is open (or browser running)
4. ✅ Medicines added with correct times
5. ✅ System/Browser audio not muted
6. ✅ Internet connection active

---

## 🚀 Complete Notification Setup

### **For Immediate Testing**
1. Go to MemoryMate
2. Click "Enable Notifications"
3. Approve browser permission
4. See test notification: "🎉 MemoryMate Notifications Enabled!"
5. Add a medicine with current/nearby time
6. Wait 1 minute and receive your first medicine reminder!

### **For Daily Use**
1. Keep the browser open
2. Medicines set with correct times
3. Notifications will fire automatically
4. Click notification to focus window
5. Take your medicine at the scheduled time

---

## 📞 Support

### **If Notifications Aren't Working**
1. Check browser support (Chrome/Firefox/Edge/Safari)
2. Verify permission is "Allow" (check address bar)
3. Check medicines have correct times
4. Verify system time is correct
5. Check browser console (F12) for errors
6. Try refreshing the page

### **Common Issues**
| Issue | Solution |
|-------|----------|
| No notifications | Enable in settings, check time matches |
| Wrong time | Verify medicine time settings match current time |
| No sound | Check system/browser volume |
| Missing message | Re-add medicine with complete info |
| Browser crashes | Try different browser |

---

## 🎉 You're All Set!

Notifications are now **fully enabled and ready to use**. 

### **Next Steps**
1. ✅ Enable notifications
2. ✅ Add medicines with correct times
3. ✅ Get automatic reminders
4. ✅ Never miss a dose!

---

**Feature**: Browser Push Notifications  
**Status**: ✅ **FULLY IMPLEMENTED & WORKING**  
**Last Updated**: December 11, 2025

