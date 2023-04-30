import { createReducer } from "@reduxjs/toolkit";

const intitialstate = {}

export const likeReducer = createReducer(intitialstate, {
    likeRequest: (state) => {
        state.loading = true;
    },
    likeSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    likeFailed: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    addCommentRequest: (state) => {
        state.loading = true;
    },
    addCommentSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    addCommentFailed: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    deleteCommentRequest: (state) => {
        state.loading = true;
    },
    deleteCommentSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deleteCommentFailed: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    newPostRequest: (state) => {
        state.loading = true;
    },
    newPostSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    newPostFailed: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    updateCaptionRequest: (state) => {
        state.loading = true;
    },
    updateCaptionSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    updateCaptionFailed: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    updateProfileRequest: (state) => {
        state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    updateProfileFailed: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    deletePostRequest: (state) => {
        state.loading = true;
    },
    deletePostSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deletePostFailed: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    updatePasswordRequest: (state) => {
        state.loading = true;
    },
    updatePasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    updatePasswordFailed: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    deleteProfileRequest: (state) => {
        state.loading = true;
    },
    deleteProfileSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deleteProfileFailed: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    forgotPasswordRequest: (state) => {
        state.loading = true;
    },
    forgotPasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    forgotPasswordFailed: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    resetPasswordRequest: (state) => {
        state.loading = true;
    },
    resetPasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    resetPasswordFailed: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    followUserRequest: (state) => {
        state.loading = true;
    },
    followUserSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    followUserFailed: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearError: (state) => {
        state.error = null;
    },
    clearMessasge: (state) => {
        state.message = null;
    }
})

export const myPostsReducer = createReducer(intitialstate, {
    myPostsRequest: (state) => {
        state.loading = true;
    },
    myPostsSuccess: (state, action) => {
        state.loading = false;
        state.myPost = action.payload;
    },
    myPostsFailed: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
})

export const userPostReducer = createReducer(intitialstate, {
    userPostRequest: (state) => {
        state.loading = true;
    },
    userPostSuccess: (state, action) => {
        state.loading = false;
        state.myPost = action.payload;
    },
    userPostFailed: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
})