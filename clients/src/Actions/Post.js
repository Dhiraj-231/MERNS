import axios from "axios";

export const likePost = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "likeRequest",
        })

        const { data } = await axios.get(`/post/likeUnlike/${id}`);

        dispatch({
            type: "likeSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "likeFailed",
            payload: error.response.data.message,
        })
    }
}

export const addCommentOnPost = (id, comment) => async (dispatch) => {
    try {
        dispatch({
            type: "addCommentRequest",
        })

        const { data } = await axios.put(`/post/comment/${id}`, {
            comment
        }, {
            Headers: {
                "Content-Type": "application/json",
            }
        });

        dispatch({
            type: "addCommentSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "addCommentFailed",
            payload: error.response.data.message,
        })
    }
}

export const deleteComment = (id, commentId) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteCommentRequest",
        })

        const { data } = await axios.delete(` post/deleteComment/${id}`, {
            data: commentId,
        });

        dispatch({
            type: "deleteCommentSuccess",
            payload: data.message,
        })
    } catch (error) {
        dispatch({
            type: "deleteCommentFailed",
            payload: error.response.data.message,
        })
    }
}

export const getMyPosts = () => async (dispatch) => {
    try {
        dispatch({
            type: "myPostsRequest",
        })
        const { data } = await axios.get("/user/mypost");

        dispatch({
            type: "myPostsSuccess",
            payload: data.posts
        })
    } catch (error) {
        dispatch({
            type: "myPostsFailed",
            payload: error.response.data.message,
        })
    }
}

export const createNewPost = (caption, image) => async (dispatch) => {
    try {
        dispatch({
            type: "newPostRequest",
        })

        const { data } = await axios.post(` /post/upload`, {
            caption,
            image,
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        dispatch({
            type: "newPostSuccess",
            payload: data.message,
        })
    } catch (error) {
        dispatch({
            type: "newPostFailed",
            payload: error.response.data.message,
        })
    }
}

export const updateCaption = (caption, id) => async (dispatch) => {
    try {
        dispatch({
            type: "updateCaptionRequest",
        })

        const { data } = await axios.patch(` /post/updateCaption/${id}`, {
            caption
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        dispatch({
            type: "updateCaptionSuccess",
            payload: data.message,
        })
    } catch (error) {
        dispatch({
            type: "updateCaptionFailed",
            payload: error.response.data.message,
        })
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deletePostRequest",
        })

        const { data } = await axios.delete(` /post/delete/${id}`);

        dispatch({
            type: "deletePostSuccess",
            payload: data.message,
        })
    } catch (error) {
        dispatch({
            type: "deletePostFailed",
            payload: error.response.data.message,
        })
    }
}

export const getUserPost = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "userPostRequest",
        })
        const { data } = await axios.get(`/user/userPost/${id}`);

        dispatch({
            type: "userPostSuccess",
            payload: data.posts
        })
    } catch (error) {
        dispatch({
            type: "userPostFailed",
            payload: error.response.data.message,
        })
    }
}