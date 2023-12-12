import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './styles.css';

const AddPost = ({ onPostAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + 'post',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      onPostAdded(response.data);
      setFormData({ title: '', description: '', author: '' });
    } catch (error) {
      console.error('Error adding post:', error.message);
    }
  };

  return (
    <div className="mb-20px">
      <h2>Add Post</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formAuthor">
          <Form.Label>Author:</Form.Label>
          <Form.Control
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="button">
          Add Post
        </Button>
      </Form>
    </div>
  );
};

export default AddPost;
