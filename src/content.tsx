import { MessageSquarePlus, Send, Sparkles, X } from 'lucide-react';
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { cn } from './lib/utils';
import { geminiService } from './services/chat.service';

function ChatInterface() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<
    { text: string; isUser: boolean; isTyping?: boolean }[]
  >([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    if (!isExpanded) {
      setIsExpanded(true);
    }

    setMessages((prev) => [...prev, { text: message, isUser: true }]);

    setMessages((prev) => [
      ...prev,
      { text: '', isUser: false, isTyping: true },
    ]);

    // Reset input
    setMessage('');

    try {
      setIsLoading(true);

      const aiResponse = await geminiService.sendMessage(message);

      setMessages((prev) => [
        ...prev.filter((msg) => !msg.isTyping),
        { text: aiResponse, isUser: false },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev.filter((msg) => !msg.isTyping),
        {
          text: error instanceof Error ? error.message : 'Error',
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <div
      className={cn(
        "fixed right-0 top-1/2 -translate-y-1/2 z-[2147483647] font-['Press_Start_2P']",
        isDarkMode ? 'dark' : ''
      )}
    >
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          className="floating-button pixel-button bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:hover:bg-amber-600 w-8 h-8 border-4 border-black relative transition-all"
        >
          <MessageSquarePlus
            className={cn(
              'w-[12px] h-[12px] text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform',
              isButtonHovered && 'scale-110'
            )}
          />
          {isButtonHovered && (
            <Sparkles className="w-4 h-4 text-white absolute -top-2 -right-2 animate-spin" />
          )}
        </button>
      )}

      {isOpen && (
        <div
          className={cn(
            'chat-container relative transition-all duration-300 ease-in-out',
            isExpanded ? 'w-[450px] h-[650px]' : 'w-[350px]'
          )}
        >
          <div className="bg-amber-400 dark:bg-amber-500 p-4 border-b-4 border-black flex justify-between items-center">
            <h2 className="text-lg font-bold text-black tracking-wide">
              DuckStrike
            </h2>
            <div className="flex gap-2">
              <button
                onClick={toggleDarkMode}
                className="pixel-button w-8 h-8 bg-white dark:bg-gray-700 border-2 border-black p-1"
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="pixel-button w-8 h-8 bg-white dark:bg-gray-700 border-2 border-black p-1"
              >
                <X className="w-4 h-4 text-black dark:text-white" />
              </button>
            </div>
          </div>

          {isExpanded && (
            <div className="retro-content flex-1 overflow-y-auto p-6 space-y-6 h-[calc(100%-140px)] bg-gray-50 dark:bg-gray-800">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-end space-x-2',
                    msg.isUser ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'message-bubble max-w-[80%] p-4 text-sm leading-relaxed border-4',
                      msg.isUser
                        ? 'bg-amber-400 dark:bg-amber-500 border-black text-black'
                        : 'bg-white dark:bg-gray-700 border-black text-black dark:text-white'
                    )}
                  >
                    {msg.isTyping ? (
                      <div className="typing-indicator">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                      </div>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="p-4 border-t-4 border-black bg-gray-50 dark:bg-gray-800">
            <div className="flex gap-3 relative">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type..."
                  className="w-full bg-white dark:bg-gray-700 border-4 border-black px-4 py-2 text-sm placeholder:text-black dark:placeholder:text-gray-500 focus:outline-none text-black dark:text-white"
                />
              </div>
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="pixel-button bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:hover:bg-amber-600 border-4 border-black px-4"
              >
                {isLoading ? '...' : <Send className="w-4 h-4 text-black" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const container = document.createElement('div');
container.id = 'duck-chain-assistant-root';
document.body.appendChild(container);

createRoot(container).render(
  <React.StrictMode>
    <ChatInterface />
  </React.StrictMode>
);
