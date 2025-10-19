
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { ChatBubbleIcon, XIcon, SendIcon, DnaIcon } from './IconComponents';
import type { ChatMessage } from '../types';
import { ChatRole } from '../types';

const API_KEY = typeof process !== 'undefined' && process.env ? process.env.API_KEY : undefined;

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chat, setChat] = useState<Chat | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (!API_KEY) {
            console.error("API_KEY is not set. Please set the API_KEY environment variable.");
            return;
        }
        if (isOpen && !chat) {
            const ai = new GoogleGenAI({ apiKey: API_KEY });
            const newChat = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: 'You are a friendly and knowledgeable sales assistant for Biomedionics, a company that sells and services advanced biomedical devices. Your goal is to help users find the right products or services for their needs. Be concise, helpful, and professional. Our main products are the "Diasense DPN Scanner" for non-invasive Diabetic Peripheral Neuropathy detection, and the "3D Bioprinter X1" for research. We also offer maintenance and repair services.',
                },
            });
            setChat(newChat);
            setMessages([{
                role: ChatRole.MODEL,
                text: "Hello! I'm the Biomedionics assistant. How can I help you with our Diasense scanner or 3D bioprinters today?"
            }]);
        }
    }, [isOpen, chat]);


    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chat) return;

        const userMessage: ChatMessage = { role: ChatRole.USER, text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const result = await chat.sendMessageStream({ message: input });
            let text = '';
            // Create a placeholder for the model's response
            setMessages(prev => [...prev, { role: ChatRole.MODEL, text: '' }]);

            for await (const chunk of result) {
                text += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { ...newMessages[newMessages.length - 1], text: text };
                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prev => [...prev, { role: ChatRole.MODEL, text: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-5 right-5 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 z-50"
                aria-label="Toggle Chat"
            >
                {isOpen ? <XIcon className="w-6 h-6" /> : <ChatBubbleIcon className="w-6 h-6" />}
            </button>

            <div className={`fixed bottom-20 right-5 w-full max-w-sm h-[60vh] bg-white rounded-lg shadow-2xl flex flex-col transition-all duration-300 ease-in-out z-40 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
                    <h3 className="font-bold text-lg">AI Assistant</h3>
                </div>

                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-start gap-2.5 my-2 ${msg.role === ChatRole.USER ? 'justify-end' : ''}`}>
                            {msg.role === ChatRole.MODEL && <DnaIcon className="w-8 h-8 p-1.5 bg-blue-100 text-blue-600 rounded-full" />}
                            <div className={`flex flex-col max-w-[320px] leading-1.5 p-3 border-gray-200 rounded-xl ${msg.role === ChatRole.USER ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white rounded-bl-none'}`}>
                                <p className="text-sm font-normal">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && messages[messages.length-1].role === ChatRole.USER && (
                         <div className="flex items-start gap-2.5 my-2">
                             <DnaIcon className="w-8 h-8 p-1.5 bg-blue-100 text-blue-600 rounded-full animate-pulse" />
                             <div className="flex flex-col max-w-[320px] leading-1.5 p-3 border-gray-200 rounded-xl bg-white rounded-bl-none">
                                <div className="flex space-x-1">
                                     <span className="w-2 h-2 bg-blue-200 rounded-full animate-bounce" style={{animationDelay: '0s'}}></span>
                                     <span className="w-2 h-2 bg-blue-200 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                                     <span className="w-2 h-2 bg-blue-200 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                                 </div>
                             </div>
                         </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t border-gray-200">
                    <form onSubmit={handleSendMessage} className="flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about Diasense or Bioprinters..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isLoading}
                        />
                        <button type="submit" className="ml-2 p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-blue-300 transition-colors" disabled={isLoading}>
                            <SendIcon className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Chatbot;
