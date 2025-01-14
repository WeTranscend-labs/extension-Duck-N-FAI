import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { X, Send, MessageSquarePlus, Sparkles, Wallet, History, CreditCard } from 'lucide-react';
import { Button } from './components/ui/button';
import { cn } from './lib/utils';

function ChatInterface() {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<{ text: string; isUser: boolean; isTyping?: boolean }[]>([]);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const suggestions = [
        { text: "Send 1 DUCK to wallet", icon: <Wallet className="w-4 h-4" /> },
        { text: "Check my balance", icon: <CreditCard className="w-4 h-4" /> },
        { text: "Show transaction history", icon: <History className="w-4 h-4" /> }
    ];

    const filteredSuggestions = suggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(message.toLowerCase())
    );

    const handleSend = () => {
        if (!message.trim()) return;

        if (!isExpanded) {
            setIsExpanded(true);
        }

        setMessages([...messages, { text: message, isUser: true }]);
        setMessage('');
        setShowSuggestions(false);

        // Add typing indicator
        setMessages(prev => [...prev, { text: '', isUser: false, isTyping: true }]);

        // Simulate AI response
        setTimeout(() => {
            setMessages(prev => [
                ...prev.filter(msg => !msg.isTyping),
                { text: "I'm DuckChain Assistant. How can I help you today?", isUser: false }
            ]);
        }, 1500);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setMessage(suggestion);
        setShowSuggestions(false);
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
        <div className={cn(
            "fixed right-4 top-1/2 -translate-y-1/2 z-[2147483647] font-['Press_Start_2P']",
            isDarkMode ? 'dark' : ''
        )}>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                    className="floating-button pixel-button bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:hover:bg-amber-600 w-16 h-16 border-4 border-black relative transition-all"
                >
                    <MessageSquarePlus
                        className={cn(
                            "w-6 h-6 text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform",
                            isButtonHovered && "scale-110"
                        )}
                    />
                    {isButtonHovered && (
                        <Sparkles className="w-4 h-4 text-white absolute -top-2 -right-2 animate-spin" />
                    )}
                </button>
            )}

            {isOpen && (
                <div className={cn(
                    "chat-container relative transition-all duration-300 ease-in-out",
                    isExpanded ? "w-[450px] h-[650px]" : "w-[350px]"
                )}>
                    <div className="bg-amber-400 dark:bg-amber-500 p-4 border-b-4 border-black flex justify-between items-center">
                        <h2 className="text-lg font-bold text-black tracking-wide">
                            DuckChain
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
                                        "flex items-end space-x-2",
                                        msg.isUser ? "justify-end" : "justify-start"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "message-bubble max-w-[80%] p-4 text-sm leading-relaxed border-4",
                                            msg.isUser
                                                ? "bg-amber-400 dark:bg-amber-500 border-black text-black"
                                                : "bg-white dark:bg-gray-700 border-black text-black dark:text-white"
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
                                        setShowSuggestions(true);
                                    }}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    onFocus={() => setShowSuggestions(true)}
                                    placeholder="Type..."
                                    className="w-full bg-white dark:bg-gray-700 border-4 border-black px-4 py-2 text-sm placeholder:text-black dark:placeholder:text-gray-500 focus:outline-none text-black dark:text-white"
                                />
                                {showSuggestions && filteredSuggestions.length > 0 && (
                                    <div className="absolute bottom-full mb-2 w-full bg-white dark:bg-gray-700 border-4 border-black rounded-none shadow-lg">
                                        {filteredSuggestions.map((suggestion, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleSuggestionClick(suggestion.text)}
                                                className="w-full px-4 py-3 text-left text-sm hover:bg-amber-100 dark:hover:bg-gray-600 flex items-center gap-2 border-b-2 border-black last:border-b-0"
                                            >
                                                {suggestion.icon}
                                                <span className="font-poppins">{suggestion.text}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={handleSend}
                                className="pixel-button bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:hover:bg-amber-600 border-4 border-black px-4"
                            >
                                <Send className="w-4 h-4 text-black" />
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