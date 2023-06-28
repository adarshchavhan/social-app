import axios from 'axios'

export const followingPosts = () => async(dispatch) => {
    try {
        dispatch({
            type: 'followingPostsRequest'
        })

        const {data: {posts}} = await axios.get('/posts/followings');

        dispatch({
            type: 'followingPostsSuccess',
            payload: posts
        })
        
    } catch (error) {
        dispatch({
            type: 'followingPostsFailure',
            payload: error.response?.data.message
        })
    }
}

export const likePost = (postId) => async(dispatch) => {
    try {
        dispatch({
            type: 'likePostRequest'
        })

        const {data: {message}} = await axios.put(`/posts/post/${postId}/like`);

        return dispatch({
            type: 'likePostSuccess',
            payload: message
        })
        
    } catch (error) {
        dispatch({
            type: 'likePostFailure',
            payload: error.response?.data.message
        })
    }
}

export const savePost = (postId) => async(dispatch) => {
    try {
        dispatch({
            type: 'savePostRequest'
        })

        const {data: {message}} = await axios.put(`/posts/post/${postId}/save`);

        return dispatch({
            type: 'savePostSuccess',
            payload: message
        })
        
    } catch (error) {
        dispatch({
            type: 'savePostFailure',
            payload: error.response?.data.message
        })
    }
}


export const commentPost = (commentData) => async(dispatch) => {
    try {
        dispatch({
            type: 'commentPostRequest'
        })

        const {data: {message}} = await axios.post('/comments', commentData);

        return dispatch({
            type: 'commentPostSuccess',
            payload: message
        })
        
    } catch (error) {
        dispatch({
            type: 'commentPostFailure',
            payload: error.response?.data.message
        })
    }
}

export const getPost = (postId) => async(dispatch) => {
    try {
        dispatch({
            type: 'getPostRequest'
        })

        const {data: {post}} = await axios.get(`/posts/post/${postId}`);

        dispatch({
            type: 'getPostSuccess',
            payload: post
        })
        
    } catch (error) {
        dispatch({
            type: 'getPostFailure',
            payload: error.response?.data.message
        })
    }
}

export const getPostComments = (postId) => async(dispatch) => {
    try {
        dispatch({
            type: 'getPostCommentsRequest'
        })

        const {data: {comments}} = await axios.get(`/comments/${postId}`);
        
        return dispatch({
            type: 'getPostCommentsSuccess',
            payload: comments
        })
        
    } catch (error) {
        dispatch({
            type: 'getPostCommentsFailure',
            payload: error.response?.data.message
        })
    }
}

export const updateComments = (commentId, comment) => async(dispatch) => {
    try {
        dispatch({
            type: 'updateCommentsRequest'
        })

        const {data: {message}} = await axios.put(`/comments/${commentId}`, comment);
        
        return dispatch({
            type: 'updateCommentsSuccess',
            payload: message
        })
        
    } catch (error) {
        dispatch({
            type: 'updateCommentsFailure',
            payload: error.response?.data.message
        })
        
    }
}

export const deleteComments = (commentId) => async(dispatch) => {
    try {
        dispatch({
            type: 'deleteCommentsRequest'
        })

        const {data: {message}} = await axios.delete(`/comments/${commentId}`);
        
        return dispatch({
            type: 'deleteCommentsSuccess',
            payload: message
        })
        
    } catch (error) {
        dispatch({
            type: 'deleteCommentsFailure',
            payload: error.response?.data.message
        })
        
    }
}

export const likeComment = (commentId) => async(dispatch) => {
    try {
        dispatch({
            type: 'likeCommentRequest'
        })

        const {data: {message}} = await axios.put(`/comments/${commentId}/like`);
        
        return dispatch({
            type: 'likeCommentSuccess',
            payload: message
        })
        
    } catch (error) {
        dispatch({
            type: 'likeCommentFailure',
            payload: error.response?.data.message
        })
        
    }
}


export const allPosts = ({user='', saved=false}) => async(dispatch) => {
    try {
        dispatch({
            type: 'allPostsRequest'
        })

        const {data: {posts}} = await axios.get(`/posts?user=${user}&saved=${saved}`);

        dispatch({
            type: 'allPostsSuccess',
            payload: posts
        })
        
    } catch (error) {
        dispatch({
            type: 'allPostsFailure',
            payload: error.response?.data.message
        })
    }
}

export const createPost = (postData) => async(dispatch) => {
    try {
        dispatch({
            type: 'createPostRequest'
        })

        const {data: {message}} = await axios.post('/posts/new', postData);

        return dispatch({
            type: 'createPostSuccess',
            payload: message
        })
        
    } catch (error) {
        dispatch({
            type: 'createPostFailure',
            payload: error.response?.data.message
        })
    }
}

export const deletePost = (postId) => async(dispatch) => {
    try {
        dispatch({
            type: 'deletePostRequest'
        })

        const {data: {message}} = await axios.delete(`/posts/post/${postId}`);
        
        return dispatch({
            type: 'deletePostSuccess',
            payload: message
        })
        
    } catch (error) {
        dispatch({
            type: 'deletePostFailure',
            payload: error.response?.data.message
        })
        
    }
}

export const updatePost = (postId, postData) => async(dispatch) => {
    try {
        dispatch({
            type: 'updatePostRequest'
        })

        const {data: {message}} = await axios.put(`/posts/post/${postId}`, postData);
        
        return dispatch({
            type: 'updatePostSuccess',
            payload: message
        })
        
    } catch (error) {
        dispatch({
            type: 'updatePostFailure',
            payload: error.response?.data.message
        })
        
    }
}
