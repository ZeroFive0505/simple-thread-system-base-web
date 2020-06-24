import React, { useEffect } from "react";
import PropTypes from "prop-types";
import PostItem from "./PostItem";
import { connect } from "react-redux";
import { getPostsByID } from "../../actions/post";
import Preloader from "../layouts/Preloader";

const Posts = ({ getPostsByID, post: { posts, loading }, room }) => {
  useEffect(() => {
    getPostsByID(room.currentRoom._id);
  }, [room.currentRoom]);

  if (loading) {
    return <Preloader />;
  }
  return (
    <div className="">
      {posts.length > 0 ? (
        posts.map((post) => <PostItem key={post._id} post={post} />)
      ) : (
        <h3>포스팅을 찾을 수 없습니다!</h3>
      )}
    </div>
  );
};

Posts.propTypes = {
  room: PropTypes.object.isRequired,
  getPostsByID: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  room: state.room,
});

export default connect(mapStateToProps, { getPostsByID })(Posts);
