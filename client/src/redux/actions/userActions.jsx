import axios from 'axios'

export const loginUser = (userData) => async(dispatch) => {
    try {
        dispatch({
            type: 'loginRequest'
        })

        const {data: {user, message}} = await axios.post('/users/login', userData);

        dispatch({
            type: 'loginSuccess',
            payload: user,
            message
        })
        
    } catch (error) {
        dispatch({
            type: 'loginFailure',
            payload: error.response?.data.message
        })
    }
}

export const signupUser = (userData) => async(dispatch) => {
    try {
        dispatch({
            type: 'signupRequest'
        })

        const {data: {user, message}} = await axios.post('/users/signup', userData);

        dispatch({
            type: 'signupSuccess',
            payload: user,
            message
        })
        
    } catch (error) {
        dispatch({
            type: 'signupFailure',
            payload: error.response?.data.message
        })
    }
}

export const loadUser = () => async(dispatch) => {
    try {
        dispatch({
            type: 'loadUserRequest'
        })

        const {data: {user}} = await axios.get('/users/me');

        dispatch({
            type: 'loadUserSuccess',
            payload: user
        })
        
    } catch (error) {
        dispatch({
            type: 'loadUserFailure',
            payload: error.response?.data.message
        })
    }
}

export const logoutUser = () => async(dispatch) => {
    try {
        dispatch({
            type: 'logoutRequest'
        })

        const {data: {message}} = await axios.get('/users/logout');

        dispatch({
            type: 'logoutSuccess',
            payload: message
        })
        
    } catch (error) {
        dispatch({
            type: 'logoutFailure',
            payload: error.response?.data.message
        })
    }
}

export const allUsers = ({q=''}) => async(dispatch) => {
    try {
        dispatch({
            type: 'allUsersRequest'
        })

        const {data} = await axios.get(`/users/find?q=${q}`);

        dispatch({
            type: 'allUsersSuccess',
            payload: data.users
        })
        
    } catch (error) {
        dispatch({
            type: 'allUsersFailure',
            payload: error.response?.data.message
        })
    }
}

export const suggestedUsers = () => async(dispatch) => {
    try {
        dispatch({
            type: 'suggestedUsersRequest'
        })

        const {data} = await axios.get('/users/suggested');

        dispatch({
            type: 'suggestedUsersSuccess',
            payload: data.users
        })
        
    } catch (error) {
        dispatch({
            type: 'suggestedUsersFailure',
            payload: error.response?.data.message
        })
    }
}

export const followUser = (handle) => async(dispatch) => {
    try {
        dispatch({
            type: 'followUserRequest'
        })

        const {data: {message}} = await axios.put(`/users/follow/${handle}`);

        return dispatch({
            type: 'followUserSuccess',
            payload: message
        })
        
    } catch (error) {
        dispatch({
            type: 'followUserFailure',
            payload: error.response?.data.message
        })
    }
}

export const getUser = (handle) => async(dispatch) => {
    try {
        dispatch({
            type: 'getUserRequest'
        })

        const {data: {user}} = await axios.get(`/users/find/${handle}`);

        dispatch({
            type: 'getUserSuccess',
            payload: user
        })
        
    } catch (error) {
        dispatch({
            type: 'getUserFailure',
            payload: error.response?.data.message
        })
    }
}

export const updateUser = (userData) => async(dispatch) => {
    try {
        dispatch({
            type: 'updateUserRequest'
        })

        const {data: {message}} = await axios.put('/users/me', userData);

        dispatch({
            type: 'updateUserSuccess',
            payload: message
        })
        
    } catch (error) {
        dispatch({
            type: 'updateUserFailure',
            payload: error.response?.data.message
        })
    }
}


export const updatePassword = (passwordData) => async(dispatch) => {
    try {
        dispatch({
            type: 'updatePasswordRequest'
        })

        const {data: {message}} = await axios.put('/users/me/password', passwordData);

        dispatch({
            type: 'updatePasswordSuccess',
            payload: message
        })
        
    } catch (error) {
        dispatch({
            type: 'updatePasswordFailure',
            payload: error.response?.data.message
        })
    }
}