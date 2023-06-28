import React, { useEffect, useState } from "react";
import "./PostModel.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  commentPost,
  getPost,
  getPostComments,
  likePost,
  savePost,
} from "../../redux/actions/postActions";
import { Link } from "react-router-dom";
import {
  Avatar,
  CommentOutlined,
  Like,
  LikeOutlined,
  Save,
  SaveOutlined,
  ShareOutlined,
} from "react-ig-icons";
import TimeAgo from "timeago-react";
import LoadingButton from "../LoadingButton/LoadingButton";
import { followUser } from "../../redux/actions/userActions";
import Comment from "../Comment/Comment";

const PostModel = ({ showPost, handleShowPost, postId }) => {
  const { user } = useSelector((state) => state.user);
  const { mloading, post, comments, message } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [saved, setSaved] = useState(false);

  const [followed, setFollowed] = useState(false);
  const [like, setLike] = useState({ likes: 0, liked: false });
  const [comment, setComment] = useState({
    comments: comments?.length,
    text: "",
  });

  // follow user
  const handleFollow = async () => {
    const req = await dispatch(followUser(post?.user.handle));
    if (req.type === "followUserSuccess") {
      setFollowed(!followed);
    }
  };

  // like post
  const handleLike = async () => {
    const { likes, liked } = like;
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
    const { comments, text } = comment;
    const req = await dispatch(commentPost({ postId: post._id, text }));
    if (req.type === "commentPostSuccess") {
      dispatch(getPostComments(postId));
      setComment({ comments: comments+1, text: "" });
    }
  };

  useEffect(() => {
    if (showPost) {
      dispatch(getPostComments(postId));
      dispatch(getPost(postId));
    }
  }, [showPost, postId, message]);

  useEffect(() => {
    if(showPost){
      if (comments) {
        setComment({ ...comment, comments: comments.length });
      }
      if (post) {
        const {likes} = post;
  
        likes.forEach(elm => {
          if(elm._id === user._id){
            setLike({
              likes: likes.length, liked: true
            });
          }else{
            setLike({
              likes: likes.length, liked: false
            });
          }
        });

        if(post?.user.followers.includes(user._id)){
          setFollowed(true);
        }else{
          setFollowed(false)
        }
    
        if(post?.saved.includes(user._id)) {
          setSaved(true);
        }else{
          setSaved(false);
        }
      }
    }
  }, [showPost, post?.likes]);


  return (
    post && (
      <div className="post__model">
        <div className="backdrop" onClick={handleShowPost}></div>
        <div className="model">
          <div>
            <div className="left">
              <img src={post?.image?.url} alt="" />
            </div>
            <div className="right">
              <div className="top">
                <div className="user__card">
                  <div>
                    <Avatar src={post.user.avatar?.url} />
                    <div className="text">
                      <h4 className="name">{post.user.name}</h4>
                      <Link to={`/user/${post?.user.handle}`}><small>@{post.user.name}</small></Link>
                    </div>
                  </div>
                  <div>
                    {post.user._id !== user._id && <button onClick={handleFollow}>{followed ? 'Unfollow':'Follow'}</button>}
                    {post.user._id === user._id && <button style={{background:'#aaa'}}>Follow</button>}
                  </div>
                </div>
              </div>

              {comments && (
                <div className="comment__wrapper">
                  <p>Total {comment.comments} comments</p>
                  <div>
                    {comments.length > 0 ? (
                      <>
                        {comments.map((comment) => <Comment key={comment._id} elm={comment}/>)}
                      </>
                    ) : (
                      <p className="msg">No comment yet.</p>
                    )}
                  </div>
                </div>
              )}

              <div className="bottom">
                <div className="top">
                  <div>
                    <div>
                      <p>{like.likes} likes</p>
                      <button
                      onClick={handleLike}
                      disabled={mloading ? true : false}
                    >
                      {like.liked ? (
                        <Like w="20px" h="20px" />
                      ) : (
                        <LikeOutlined w="20px" h="20px" />
                      )}
                    </button>
                    </div>
                      <button>
                      {/* {post.comments.length} */}
                      <CommentOutlined w="20px" h="20px" />
                    </button>
                    <button>
                      <ShareOutlined w="20px" h="20px" />
                    </button>
                  </div>
                  <div>
                    <button onClick={handleSave}>
                      {saved ? <Save w="20px" h="20px" /> : <SaveOutlined w="20px" h="20px" />}
                    </button>
                  </div>
                </div>

                <div className="bottom">
                  <form onSubmit={handleComment}>
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={comment.text}
                      onChange={(e) =>
                        setComment({ ...comment, text: e.target.value })
                      }
                      required
                    />
                    {comment.text.length > 0 && (
                      <LoadingButton
                        loading={mloading}
                        label={"Post"}
                        type="submit"
                      />
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default PostModel;
