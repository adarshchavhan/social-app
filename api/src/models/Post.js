const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    caption: {
      type: String,
      required: true,
    },
    image: {
      id: String,
      url: String,
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User",
      }],
    comments: [{
            type: Schema.Types.ObjectId,
            ref: "Comment",
    }],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    saved:  [{
      type: Schema.Types.ObjectId,
      ref: 'User'
  }]
  },
  { timestamps: true });

module.exports = model("Post", postSchema);
