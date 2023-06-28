import {configureStore} from '@reduxjs/toolkit'
import { userReduer } from './reducers/userReducer'
import { postReduer } from './reducers/postReducer'

export const store = configureStore({
    reducer: {
        user: userReduer,
        post: postReduer
    }
})