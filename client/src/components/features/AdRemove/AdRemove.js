import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';
import axios from 'axios';
import { getAdById } from '../../../redux/adsRedux';
import { Alert, Button } from 'react-bootstrap';
import { API_URL } from '../../../config';

const AdRemove = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ad = useSelector(state => getAdById(state, id));
  const loggedInUser = useSelector(getUser);

  const [status, setStatus] = useState(null);

  const handleRemove = async () => {
    try {
      const response = await axios.delete(`${API_URL}api/ad/remove/${id}`);
      if (response.status === 200) {
        setStatus('success');
        setTimeout(() => navigate('/'));
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  if (ad.seller.login !== loggedInUser.login) {
    return (
      <div className='container mt-4'>
        <Alert variant='danger'>
          <Alert.Heading>Not Authorized</Alert.Heading>
          <p>You are not authorized to delete this ad.</p>
        </Alert>
      </div>
    );
  }

  return (
    <div className='container mt-4'>
      <h1>Removing Ad</h1>
      <p>The ad is being removed...</p>
      {status === 'success' && (
        <Alert color='success'>
          <Alert.Heading>Success</Alert.Heading>
          <p>The ad has been successfully removed.</p>
        </Alert>
      )}
      {status === 'error' && (
        <Alert color='danger'>
          <Alert.Heading>Error</Alert.Heading>
          <p>There was an error removing the ad.</p>
        </Alert>
      )}
      <Button variant='danger' onClick={handleRemove}>Remove</Button>
      <Button className='mx-2' variant='primary' onClick={handleBack}>Back</Button>
    </div>
  );
};

export default AdRemove;
