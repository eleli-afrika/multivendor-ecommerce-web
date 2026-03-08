import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userProps } from '../../interface/common';
import {
    GetSellers,
    GetUserById,
    LogginOfUser,
    RegistrationOfUser,
    UpdateOfUser,
    loggedInUser,
} from '../hooks/user.actions';
import { toast } from 'react-toastify';

// Define the initial state for the auth slice
interface AuthState {
    user: userProps | null;
    isLoading: boolean;
    userToken: string | null;
    theSeller: userProps | null;
    sellers: userProps | [];
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    // userToken: localStorage.getItem('userToken') || '',
    userToken: localStorage.getItem('userToken'),
    theSeller: null,
    sellers: [],
};

export const getLoggedInUser = createAsyncThunk('auth/getLoggedInUser', async () => {
    const userToken = localStorage.getItem('userToken');
    // console.log(userToken);

    if (userToken) {
        try {
            const response = await loggedInUser();
            const userData: userProps = response.data.Data;
            return userData;
        } catch (error) {
            throw error;
        }
    }

    return null;
});

// export const RegisteringUser = createAsyncThunk(
//     'auth/registeringUser',
//     async ({ formData, navigate }: { formData: any; navigate: any }) => {
//         try {
//             const response = await RegistrationOfUser(formData);
//             toast.success('User created successfully');
//             setTimeout(() => {
//                 navigate('/login');
//             }, 2000);

//             if (response.status === 400) {
//                 if (response.data && response.data.Data && response.data.Data.Error) {
//                     toast.error(response.data.Data.Message);
//                     return Promise.reject(new Error(response.data.Data.Message));
//                 } else {
//                     return Promise.reject(
//                         new Error('An unexpected error occurred during registration.')
//                     );
//                 }
//             } else {
//                 return response;
//             }
//         } catch (error: any) {
//             console.error('Error in Registering User:', error.response.data.Error);
//             toast.error(error.response.data.Message);
//             return Promise.reject(error);
//         }
//     }
// );


export const RegisteringUser = createAsyncThunk(
    'auth/registeringUser',
    async ({ formData, navigate }: { formData: any; navigate: any }, { rejectWithValue }) => {
        try {
            const response = await RegistrationOfUser(formData);

            toast.success(response.data?.message || 'User created successfully');

            setTimeout(() => {
                navigate('/login');
            }, 2000);

            return response.data;
        } catch (error: any) {
            console.error('Full signup error:', error);
            console.error('Signup error data:', error?.response?.data);
            console.error('Signup error status:', error?.response?.status);

            const message =
                error?.response?.data?.message ||
                error?.response?.data?.Message ||
                error?.response?.data?.error ||
                error?.response?.data?.Error ||
                'Invalid data';

            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

// export const LoggingUser = createAsyncThunk(
//     'auth/logginguser',
//     async ({ formData, navigate }: { formData: any; navigate: any }) => {
//         try {
//             const response = await LogginOfUser(formData);
//             console.log(response.data);

//             if (response.status === 200) {
//                 localStorage.setItem('userToken', response.data.Data);
//                 toast.success(`Welcome, ${response.data.Message}`);
//                 setTimeout(() => {
//                     navigate('/');
//                 }, 2000);
//                 return response;
//             } else {
//                 toast.error(response.data.Message);
//                 return Promise.reject(new Error(response.data.Message));
//             }
//         } catch (error: any) {
//             toast.error(error.response.data.Message);
//             return Promise.reject(error);
//         }
//     }
// );


export const LoggingUser = createAsyncThunk(
    'auth/logginguser',
    async ({ formData, navigate }: { formData: any; navigate: any }, { rejectWithValue }) => {
        try {
            const response = await LogginOfUser(formData);

            const token = response?.data?.token;
            const message = response?.data?.message || 'Login successful';

            if (!token) {
                console.error("No token in login response:", response.data);
                return rejectWithValue("No token returned from server");
            }

            localStorage.setItem('userToken', token);
            toast.success(message);

            setTimeout(() => {
                navigate('/');
            }, 2000);

            return response.data;
        } catch (error: any) {
            console.error("login error:", error?.response?.data || error);

            const message =
                error?.response?.data?.message ||
                error?.response?.data?.Message ||
                error?.response?.data?.error ||
                error?.response?.data?.Error ||
                error?.message ||
                'Login failed';

            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

export const GettingUserById = createAsyncThunk('auth/gettinguserbyid', async (id: any) => {
    const response = await GetUserById(id);
    console.log(response.data.Data);
    return response.data.Data;
});

export const UpdattingOfUser = createAsyncThunk(
    'auth/updatingofuser',
    async ({ userid, formData }: { userid: string; formData: any }) => {
        const response = await UpdateOfUser(userid, formData);
        // console.log(response.data.Data);
        return response.data.Data;
    }
);

export const GettingSellers = createAsyncThunk('auth/getsellers', async () => {
    const response = await GetSellers();
    // console.log(response.data.Data);
    return response.data.Data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('userToken');
            state.userToken = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLoggedInUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLoggedInUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(getLoggedInUser.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(RegisteringUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(RegisteringUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(RegisteringUser.rejected, (state) => {
                state.isLoading = false;
            })

            .addCase(LoggingUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(LoggingUser.fulfilled, (state, action) => {
                state.isLoading = false;
                // Update userToken with the token received in the action payload
                state.userToken = action.payload!.data.Data;
            })
            .addCase(LoggingUser.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(GettingUserById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GettingUserById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.theSeller = action.payload;
            })
            .addCase(GettingUserById.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(GettingSellers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GettingSellers.fulfilled, (state, action) => {
                state.isLoading = false;
                // Update state.user with the user data received in the action payload
                state.sellers = action.payload; // Adjust this to match your response structure
            })
            .addCase(GettingSellers.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(UpdattingOfUser.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(UpdattingOfUser.fulfilled, (state, action) => {
                state.isLoading = false;
                // Handle the fulfilled action here, e.g., update user data
                state.user = action.payload;
            })
            .addCase(UpdattingOfUser.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
