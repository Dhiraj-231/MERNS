import { createReducer } from "@reduxjs/toolkit";
const intitialstate = {
    isAuthenticated: false,
}
export const userReducer = createReducer(intitialstate, {
    LoginRequest: (state) => {
        state.loading = true;
    },
    LoginSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    LoginFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },

    registerRequest: (state) => {
        state.loading = true;
    },
    registerSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    registerFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },

    LoadUserRequest: (state) => {
        state.loading = true;
    },
    LoadUserSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    LoadUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },
    LogoutUserRequest: (state) => {
        state.loading = true;
    },
    LogoutUserSuccess: (state,) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
    },
    LogoutUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = true;
    },
    clearErrors: (state) => {
        state.error = null;
    },
});

export const postOfFollowingReducer = createReducer({}, {
    postOfFollowingRequest: (state) => {
        state.loading = true;
    },
    postOfFollowingSuccess: (state, action) => {
        state.loading = false;
        state.post = action.payload;

    },
    postOfFollowingFailed: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    clearErrors: (state) => {
        state.error = null;
    },
})

export const allUserReducer = createReducer({}, {
    allUserRequest: (state) => {
        state.loading = true;
    },
    allUserSuccess: (state, action) => {
        state.loading = false;
        state.allUser = action.payload;
    },
    allUserFailed: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
})

export const userProfileReducer = createReducer({}, {
    userProfileRequest: (state) => {
        state.loading = true;
    },
    userProfileSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
    },
    userProfileFailed: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
})