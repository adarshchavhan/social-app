import { createReducer } from "@reduxjs/toolkit";

export const userReduer = createReducer({},  (builder)=> {
    builder
        .addCase('loginRequest', (state) => {
            state.mloading = true;
        })
        .addCase('signupRequest', (state) => {
            state.mloading = true;
        })
        .addCase('logoutRequest', (state) => {
            state.mloading = true;
        })
        .addCase('loadUserRequest', (state) => {
            state.loading = true;
        })
        .addCase('allUsersRequest', (state) => {
            state.mloading = true;
        })
        .addCase('suggestedUsersRequest', (state) => {
            state.mloading = true;
        })
        .addCase('followUserRequest', (state) => {
            state.mloading = true;
        })
        .addCase('getUserRequest', (state) => {
            state.mloading = true;
        })
        .addCase('updateUserRequest', (state) => {
            state.mloading = true;
        })
        .addCase('updatePasswordRequest', (state) => {
            state.mloading = true;
        })

    builder
        .addCase('loginSuccess', (state, action) => {
            state.mloading = false;
            state.user = action.payload;
            state.message = action.message;
            state.isAuth = true;
        })
        .addCase('signupSuccess', (state, action) => {
            state.mloading = false;
            state.user = action.payload;
            state.message = action.message;
            state.isAuth = true;
        })
        .addCase('logoutSuccess', (state, action) => {
            state.mloading = false;
            state.message = action.payload;
            state.user = null;
            state.isAuth = false;
        })
        .addCase('loadUserSuccess', (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuth = true;
        })
        .addCase('allUsersSuccess', (state, action) => {
            state.mloading = false;
            state.users = action.payload;
        })
        .addCase('suggestedUsersSuccess', (state, action) => {
            state.mloading = false;
            state.users = action.payload;
        })
        .addCase('followUserSuccess', (state, action) => {
            state.mloading = false;
            state.message = action.payload;
        })
        .addCase('getUserSuccess', (state, action) => {
            state.mloading = false;
            state.profile = action.payload;
        })
        .addCase('updateUserSuccess', (state, action) => {
            state.mloading = false;
            state.message = action.payload;
        })
        .addCase('updatePasswordSuccess', (state, action) => {
            state.mloading = false;
            state.message = action.payload;
        })

    builder
        .addCase('loginFailure', (state, action) => {
            state.mloading = false;
            state.error = action.payload;
            state.isAuth = false;
        })
        .addCase('signupFailure', (state, action) => {
            state.mloading = false;
            state.error = action.payload;
            state.isAuth = false;
        })
        .addCase('logoutFailure', (state, action) => {
            state.mloading = false;
            state.error = action.payload;
            state.isAuth = false;
        })
        .addCase('loadUserFailure', (state, action) => {
            state.loading = false;
            state.isAuth = false;
        })
        .addCase('allUsersFailure', (state, action) => {
            state.mloading = false;
            state.error = action.payload;
        })
        .addCase('suggestedUsersFailure', (state, action) => {
            state.mloading = false;
            state.error = action.payload;
        })
        .addCase('followUserFailure', (state, action) => {
            state.mloading = false;
            state.error = action.payload;
        })
        .addCase('getUserFailure', (state, action) => {
            state.mloading = false;
            state.error = action.payload;
        })
        .addCase('updateUserFailure', (state, action) => {
            state.mloading = false;
            state.error = action.payload;
        })
        .addCase('updatePasswordFailure', (state, action) => {
            state.mloading = false;
            state.error = action.payload;
        })

    builder
        .addCase('clearMsg', (state) => {
            state.message = '';
            state.error = '';
        })
});