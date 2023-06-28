import { createReducer } from "@reduxjs/toolkit";

export const postReduer = createReducer({},  (builder)=> {
    builder
        .addCase('followingPostsRequest', (state) => {
            state.loading = true;
        })
        .addCase('likePostRequest', (state) => {
            state.mloading = true;
        })
        .addCase('savePostRequest', (state) => {
            state.mloading = true;
        })
        .addCase('commentPostRequest', (state) => {
            state.mloading = true;
        })
        .addCase('getPostRequest', (state) => {
            state.mloading = true;
        })
        .addCase('getPostCommentsRequest', (state) => {
            state.mloading = true;
        })
        .addCase('deleteCommentsRequest', (state) => {
            state.mloading = true;
        })
        .addCase('allPostsRequest', (state) => {
            state.loading = true;
        })
        .addCase('createPostRequest', (state) => {
            state.mloading = true;
        })
        .addCase('updateCommentsRequest', (state) => {
            state.mloading = true;
        })
        .addCase('likeCommentRequest', (state) => {
            state.mloading = true;
        })
        .addCase('deletePostRequest', (state) => {
            state.mloading = true;
        })
        .addCase('updatePostRequest', (state) => {
            state.mloading = true;
        })

    builder
        .addCase('followingPostsSuccess', (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        })
        .addCase('likePostSuccess', (state, action) => {
            state.mloading = false;
            state.message = action.payload;
        })
        .addCase('savePostSuccess', (state, action) => {
            state.mloading = false;
            state.message = action.payload;
        })
        .addCase('commentPostSuccess', (state, action) => {
            state.mloading = false;
            state.message = action.payload;
        })
        .addCase('getPostSuccess', (state, action) => {
            state.mloading = false;
            state.post = action.payload;
        })
        .addCase('getPostCommentsSuccess', (state, action) => {
            state.mloading = false;
            state.comments = action.payload;
        })
        .addCase('deleteCommentsSuccess', (state, action) => {
            state.mloading = false;
            state.message = action.payload;
        })
        .addCase('allPostsSuccess', (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        })
        .addCase('createPostSuccess', (state, action) => {
            state.mloading = false;
            state.message = action.payload;
        })
        .addCase('updateCommentsSuccess', (state, action) => {
            state.mloading = false;
            state.message = action.payload;
        })
        .addCase('likeCommentSuccess', (state, action) => {
            state.mloading = false;
            state.message = action.payload;
        })
        .addCase('deletePostSuccess', (state, action) => {
            state.mloading = false;
            state.message = action.payload;
        })
        .addCase('updatePostSuccess', (state, action) => {
            state.mloading = false;
            state.message = action.payload;
        })

    builder
        .addCase('followingPostsFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase('likePostFailure', (state, action) => {
            state.mloading = false;
            state.error = action.payload;
        })
        .addCase('savePostFailure', (state, action) => {
            state.mloading = false;
            state.error = action.payload;
        })
        .addCase('commentPostFailure', (state, action) => {
            state.mloading = false;
            state.error = action.payload;
        })
        .addCase('getPostFailure', (state, action) => {
            state.mloading = false;
            state.error = action.payload;
        })
        .addCase('getPostCommentsFailure', (state, action) => {
            state.mloading = false;
            state.error = action.payload;
        })
        .addCase('deleteCommentsFailure', (state, action) => {
            state.mloading = false;
            state.error = action.payload;
        })
        .addCase('allPostsFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase('createPostFailure', (state, action) => {
            state.mloading = false;
            state.error = action.payload;
        })
        .addCase('updateCommentsFailure', (state, action) => {
            state.mloading = false;
            state.error = action.payload;
        })
        .addCase('likeCommentFailure', (state, action) => {
            state.mloading = false;
            state.error = action.payload;
        })
        .addCase('deletePostFailure', (state, action) => {
            state.mloading = false;
            state.error = action.payload;
        })
        .addCase('updatePostFailure', (state, action) => {
            state.mloading = false;
            state.error = action.payload;
        })

    builder
        .addCase('clearMsg', (state) => {
            state.message = '';
            state.error = '';
        })
});