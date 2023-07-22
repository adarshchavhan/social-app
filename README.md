# IG-Social - Social media site (MERN Stack)

IG-social is social media site which is inspired from instagram.com to view 👉 [click here](https://techwiser.netlify.app/).

## Features

- User authentication and authorization.
- User can do CRUD operations on their posts and profile.
- User can can like, comment on post and they can like comment also.
- User can can Search, follow and chat with other users.

## Tech Stack

**Client:** React, Redux-toolkit

**Server:** Node, Express, MongoDb, Mongoose

## Libraries Used

**Client:** Axios,React-hot-toast, React-timeago, Sass

**Server:** Cors, Bcrypt, Jsonwebtoken, Cloudinary, Socket.io

## Screenshots

**Home**
![Screenshot 2023-07-22 144353](https://github.com/adarshchavhan21/social-app/assets/130956407/aa2ccb82-7b59-4260-87fa-1ad6cc147aa0)

**Explore**
![Screenshot 2023-07-22 145021](https://github.com/adarshchavhan21/social-app/assets/130956407/446a01b1-426a-421c-837c-0e9cd192061d)

**Post Details**
![Screenshot 2023-07-22 145513](https://github.com/adarshchavhan21/social-app/assets/130956407/81138c4a-272e-4d16-b8e6-f23f079e0279)

**Profile**
![Screenshot 2023-07-22 145146](https://github.com/adarshchavhan21/social-app/assets/130956407/1f8aa484-6ce2-4010-9a78-2b614f92d7c9)

**Chat Box**
![Screenshot 2023-07-22 145634](https://github.com/adarshchavhan21/social-app/assets/130956407/43f3e9c5-8ad5-46b9-b500-3a7c6e6bbbba)

## Environmet Variables

To run this project, you will need to add the following environment variables to your .env file

Inside Client Folder :

`VITE_BASE_URL`

Inside Server Folder :

`PORT`
`JWT_SECRET`
`MONGO_URL`
`CLOUDINARY_NAME`
`CLOUDINARY_KEY`
`CLOUDINARY_SECRET`
`FRONTEND_URL`

## Installation

Inside Client, Server & Socket install with npm

```bash
  npm install
```

## How to use

Users can log in into site by clicking the login button and fill in the right credentials, new users can signup themself by clicking on the signuo button and fill a simple form, after successful login user can start reading posts and writing posts, etc.
