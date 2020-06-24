import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = ({ addComment, postID }) => {
  const [text, setText] = useState("");

  return (
    <div className="post-form">
      <div>
        <h3>답글을 달아주세요.</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(event) => {
          event.preventDefault();
          addComment(postID, { text });
          setText("");
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="당신의 대답"
          required
          value={text}
          onChange={(event) => setText(event.target.value)}
        ></textarea>
        <input
          type="submit"
          value="답글 올리기"
          className="waves-effect waves-light btn"
        />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  postID: PropTypes.string.isRequired,
};

export default connect(null, { addComment })(CommentForm);
