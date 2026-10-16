'use client';
import { useState } from 'react';

export default function ChatWidget() {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ messages, setMessages ] = useState([
        { sender: 'bot', text: 'Hello! How can I help you find lab supplies or acids today?' }
    ]);
    const [ input, setInput ] = useState('');
    const [ loading, setLoading ] = useState(false);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = input;
        setMessages((prev) => [ ...prev, { sender: 'user', text: userMsg } ]);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('https://new.dawnscientific.com/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg }),
            });
            const data = await res.json();
            setMessages((prev) => [ ...prev, { sender: 'bot', text: data.reply } ]);
        } catch (err) {
            setMessages((prev) => [ ...prev, { sender: 'bot', text: 'Network error. Try again later.' } ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ldp-chat-widget">
    {!isOpen ? (
        <button
            onClick={() => setIsOpen(true)}
            className="ldp-chat-toggle"
            aria-label="Open Dawnscieitific Assistant"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="ldp-chat-icon"
            >
                <path
                    d="m22.5,9h-.5v-1c0-2.757-2.243-5-5-5h-4V1c0-.552-.447-1-1-1s-1,.448-1,1v2h-4c-2.757,0-5,2.243-5,5v1h-.5c-.827,0-1.5.673-1.5,1.5v3c0,.827.673,1.5,1.5,1.5h.5v1c0,2.757,2.243,5,5,5h7.697l3.963,2.642c.36.24.775.361,1.191.361.348,0,.696-.084,1.015-.255.699-.375,1.134-1.1,1.134-1.894v-6.855h.5c.827,0,1.5-.673,1.5-1.5v-3c0-.827-.673-1.5-1.5-1.5Zm-2.5,12.855c0,.022,0,.089-.078.13-.08.043-.136.004-.152-.007l-4.215-2.81c-.164-.109-.357-.168-.555-.168H7c-1.654,0-3-1.346-3-3v-8c0-1.654,1.346-3,3-3h10c1.654,0,3,1.346,3,3v13.855ZM7,9.5c0-.828.672-1.5,1.5-1.5s1.5.672,1.5,1.5-.672,1.5-1.5,1.5-1.5-.672-1.5-1.5Zm10,0c0-.828-.672-1.5-1.5-1.5S14,8.672,14,9.5s.672,1.5,1.5,1.5,1.5-.672,1.5-1.5Zm-.153,4.695c.294.468.152,1.085-.315,1.378-1.037.651-2.666,1.427-4.531,1.427s-3.494-.776-4.531-1.427c-.468-.293-.609-.911-.315-1.378.294-.467.911-.609,1.378-.316.815.512,2.079,1.121,3.469,1.121s2.653-.609,3.469-1.121c.466-.294,1.085-.152,1.378.316Z"
                    fill="currentColor"
                />
            </svg>
        </button>
    ) : (
        <div className="ldp-chat-window">
            <div className="ldp-chat-header">
                <span className="ldp-chat-title">
                    Dawnscieitifc Assistant
                </span>
                <button
                    onClick={() => setIsOpen(false)}
                    className="ldp-chat-close"
                    aria-label="Close chat"
                >
                    &times;
                </button>
            </div>

            <div className="ldp-chat-messages">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`ldp-message-row ${
                            msg.sender === "user"
                                ? "ldp-message-user-row"
                                : "ldp-message-bot-row"
                        }`}
                    >
                        <div
                            className={`ldp-message ${
                                msg.sender === "user"
                                    ? "ldp-message-user"
                                    : "ldp-message-bot"
                            }`}
                            dangerouslySetInnerHTML={{
                                __html: msg.text,
                            }}
                        />
                    </div>
                ))}

                {loading && (
                    <div className="ldp-typing">
                        <span>Dawn is typing</span>
                        <span className="ldp-typing-dots">
                            <span className="ldp-typing-dot" />
                            <span className="ldp-typing-dot" />
                            <span className="ldp-typing-dot" />
                        </span>
                    </div>
                )}
            </div>

            <form onSubmit={sendMessage} className="ldp-chat-form">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about products, prices..."
                    className="ldp-chat-input"
                />

                <button
                    type="submit"
                    className="ldp-chat-send"
                    aria-label="Send message"
                    disabled={loading || !input.trim()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="ldp-send-icon"
                    >
                        <path
                            d="M1.444,6.669a2,2,0,0,0-.865,3.337l3.412,3.408V20h6.593l3.435,3.43a1.987,1.987,0,0,0,1.408.588,2.034,2.034,0,0,0,.51-.066,1.978,1.978,0,0,0,1.42-1.379L23.991.021ZM2,8.592l17.028-5.02L5.993,16.586v-4Zm13.44,13.424L11.413,18h-4L20.446,4.978Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>
            </form>
        </div>
    )}
</div>
    );
}