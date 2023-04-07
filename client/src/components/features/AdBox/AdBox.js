import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import styles from './AdBox.module.scss';
import { getUser } from '../../../redux/usersRedux';
import { IMGS_URL } from '../../../URL';


const AdBox = ({ title, location, price, photo, _id, seller }) => {
  const loggedInUser = useSelector(getUser);
  const isLoggedIn = !!loggedInUser;

  return (
    <div className={styles.adBox}>
      <img src={IMGS_URL + photo} alt={title} className={styles.adBox__img} />
      <div className={styles.adBox__info}>
        <h2>{title}</h2>
        <p>{location}</p>
        <p><b>{price} zł</b></p>
        <div className={styles.adBox__buttons}>
          <Link to={`/ad/${_id}`}>
            <Button className="me-2" color="primary">
              Read more
            </Button>
          </Link>
          {isLoggedIn && loggedInUser.login === seller.login && (
            <>
              <Link to={`/ad/edit/${_id}`}>
                <Button className="me-2" color="warning">
                  Edit
                </Button>
              </Link>
              <Link to={`/ad/remove/${_id}`}>
                <Button className="me-2" color="danger">
                  Remove
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdBox;