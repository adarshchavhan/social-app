const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const { connectDb } = require('./config/db');
const { error, genError } = require('./middlewares/error');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
dotenv.config({
    path: './src/config/.env'
});
connectDb();

const CLIENT_URL = process.env.CLIENT_URL;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

app.use(express.json({limit: '10MB'}));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({
    origin: 'https://ig-social.onrender.com',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/conversations', conversationRoutes)
app.use('/api/messages', messageRoutes);

// error handler
app.use(genError);
app.use(error);

const port = process.env.PORT || 4000;
app.listen(port, ()=>console.log('app is running on port: '+port));
