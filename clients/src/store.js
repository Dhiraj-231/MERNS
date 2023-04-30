import { configureStore } from '@reduxjs/toolkit';
import { allUserReducer, postOfFollowingReducer, userProfileReducer, userReducer } from './Reducers/User';
import { likeReducer, myPostsReducer, userPostReducer } from './Reducers/Post';
const store = configureStore({
    reducer: {
        user: userReducer,
        postOfFollowing: postOfFollowingReducer,
        allUser: allUserReducer,
        likes: likeReducer,
        myPosts: myPostsReducer,
        userProfile: userProfileReducer,
        userPosts: userPostReducer,
    }
});

export default store;