import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { chatAPI } from '../../api/api';

export const fetchConversations = createAsyncThunk('chat/fetchConversations', async () => {
    const res = await chatAPI.getConversations();
    return res.data.data;
});

export const fetchMessages = createAsyncThunk('chat/fetchMessages', async (convId: string) => {
    const res = await chatAPI.getMessages(convId);
    return { convId, messages: res.data.data };
});

interface ChatState {
    conversations: unknown[];
    messages: Record<string, unknown[]>;
    activeConversationId: string | null;
    isLoading: boolean;
}

const initialState: ChatState = {
    conversations: [],
    messages: {},
    activeConversationId: null,
    isLoading: false,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setActiveConversation: (state, action) => {
            state.activeConversationId = action.payload;
        },
        addMessage: (state, action) => {
            const { convId, message } = action.payload;
            if (!state.messages[convId]) {
                state.messages[convId] = [];
            }
            state.messages[convId].push(message);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchConversations.fulfilled, (state, action) => {
                state.conversations = action.payload || [];
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                const { convId, messages } = action.payload;
                state.messages[convId] = messages || [];
            });
    },
});

export const { setActiveConversation, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
