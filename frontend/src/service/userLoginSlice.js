import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("USER_LOGIN", async (info, thunkAPI) => {

   try {
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };
      // console.log(info);
      const data = await axios.post("/api/auth/login", info, config);
      return data.data;
   } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
         error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
      );
   }
});

export const logout = createAsyncThunk("USER_LOGOUT", async (thunkAPI) => {
   try {
      localStorage.removeItem("aimsUserInfo");
      return true;
   } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
   }
});

export const userLoginSlice = createSlice({
   name: "user",
   initialState: {
      aimsUserInfo: localStorage.getItem("aimsUserInfo")
         ? JSON.parse(localStorage.getItem("aimsUserInfo"))
         : null,
      loading: false,
      error: null,
   },
   // reducers:
   extraReducers: (builder) => {
      builder
         .addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.aimsUserInfo = action.payload;
            localStorage.setItem(
               "aimsUserInfo",
               JSON.stringify(action.payload)
            );
         })
         .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.aimsUserInfo = null;
         })
         .addCase(logout.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(logout.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
            state.aimsUserInfo = null;
         })
         .addCase(logout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         });
   },
});

// export const { login } = userLoginSlice.actions;

export default userLoginSlice.reducer;
