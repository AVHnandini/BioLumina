import React, { useState, useEffect, useRef } from 'react';
import { sendChatMessage } from '../services/chatApi';
import LoadingSpinner from './LoadingSpinner';

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const initialAssistant = {
    role: 'assistant',
    content: 'Hello 👋 — I am the SymptoTwin assistant. Ask me about symptoms, how to use the app, or where to get help.'
  };

  const [messages, setMessages] = useState([initialAssistant]);
  const [quickReplies, setQuickReplies] = useState([
    { id: 'symptom', label: 'Symptom Prediction', text: 'How do I use Symptom Prediction?' },
    { id: 'fakemed', label: 'Fake Medicine Detection', text: 'How can I check if a medicine is fake?' },
    { id: 'medxplain', label: 'MedXplain', text: 'What is MedXplain and how do I upload a prescription?' },
    { id: 'memorymate', label: 'MemoryMate', text: 'How do I set medication reminders in MemoryMate?' }
  ]);

  useEffect(() => {
    // Try loading FAQ list from backend and use it to refresh quick replies
    let mounted = true;
    import('../services/chatApi').then((mod) => {
      mod.getFaqList().then((faqs) => {
        if (!mounted || !faqs || !faqs.length) return;
        // Map the first 4 FAQ items into quick replies
        const mapped = faqs.slice(0, 4).map((f) => ({ id: f.id, label: f.question.split('?')[0], text: f.question }));
        setQuickReplies(mapped);
      }).catch(() => {});
    });
    return () => { mounted = false; };
  }, []);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, open]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }));
      const res = await sendChatMessage(userMessage.content, history);
      const reply = res.reply || (res.choices && res.choices[0] && res.choices[0].message && res.choices[0].message.content) || 'Sorry, I could not generate a response.';
      const disclaimer = res.disclaimer;
      setMessages((prev) => [...prev, { role: 'assistant', content: reply, source: res.source || 'openai', disclaimer }]);
    } catch (err) {
      console.error('Chat error', err);
      setMessages((prev) => [...prev, { role: 'assistant', content: 'An error occurred while contacting the chat service.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickReply = async (text) => {
    // send a quick-reply text as if the user typed it
    const userMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }));
      const res = await sendChatMessage(text, history);
      const reply = res.reply || 'Sorry, I could not generate a response.';
      const disclaimer = res.disclaimer;
      setMessages((prev) => [...prev, { role: 'assistant', content: reply, source: res.source || 'openai', disclaimer }]);
    } catch (err) {
      console.error('Quick reply error', err);
      setMessages((prev) => [...prev, { role: 'assistant', content: 'An error occurred while contacting the chat service.' }]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div>
      <button
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg"
        onClick={() => setOpen(!open)}
        aria-label="Open chat"
      >
        {open ? '✕' : '💬'}
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-11/12 max-w-md bg-white border rounded-lg shadow-lg">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="font-semibold">SymptoTwin Assistant</div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMessages([initialAssistant])}
                className="text-sm text-gray-600 hover:text-gray-800"
                title="Clear chat"
                aria-label="Clear chat"
              >
                Clear
              </button>
              <button onClick={() => setOpen(false)} className="text-gray-500">✕</button>
            </div>
          </div>
          <div className="p-3 border-b">
            <div className="flex gap-2 overflow-x-auto">
              {quickReplies.map((q) => (
                <button key={q.id} onClick={() => handleQuickReply(q.text)} className="text-xs whitespace-nowrap px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200">{q.label}</button>
              ))}
            </div>
          </div>
          <div ref={messagesRef} className="p-4 h-64 overflow-auto space-y-3">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                <div className={`rounded-lg p-2 px-3 text-sm ${m.role === 'assistant' ? 'bg-gray-100 text-gray-900' : 'bg-blue-600 text-white'}`}>
                  {m.content}
                  {m.disclaimer && m.role === 'assistant' && (
                    <div className="text-xs text-gray-500 mt-2">{m.disclaimer}</div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-sm text-gray-500">Assistant is typing…</div>
            )}
          </div>
          <div className="p-3 border-t">
            <div className="flex items-center space-x-2">
              <textarea
                rows={1}
                className="flex-grow border rounded-md p-2 text-sm resize-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Ask me something..."
              />
              <button onClick={handleSend} className="bg-blue-600 text-white rounded-md p-2">
                {loading ? <LoadingSpinner /> : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
