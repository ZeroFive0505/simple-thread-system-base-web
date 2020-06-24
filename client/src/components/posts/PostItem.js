import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addLike, deletePost } from "../../actions/post";

const PostItem = ({ post, deletePost, addLike, auth, showActions }) => {
  return (
    <div className="post bg-black p-1 my-1">
      <div>
        <Link to={`/profile/${post.user}`}>
          <h4>{post.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{post.text}</p>
        <p className="post-date">
          게시된 날짜 <Moment format="YYYY/MM/DD">{post.date}</Moment>
        </p>
        {showActions && (
          <Fragment>
            <button
              type="button"
              className="waves-effect waves-light btn"
              onClick={(event) => addLike(post._id)}
            >
              <i className="fas fa-thumbs-up"></i>{" "}
              <span>
                {post.likes.length > 0 && <span>{post.likes.length}</span>}{" "}
              </span>
            </button>
            <Link
              to={`/posts/detail/${post._id}`}
              className="waves-effect waves-light btn m-1"
            >
              답글 수{" "}
              {post.comments.length > 0 && <span>{post.comments.length}</span>}
            </Link>
            {!auth.loading && post.user === auth.user._id && (
              <button
                type="button"
                className="waves-effect waves-light btn red"
                onClick={(event) => deletePost(post._id)}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  addLike,
  deletePost,
})(PostItem);
