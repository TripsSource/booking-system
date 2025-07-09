import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import errorHandler from "@/utils/errorHandler";
import {
  CheckAuthenticated,
  ForgotPassword,
  Login,
  Register,
  ResetPassword,
  TokenValid,
  botCheck,
  suppilerInvoice,
} from "@/store/auth/index.api";

interface InitialState {
  toggleSideBar: boolean;
  toggleRtl: boolean;
  user: {
    email: string;
    isActive: boolean;
    isVerified: boolean;
    lastname: string;
    firstname: string;
    resetToken: any;
    role: string;
    _id: string;
  };
  permissions: { target: string; permission: string[] }[];
  loading: boolean;
}

const initialState: InitialState = {
  toggleSideBar: false,
  toggleRtl: false,
  user: {
    email: "",
    isActive: false,
    isVerified: false,
    lastname: "",
    firstname: "",
    resetToken: null,
    role: "",
    _id: "",
  },
  permissions: [],
  loading: false,
};

export const accountLoginAction = createAsyncThunk(
  "auth/login",
  errorHandler(Login)
);

export const checkAuthenticated = createAsyncThunk(
  "auth/checkauthenticated",
  errorHandler(CheckAuthenticated)
);

export const accountRegisterAction = createAsyncThunk(
  "auth/register",
  errorHandler(Register)
);

export const accountForgotPasswordAction = createAsyncThunk(
  "auth/forgotpassword",
  errorHandler(ForgotPassword)
);

export const accountResetPasswordAction = createAsyncThunk(
  "auth/resetpassword",
  errorHandler(ResetPassword)
);

export const accountValidAction = createAsyncThunk(
  "auth/tokenValid",
  errorHandler(TokenValid)
);

export const accountBotCheckAction = createAsyncThunk(
  "auth/login",
  errorHandler(botCheck)
);

export const suppilerInvoiceAction = createAsyncThunk(
  "/auth/invoice",
  errorHandler(suppilerInvoice)
);

const AuthReducers = createSlice({
  name: "AuthReducers",
  initialState,
  reducers: {
    setToggleSideBar: (state) => {
      state.toggleSideBar = !state.toggleSideBar;
    },
    responsiveSideBar: (state, action) => {
      state.toggleSideBar = action.payload;
    },
    setToggleRtl: (state) => {
      state.toggleRtl = !state.toggleRtl;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(accountLoginAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(accountLoginAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(accountLoginAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(accountRegisterAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(accountRegisterAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(accountRegisterAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(checkAuthenticated.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthenticated.fulfilled, (state, action) => {
        if (action.payload?.user) {
          state.user.lastname = action.payload.user.lastname;
          state.user.firstname = action.payload.user.firstname;
          state.user.email = action.payload.user.email;
          state.user.role = action.payload.user.role;
        }
        state.loading = false;
      })
      .addCase(checkAuthenticated.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(accountForgotPasswordAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(accountForgotPasswordAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(accountForgotPasswordAction.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(accountResetPasswordAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(accountResetPasswordAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(accountResetPasswordAction.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(accountValidAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(accountValidAction.fulfilled, (state, action) => {
        if (action.payload.user) {
          state.user = action.payload.user;
          state.permissions = action.payload.rolePermissions;
        }
        state.loading = false;
      })
      .addCase(accountValidAction.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const loadingState = (state: RootState) => state.AuthReducers.loading;
export const roleState = (state: RootState) => state.AuthReducers.user.role;
export const userState = (state: RootState) => state.AuthReducers.user;
export const permissionsState = (state: RootState) =>
  state.AuthReducers.permissions;

export const { setToggleSideBar, setToggleRtl, responsiveSideBar } =
  AuthReducers.actions;

export default AuthReducers.reducer;
