import React, { useEffect, useState } from "react";
import {
  Avatar,
  CommentOutlined,
  Like,
  LikeOutlined,
  MoreHori,
  Save,
  SaveOutlined,
  ShareOutlined,
} from "react-ig-icons";
import TimeAgo from "timeago-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  commentPost,
  likePost,
  savePost,
} from "../../redux/actions/postActions";
import LoadingButton from "../../components/LoadingButton/LoadingButton";
import LikesModel from "../../components/LikesModel/LikesModel";
import CommentsModel from "../../components/CommentsModel/CommentsModel";
import PostModel from "../../components/PostModel/PostModel";

const Post = ({ post, user}) => {
  const [like, setLike] = useState({ likes: 0, liked: false });
  const [comment, setComment] = useState({ comments: post.comments.length, text: "" });

  const [showLikes, setShowLikes] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [saved, setSaved] = useState(false);

  const { mloading } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  // like post
  const handleLike = async () => {
    const {likes, liked} = like;
    const req = await dispatch(likePost(post._id));

    if (req.type === "likePostSuccess") {
      if (liked) {
        setLike({ likes: likes - 1, liked: false });
      } else {
        setLike({ likes: likes + 1, liked: true });
      }
    }
  };

  // save post
  const handleSave = async () => {
    const req = await dispatch(savePost(post._id));

    if (req.type === "savePostSuccess") {
      setSaved(!saved);
    }
  };


  // comment post
  const handleComment = async (e) => {
    e.preventDefault();
    const {comments, text} = comment;

    const req = await dispatch(commentPost({ postId: post._id, text }));

    if(req.type === 'commentPostSuccess'){
      setComment({comments: comments+1, text:''})
    }
  };

  const handleShowLikes = () => {
    setShowLikes(!showLikes)
  }

  

  const handleShowComments = () => {
    setShowComments(!showComments)
  }

  const handleShowPost = () => {
    setShowPost(!showPost)
  }

  useEffect(() => {
    const {likes, saved} = post;
    if (likes.includes(user._id)) {
      setLike({ likes: likes.length, liked: true });
    } else {
      setLike({ likes: likes.length, liked: false });
    }

    if(saved.includes(user._id)) {
      setSaved(true);
    }else{
      setSaved(false);
    }
  }, []);

  return (
    <>
      <div className="home__post">
      <div className="post__header">
        <div>
          <Avatar w="36px" h="36px" src={post.user.avatar?.url} />
          <div className="text">
            <Link to={`/user/${post?.user.handle}`} className="name">
              {post.user.handle}
            </Link>
            <TimeAgo datetime={post.createdAt} locale="in" />
          </div>
        </div>

        <div>
          <button>
            <MoreHori w="24px" />
          </button>
        </div>
      </div>
      <div className="post__content">
        <img src={post.image?.url} alt="" />
      </div>

      <div className="post__footer">
        <div className="top">
          <div>
            <button onClick={handleLike} disabled={mloading ? true : false}>
              {like.liked ? (
                <Like w="20px" h="20px" />
              ) : (
                <LikeOutlined w="20px" h="20px" />
              )}
            </button>
            <button onClick={handleShowComments}>
              <CommentOutlined w="20px" h="20px" />
            </button>
            <button>
              <ShareOutlined w="20px" h="20px" />
            </button>
          </div>
          <div>
            <button onClick={handleSave}>
              {saved ? <Save w='20px' h='20px' /> : <SaveOutlined w="20px" h="20px" />}
            </button>
          </div>
        </div>
        <div className="middle">
          <button onClick={handleShowLikes}>
            <b>{like.likes} likes</b>
          </button>
          <p onClick={handleShowComments}>View all {comment.comments} comments.</p>
          <button onClick={handleShowPost}>more...</button>
        </div>

        <div className="bottom">
          <form onSubmit={handleComment}>
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment.text}
              onChange={(e) => setComment({ ...comment, text: e.target.value })}
              required
            />
            {comment.text.length > 0 && (
              <LoadingButton loading={mloading} label={"Post"} type="submit" />
            )}
          </form>
        </div>
      </div>
    </div>
    {showLikes && <LikesModel {...{showLikes, handleShowLikes, postId: post._id}}/>}
    {showComments && <CommentsModel {...{showComments, handleShowComments, postId: post._id}}/>}
    {showPost && <PostModel {...{showPost, handleShowPost, postId: post._id}}/>}
    </>
  );
};

export default Post;
