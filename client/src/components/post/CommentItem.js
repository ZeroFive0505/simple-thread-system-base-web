import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/post";
import PropTypes from "prop-types";

const CommentItem = ({ postID, comment, auth, deleteComment }) => {
  return (
    <div className="post bg-black p-1 my-1">
      <div>
        <Link to={`profile/${comment.user}`}>
          <h4>{comment.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{comment.text}</p>
        <p className="post-date">
          게시된 날짜 <Moment format="YYYY/MM/DD">{comment.date}</Moment>
        </p>
        {!auth.loading && comment.user === auth.user._id && (
          <button
            onClick={(event) => deleteComment(postID, comment._id)}
            type="button"
            className="waves-effect waves-light btn red"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  postID: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
