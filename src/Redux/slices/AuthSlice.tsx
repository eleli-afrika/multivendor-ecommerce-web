import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userProps } from "../../interface/common";
import {
  GetUserById,
  LogginOfUser,
  RegistrationOfUser,
  UpdateOfUser,
  loggedInUser,
} from "../hooks/user.actions";
import { toast } from "react-toastify";

// Define the initial state for the auth slice
interface AuthState {
  user: userProps | null;
  isLoading: boolean;
  userToken: string | null;
  theSeller: userProps | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  userToken: localStorage.getItem("userToken") || null,
  theSeller: null,
};

export const getLoggedInUser = createAsyncThunk(
  "auth/getLoggedInUser",
  async () => {
    const userToken = localStorage.getItem("userToken");

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
  }
);

export const RegisteringUser = createAsyncThunk(
  "auth/registeringUser",
  async (formData: any) => {
    try {
      const response = await RegistrationOfUser(formData);
      return response;
    } catch (error) {
      toast.error("Registration failed. Please check your credentials.");
      throw error;
    }
  }
);
export const LoggingUser = createAsyncThunk(
  "auth/logginguser",
  async (formData: any) => {
    try {
      const response = await LogginOfUser(formData);
      if (response.status === 200) {
        localStorage.setItem("userToken", response.data.token);
        toast.success(`welcome, ${response.data.message}`);
        return response;
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      throw error;
    }
  }
);

export const GettingUserById = createAsyncThunk(
  "auth/gettinguserbyid",
  async (id: any) => {
    const response = await GetUserById(id);
    console.log(response.data.Data);
    return response.data.Data;
  }
);

export const UpdattingOfUser = createAsyncThunk(
  "auth/updatingofuser",
  async ({ userid, formData }: { userid: string; formData: any }) => {
    const response = await UpdateOfUser(userid, formData);
    console.log(response.data.Data);
    return response.data.Data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("userToken");
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
        state.userToken = action.payload!.data.token;
      })
      .addCase(LoggingUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(GettingUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GettingUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update state.user with the user data received in the action payload
        state.theSeller = action.payload; // Adjust this to match your response structure
      })
      .addCase(GettingUserById.rejected, (state) => {
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
