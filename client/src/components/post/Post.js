import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { getPost } from "../../actions/post";
import { connect } from "react-redux";
import Preloader from "../layouts/Preloader";
import PostItem from "../posts/PostItem";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = ({ getPost, match, post: { post, loading }, currentRoom }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  return loading || post === null ? (
    <Preloader />
  ) : (
    <Fragment>
      <Link
        to={`/room/join/${currentRoom._id}`}
        className="waves-effect waves-light btn my-1"
      >
        뒤로 돌아가기
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postID={post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postID={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  currentRoom: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  currentRoom: state.room.currentRoom,
});

export default connect(mapStateToProps, { getPost })(Post);
