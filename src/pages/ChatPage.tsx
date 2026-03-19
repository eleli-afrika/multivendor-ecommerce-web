import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConversations, fetchMessages, setActiveConversation, addMessage } from '../Redux/slices/chatSlice';
import { AppDispatch, RootState } from '../Redux/store';
import { chatAPI } from '../api/api';
import { toast } from 'react-toastify';

const ChatPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { conversations, messages, activeConversationId } = useSelector((state: RootState) => state.chat);
    const authState = useSelector((state: RootState) => state.auth as unknown as Record<string, unknown>);
    const userToken = authState.userToken as string | null;

    const [newMessage, setNewMessage] = useState('');
    const [ws, setWs] = useState<WebSocket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dispatch(fetchConversations());
    }, [dispatch]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, activeConversationId]);

    const handleSelectConversation = (convId: string) => {
        dispatch(setActiveConversation(convId));
        dispatch(fetchMessages(convId));
        connectWebSocket(convId);
    };

    const connectWebSocket = (convId: string) => {
        if (ws) ws.close();

        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const wsUrl = apiUrl.replace('http', 'ws').replace('https', 'wss');
        const socket = new WebSocket(`${wsUrl}/ws/chat/${convId}?token=${userToken}`);

        socket.onopen = () => console.log('WebSocket connected');
        socket.onmessage = (event) => {
            try {
                const msg = JSON.parse(event.data);
                dispatch(addMessage({ convId, message: msg }));
            } catch { /* skip */ }
        };
        socket.onerror = () => toast.error('WebSocket connection failed');
        setWs(socket);
    };

    const handleSendMessage = () => {
        if (!newMessage.trim() || !activeConversationId) return;

        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(newMessage);
            // Optimistically add to UI
            const payload = JSON.parse(atob(userToken!.split('.')[1]));
            dispatch(addMessage({
                convId: activeConversationId,
                message: {
                    id: Date.now().toString(),
                    conversation_id: activeConversationId,
                    sender_id: payload.user_id,
                    message_text: newMessage,
                    is_read: false,
                    created_at: new Date().toISOString(),
                },
            }));
            setNewMessage('');
        } else {
            // Fallback: send via HTTP
            chatAPI.createConversation(activeConversationId);
        }
    };

    const getCurrentMessages = () => {
        if (!activeConversationId) return [];
        return (messages[activeConversationId] as unknown[]) || [];
    };

    const getUserId = () => {
        if (!userToken) return '';
        try {
            return JSON.parse(atob(userToken.split('.')[1])).user_id;
        } catch { return ''; }
    };

    const myUserId = getUserId();

    return (
        <div className="max-w-5xl mx-auto px-4 py-6 h-[calc(100vh-200px)]">
            <div className="flex gap-4 h-full">
                {/* Conversations List */}
                <div className="w-72 flex-shrink-0 bg-white rounded-lg shadow overflow-hidden flex flex-col">
                    <div className="p-4 border-b font-semibold">Messages</div>
                    <div className="flex-1 overflow-y-auto">
                        {(conversations as unknown[]).length === 0 ? (
                            <p className="text-center text-gray-500 text-sm py-8">No conversations yet</p>
                        ) : (
                            (conversations as unknown[]).map((conv: unknown) => {
                                const c = conv as Record<string, unknown>;
                                const isActive = c.id === activeConversationId;
                                return (
                                    <button
                                        key={c.id as string}
                                        onClick={() => handleSelectConversation(c.id as string)}
                                        className={`w-full text-left p-4 border-b hover:bg-gray-50 ${isActive ? 'bg-blue-50' : ''}`}
                                    >
                                        <p className="font-medium text-sm">Conversation</p>
                                        {(c.last_message as string) && (
                                            <p className="text-xs text-gray-500 truncate mt-1">{c.last_message as string}</p>
                                        )}
                                        {(c.unread_count as number) > 0 && (
                                            <span className="inline-block bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mt-1">
                                                {c.unread_count as number}
                                            </span>
                                        )}
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 bg-white rounded-lg shadow flex flex-col">
                    {!activeConversationId ? (
                        <div className="flex-1 flex items-center justify-center text-gray-400">
                            Select a conversation to start messaging
                        </div>
                    ) : (
                        <>
                            <div className="p-4 border-b font-semibold">Chat</div>
                            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                {getCurrentMessages().map((msg: unknown) => {
                                    const m = msg as Record<string, unknown>;
                                    const isMe = m.sender_id === myUserId;
                                    return (
                                        <div key={m.id as string} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-xs px-4 py-2 rounded-xl text-sm ${isMe ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                                                {m.message_text as string}
                                                <p className={`text-xs mt-1 ${isMe ? 'text-blue-200' : 'text-gray-400'}`}>
                                                    {new Date(m.created_at as string).toLocaleTimeString()}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div ref={messagesEndRef} />
                            </div>
                            <div className="p-4 border-t flex gap-2">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Type a message..."
                                    className="flex-1 border rounded-lg px-3 py-2 text-sm"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                                >
                                    Send
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
