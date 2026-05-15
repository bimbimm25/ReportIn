import React, { useState, useRef, useEffect } from 'react';
import { marked } from 'marked';
import '../styles/chatWidget.css';

const ChatWidget = () => {

    const [isOpen, setIsOpen] = useState(false);

    const [messages, setMessages] = useState([
        {
            sender: 'bot',
            text: 'Halo! Saya **AURA** 👋\n\nAda yang bisa saya bantu terkait pelaporan atau fitur aplikasi?'
        }
    ]);

    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleSend = async () => {

        if (input.trim() === '') return;

        const userMsg = {
            sender: 'user',
            text: input
        };

        setMessages((prev) => [...prev, userMsg]);

        setInput('');
        setIsLoading(true);

        try {

            const formData = new FormData();
            formData.append('message', userMsg.text);

            const response = await fetch(
                'http://localhost/apireportin/api/ai/chatbot.php',
                {
                    method: 'POST',
                    body: formData,
                }
            );

            const data = await response.json();

            if (data.status === 'success') {

                setMessages((prev) => [
                    ...prev,
                    {
                        sender: 'bot',
                        text: data.reply
                    }
                ]);

            } else {

                setMessages((prev) => [
                    ...prev,
                    {
                        sender: 'bot',
                        text: '❌ Terjadi kesalahan pada server.'
                    }
                ]);
            }

        } catch (error) {

            console.error(error);

            setMessages((prev) => [
                ...prev,
                {
                    sender: 'bot',
                    text: '❌ Gagal terhubung ke server.'
                }
            ]);

        } finally {

            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {

        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="chat-widget-container">

            {/* CHAT WINDOW */}
            {isOpen && (
                <div className="chat-window">

                    {/* HEADER */}
                    <div className="chat-header">

    <div className="chat-header-info">

        <div className="bot-avatar">
            <img
                src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
                alt="bot"
            />
        </div>

        <div>
            <h3>AURA</h3>
        </div>

    </div>

    <button
        className="close-btn"
        onClick={toggleChat}
    >
        ✕
    </button>

</div>

                    {/* BODY */}
                    <div className="chat-body">

                        {messages.map((msg, index) => (

                            <div
                                key={index}
                                className={`message-wrapper ${msg.sender}`}
                            >

                                <div className={`message ${msg.sender}`}>

                                    {msg.sender === 'bot' ? (

                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: marked.parse(msg.text)
                                            }}
                                        />

                                    ) : (
                                        <span>{msg.text}</span>
                                    )}

                                </div>

                            </div>

                        ))}

                        {isLoading && (
                            <div className="typing-container">

                                <div className="typing-dot"></div>
                                <div className="typing-dot"></div>
                                <div className="typing-dot"></div>

                            </div>
                        )}

                        <div ref={messagesEndRef} />

                    </div>

                    {/* INPUT */}
                    <div className="chat-input-area">

                        <input
                            type="text"
                            placeholder="Ketik pesan..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            disabled={isLoading}
                        />

                        <button
                            onClick={handleSend}
                            disabled={isLoading || input.trim() === ''}
                        >
                            ➤
                        </button>

                    </div>

                </div>
            )}

            {/* FLOATING BUTTON */}
            {!isOpen && (
                <button
                    className="chat-button"
                    onClick={toggleChat}
                >
                    💬
                </button>
            )}

        </div>
    );
};

export default ChatWidget;