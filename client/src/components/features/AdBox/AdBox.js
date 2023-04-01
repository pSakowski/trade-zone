import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import styles from './AdBox.module.scss'
import { getUser } from '../../../redux/usersRedux';

const AdBox = ({ title, img, location, price, _id, seller }) => {
  const isLoggedIn = useSelector(getUser);

  return (
    <div className={styles['ad-box']}>
      <img src={img} alt={title} className={styles['ad-box__img']} />

      <div className={styles['ad-box__info']}>
        <h2>{title}</h2>
        <p>{location}</p>
        <p>{price} zł</p>

        <div className="buttons">
          <Link to={`/ad/${_id}`}>
            <Button className="me-2" color="primary">
              Read more
            </Button>
          </Link>
          {isLoggedIn && (
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
