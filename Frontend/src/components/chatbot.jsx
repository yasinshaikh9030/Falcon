import React, { useState } from "react";
import axios from "axios";
import "./chatbot.css";

function Chatbot() {
    const [input, setInput] = useState("");
    const [chatLog, setChatLog] = useState([]);
    const [loading, setLoading] = useState(false);

    const API_KEY = "AIzaSyDqRpVtFP0bREPknWMXf8rpvAoJ63D_zhg"; // Replace with your actual API key
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    const generateAnswer = async () => {
        if (!input.trim()) return;

        const newChat = [...chatLog, { type: "user", message: input }];
        setChatLog(newChat);
        setLoading(true);

        try {
            const response = await axios.post(API_URL, {
                contents: [{ parts: [{ text: input }] }],
            });

            const reply =
                response?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
                "No response from AI.";
            setChatLog([...newChat, { type: "bot", message: reply }]);
        } catch (err) {
            console.error("Error:", err);
            setChatLog([
                ...newChat,
                { type: "bot", message: "Something went wrong. Try again." },
            ]);
        }

        setInput("");
        setLoading(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") generateAnswer();
    };

    return (
        <div className="chatbot-container">
            <h2>Gemini Chatbot</h2>
            <div className="chatbox">
                {chatLog.map((msg, index) => (
                    <div key={index} className={`message ${msg.type}`}>
                        {msg.message}
                    </div>
                ))}
                {loading && <div className="message bot">Typing...</div>}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    placeholder="Ask something..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <button onClick={generateAnswer}>Send</button>
            </div>
        </div>
    );
}

export default Chatbot;
