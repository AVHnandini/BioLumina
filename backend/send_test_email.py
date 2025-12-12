"""
One-off script to send a test email using the Flask app's Mail instance.

Usage:
  cd backend
  venv\Scripts\activate.bat
  python send_test_email.py recipient@example.com

Fill `backend/.env` with valid SMTP credentials before running.
"""
import sys
from app import app


def send_test(recipient_email: str):
    with app.app_context():
        mail = app.mail
        from flask_mail import Message

        msg = Message(
            subject="MemoryMate Test Email",
            recipients=[recipient_email],
            body=("This is a test email sent from your local MemoryMate/ Symp toTwin setup."
                  " If you received this, SMTP is configured correctly."),
            sender=app.config.get('MAIL_DEFAULT_SENDER')
        )

        mail.send(msg)
        print(f"Test email sent to {recipient_email}")


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python send_test_email.py recipient@example.com")
        sys.exit(1)

    recipient = sys.argv[1]
    try:
        send_test(recipient)
    except Exception as e:
        print("Failed to send test email:", str(e))
        sys.exit(2)
