# SymptoTwin Chatbot (BioLumina)

This document explains the hybrid chatbot implemented for the BioLumina (SymptoTwin) website.

Features
- Hybrid responses: checks a static FAQ dataset and falls back to OpenAI GPT when no FAQ answer matches.
- FAQ dataset is stored at `backend/data/faqs.json` and is used for exact or keyword-based matching.
- OpenAI integration is optional and enabled by setting `OPENAI_API_KEY` in your environment.

Endpoints
- `POST /api/chat` - { message: string, history: Array } → returns { success, reply, source, disclaimer, secure }
- `GET /api/faqs` - returns a brief list of FAQs for the frontend to show quick replies.

Security / HTTPS
- In development, the Flask server runs on HTTP. For production, run behind an HTTPS reverse proxy (nginx, cloud load balancer).
- Responses include a `secure` boolean indicating whether the request was over HTTPS.

Disclaimer
- Every reply includes or appends the disclaimer: "This chatbot provides guidance on website features only and is not a medical diagnosis tool."

Configuration
- Add `OPENAI_API_KEY` to your environment to enable GPT responses.
- Add `OPENAI_MODEL` (optional) to choose model. Default: `gpt-3.5-turbo`.

Notes
- The FAQ matching is simple keyword-based; feel free to extend it to use fuzzy matching or embeddings for better recall.
- The frontend `Chatbot.jsx` displays quick replies, a loading indicator, and the assistant messages.
