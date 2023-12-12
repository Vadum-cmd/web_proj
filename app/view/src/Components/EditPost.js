import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';


const EditPost = ({ postId, onClose, onUpdate, keyProp }) => {
  const [show, setShow] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    author: '',
  });

  useEffect(() => {
    if (postId) {
      const fetchPostDetails = async () => {
        try {
          const response = await axios.get(process.env.REACT_APP_API_URL + `post/${postId}`);
          const postDetails = response.data;
          setEditFormData({
            title: postDetails.title,
            description: postDetails.description,
            author: postDetails.author,
          });
        } catch (error) {
          console.error('Error fetching post details for editing:', error.message);
        }
      };

      fetchPostDetails();
    }

    setShow(false);
  }, [postId, keyProp]);

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleUpdatePost = async () => {
    try {
      await axios.put(process.env.REACT_APP_API_URL + `post/${postId}`, editFormData);
      onUpdate();
      handleClose(); 
    } catch (error) {
      console.error('Error updating post:', error.message);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="button">
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={editFormData.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                name="description"
                value={editFormData.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author"
                name="author"
                value={editFormData.author}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdatePost}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditPost;