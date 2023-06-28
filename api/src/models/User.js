const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    handle: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    avatar: {
        id: String,
        url: String
    },
    bio: String,
    followers:  [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    followings:  [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    posts:  [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    saved:  [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
}, {timestamps: true});

userSchema.pre('save', function(){
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, 10);
    }
    return
});

userSchema.methods = {
    comparePassword: function(password){
        return bcrypt.compareSync(password, this.password);
    },

    genJWTToken: async function(){
        const token = await jwt.sign({id: this._id}, process.env.JWT_SECRET, {
            expiresIn: 7*24*60*60*1000
        });
        return token
    }
}

module.exports = model('User', userSchema);