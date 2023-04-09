import { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../../../config';

const AdAdd = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [photo, setPhoto] = useState(null);
  const [status, setStatus] = useState(null);

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

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('date', date);
      formData.append('price', price);
      formData.append('location', location);
      formData.append('photo', photo);

      setStatus('loading');

      const response = await axios.post(`${API_URL}api/ads`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        credentials: 'include',
      });

      if (response.status === 201) {
        setTitle('');
        setContent('');
        setDate(new Date().toISOString().slice(0, 10));
        setPrice('');
        setLocation('');
        setPhoto(null);
        setStatus('success');
      } else {
        setStatus('serverError');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('serverError');
    }
  };

  return (
    <Form className='col-12 col-sm-3 mx-auto' onSubmit={handleSubmit}>
      <h1 className='my-4'>Add Ad</h1>

      {status === "success" && (
        <Alert variant='success'>
          <Alert.Heading>Success!</Alert.Heading>
          <p>Your ad has been successfully added!</p>
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
        Add
      </Button>
    </Form>
  );
}

export default AdAdd