import { useState, useEffect } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { API_URL } from '../../../config';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAdById } from '../../../redux/adsRedux';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../../redux/usersRedux';

const AdEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ad = useSelector(state => getAdById(state, id));
  const loggedInUser = useSelector(getUser);
  
  const [title, setTitle] = useState(ad.title || '');
  const [content, setContent] = useState(ad.content || '');
  const [date, setDate] = useState(ad.date ? new Date(ad.date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10));
  const [price, setPrice] = useState(ad.price || '');
  const [location, setLocation] = useState(ad.location || '');
  const [photo, setPhoto] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    setTitle(ad.title || '');
    setContent(ad.content || '');
    setDate(ad.date ? new Date(ad.date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10));
    setPrice(ad.price || '');
    setLocation(ad.location || '');
  }, [ad]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !date || !price || !location || !photo) {
      setStatus('clientError');
      return;
    }

    if (price <= 0) {
      setStatus('priceError');
      return;
    }

    if (ad.seller.login !== loggedInUser.login) {
      setStatus('notAuthorized');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('date', date);
      formData.append('price', price);
      formData.append('location', location);
      formData.append('photo', photo);

      setStatus('loading');

      const response = await axios.put(`http://localhost:8000/api/ads/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (response.status === 200) {
        setStatus('success');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setStatus('serverError');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('serverError');
    }
  };

  if (ad.seller.login !== loggedInUser.login) {
    return (
      <div className='container mt-4'>
        <Alert variant='danger'>
          <Alert.Heading>Not Authorized</Alert.Heading>
          <p>You are not authorized to edit this ad.</p>
        </Alert>
      </div>
    );
  }

  return (
    <Form className='col-12 col-sm-3 mx-auto' onSubmit={handleSubmit}>
      <h1 className='my-4'>Edit Ad</h1>

      {status === "success" && (
        <Alert variant='success'>
          <Alert.Heading>Success!</Alert.Heading>
          <p>Your ad has been successfully updated!</p>
        </Alert>
      )}

      {status === "clientError" && (
        <Alert variant='danger'>
          <Alert.Heading>No enough data</Alert.Heading>
          <p>You have to fill all the fields.</p>
        </Alert>
      )}

      {status === 'priceError' && (
        <Alert variant='danger'>
          <Alert.Heading>Error!</Alert.Heading>
          <p>Please enter a price greater than 0.</p>
        </Alert>
      )}

      {status === "loading" && (
        <Spinner animation='border' role='status' className='block mx-auto'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      )}

      <Form.Group className="my-3" controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter title" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formContent">
        <Form.Label>Content</Form.Label>
        <Form.Control as="textarea" value={content} onChange={e => setContent(e.target.value)} placeholder="Enter content" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" value={price} onChange={e => setPrice(e.target.value)} min={1} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formLocation">
        <Form.Label>Location</Form.Label>
        <Form.Control type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Enter location" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDate">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" value={date} onChange={e => setDate(e.target.value)} disabled />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPhoto">
        <Form.Label>Photo</Form.Label>
        <Form.Control type="file" onChange={e => setPhoto(e.target.files[0])} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Edit
      </Button>
    </Form>
  );
}

export default AdEdit;