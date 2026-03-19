import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { notificationsAPI } from '../../api/api';

export const fetchNotifications = createAsyncThunk('notifications/fetchAll', async () => {
    const res = await notificationsAPI.getAll();
    return res.data.data;
});

interface NotificationsState {
    notifications: unknown[];
    isLoading: boolean;
}

const initialState: NotificationsState = {
    notifications: [],
    isLoading: false,
};

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => { state.isLoading = true; })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.isLoading = false;
                state.notifications = action.payload || [];
            });
    },
});

export default notificationsSlice.reducer;
