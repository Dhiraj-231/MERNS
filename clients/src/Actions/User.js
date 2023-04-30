import axios from "axios";
export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "LoginRequest"
        })
        const { data } = await axios.post("/user/login", { email, password }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        dispatch({
            type: "LoginSuccess",
            payload: data.user
        });
    } catch (error) {
        dispatch({
            type: "LoginFailure",
            payload: error.response.data.message,
        })
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "LoadUserRequest"
        });
        const { data } = await axios.get("/user/profileDetail/me");

        dispatch({
            type: "LoadUserSuccess",
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: "LoadUserFailure",
            payload: error.response.data.message,
        })
    }
}

export const getFollowingPost = () => async (dispatch) => {
    try {
        dispatch({
            type: "postOfFollowingRequest",
        })
        const { data } = await axios.get("/post/followedPost");

        dispatch({
            type: "postOfFollowingSuccess",
            payload: data.posts
        })
    } catch (error) {
        dispatch({
            type: "postOfFollowingFailed",
            payload: error.response.data.message,
        })
    }
}

export const getAllUSer = (name = "") => async (dispatch) => {
    try {
        dispatch({
            type: "allUserRequest"
        })

        const { data } = await axios.get(`/user/getAllDetail?name=${name}`);
        dispatch({
            type: "allUserSuccess",
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: "allUserFailed",
            payload: error.response.data.message
        })
    }
}

export const LogoutUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "LogoutUserRequest"
        })
        await axios.get("/user/logout");
        dispatch({
            type: "LogoutUserSuccess",
        });
    } catch (error) {
        dispatch({
            type: "LogoutUserFailure",
            payload: error.response.data.message,
        })
    }
}

export const registerUser = (name, email, password, image) => async (dispatch) => {
    try {
        dispatch({
            type: "registerRequest"
        })
        const { data } = await axios.post("/user/register", { name, email, password, image }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        dispatch({
            type: "registerSuccess",
            payload: data.user
        });
    } catch (error) {
        dispatch({
            type: "registerFailure",
            payload: error.response.data.message,
        })
    }
}

export const updateProfile = (name, email, imagePrev) => async (dispatch) => {
    try {
        dispatch({
            type: "updateProfileRequest"
        })
        const { data } = await axios.patch("/user/updateProfile", { name, email, imagePrev }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        dispatch({
            type: "updateProfileSuccess",
            payload: data.message
        });
    } catch (error) {
        dispatch({
            type: "updateProfileFailed",
            payload: error.response.data.message,
        })
    }
}

export const updatePasswords = (oldPassword, newPassword) => async (dispatch) => {
    try {
        dispatch({
            type: "updatePasswordRequest"
        })
        const { data } = await axios.patch("/user/updatePassword", { oldPassword, newPassword }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        dispatch({
            type: "updatePasswordSuccess",
            payload: data.message
        });
    } catch (error) {
        dispatch({
            type: "updatePasswordFailed",
            payload: error.response.data.message,
        })
    }
}

export const deleteProfile = () => async (dispatch) => {
    try {
        dispatch({
            type: "deleteProfileRequest"
        })
        const { data } = await axios.delete("/user/deleteProfile/me");
        dispatch({
            type: "deleteProfileSuccess",
            payload: data.message
        });
    } catch (error) {
        dispatch({
            type: "deleteProfileFailed",
            payload: error.response.data.message,
        })
    }
}

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({
            type: "forgotPasswordRequest"
        })
        const { data } = await axios.post("/user/forget/password", { email }, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: "forgotPasswordSuccess",
            payload: data.message
        });
    } catch (error) {
        dispatch({
            type: "forgotPasswordFailed",
            payload: error.response.data.message,
        })
    }
}

export const resetPassword = (token, password) => async (dispatch) => {
    try {
        dispatch({
            type: "resetPasswordRequest"
        })
        const { data } = await axios.put(`/user/resetPassword/${token}`, { password }, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: "resetPasswordSuccess",
            payload: data.message
        });
    } catch (error) {
        dispatch({
            type: "resetPasswordFailed",
            payload: error.response.data.message,
        })
    }
}


export const getUserProfile = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "userProfileRequest",
        })
        const { data } = await axios.get(`/user/ProfileDetail/${id}`);

        dispatch({
            type: "userProfileSuccess",
            payload: data.users
        })
    } catch (error) {
        dispatch({
            type: "userProfileFailed",
            payload: error.response.data.message,
        })
    }
}

export const followAndUnfollowUser = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "followUserRequest",
        })
        const { data } = await axios.get(`/user/follow/${id}`);

        dispatch({
            type: "followUserSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "followUserFailed",
            payload: error.response.data.message,
        })
    }
}