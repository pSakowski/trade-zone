
import { logOut } from '../../../redux/usersRedux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config';

const Logout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: 'DELETE',
      credentials: 'include',
    };

    fetch(`${API_URL}auth/logout`, options)
      .then(() => {
        dispatch(logOut());
        navigate('/');
      })
      .catch(error => {
        console.log(error)
      })
  }, [dispatch, navigate]);

  return null;
}

export default Logout;