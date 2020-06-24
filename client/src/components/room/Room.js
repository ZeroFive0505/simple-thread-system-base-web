import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { joinRoom } from "../../actions/room";
import { addPost, searchPost } from "../../actions/post";
import Posts from "../posts/Posts";
import Preloader from "../layouts/Preloader";

const Room = ({
  match,
  room: { currentRoom, loading },
  joinRoom,
  addPost,
  searchPost,
}) => {
  const [text, setText] = useState("");

  useEffect(() => {
    joinRoom(match.params.id);
  }, [match.params.id]);

  return (
    <Fragment>
      {currentRoom === null || loading ? (
        <Preloader />
      ) : (
        <Fragment>
          <p className="lead">
            <i className="far fa-comments"></i> 환영합니다!
          </p>
          <div className="post-form">
            <div className="">
              <h3>{currentRoom.roomname} 관해 예기해보세요!</h3>
              <div className="input-field">
                <i className="material-icons prefix">search</i>
                <input
                  id="icon_prefix"
                  type="text"
                  onChange={(event) => {
                    searchPost(currentRoom._id, event.target.value);
                  }}
                />
                <label htmlFor="icon_prefix">글 검색하기</label>
              </div>
            </div>
            <form
              className="form my-1"
              onSubmit={(event) => {
                event.preventDefault();
                addPost(text, currentRoom._id);
                setText("");
              }}
            >
              <textarea
                name="text"
                cols="30"
                rows="5"
                placeholder="새로운 글을 작성해주세요."
                required
                value={text}
                onChange={(event) => setText(event.target.value)}
              ></textarea>
              <input
                type="submit"
                className="waves-effect waves-light btn"
                value="글 올리기"
              />
            </form>
          </div>
          <Posts />
        </Fragment>
      )}
    </Fragment>
  );
};

Room.propTypes = {
  joinRoom: PropTypes.func.isRequired,
  loading: PropTypes.object.isRequired,
  currentRoom: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired,
  searchPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  room: state.room,
});

export default connect(mapStateToProps, { joinRoom, addPost, searchPost })(
  Room
);
