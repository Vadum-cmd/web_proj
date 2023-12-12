import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Components/styles.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import AddPost from '../Components/AddPost';
import EditPost from '../Components/EditPost';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(Number(localStorage.getItem('currentPage')) || 1);
  const [editPostId, setEditPostId] = useState(null);
  const [postsCount, setPostsCount] = useState(null);
  const postsPerPage = 5;

  const fetchPosts = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + `post?page=${page}`);
      setPosts(response.data);
      const countResponse = await axios.get(process.env.REACT_APP_API_URL + `post/count`);
      setPostsCount(countResponse.data);
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const handlePageChange = newPage => {
    setPage(newPage);
    localStorage.setItem('currentPage', newPage);
    fetchPosts();
  };

  const handlePostAdded = newPost => {
    fetchPosts();
  };

  const handleUpdatePost = () => {
    fetchPosts();
    setEditPostId(null);
  };

  const handleCancelEdit = () => {
    setEditPostId(null);
  };

  const handleDeletePost = async postId => {
    try {
      await axios.delete(process.env.REACT_APP_API_URL + `post/${postId}`);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error.message);
    }
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(
      date.getDate()
    )} ${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(
      date.getSeconds()
    )}`;
    return formattedDate;
  };
  const padZero = num => (num < 10 ? `0${num}` : num);

  return (
    <div>
      <Header />
      <div className="container">
        <AddPost onPostAdded={handlePostAdded} />
        <h2>Posts</h2>
        {posts.map(post => (
          <div key={post._id} className="post-card">
            <h3 className="post-title">{post.title}</h3>
            <p>{post.description}</p>
            <p className="post-author">by {post.author}</p>
            <p className="post-created-at">Created at: {formatDate(post.createdAt)}</p>
            <div>
              <EditPost
                key={editPostId}
                postId={post._id}
                onClose={handleCancelEdit}
                onUpdate={handleUpdatePost}
              />
              <button
                className="btn btn-danger button"
                onClick={() => handleDeletePost(post._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <button
          className="btn btn-primary button"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous Page
        </button>
        <span> Page {page} of {postsCount === 0 ? 1 : Math.ceil(postsCount / postsPerPage)} </span>
        <button
          className="btn btn-primary button"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === Math.ceil(postsCount / postsPerPage)}
        >
          Next Page
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default PostList;
