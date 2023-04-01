import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAds, getAdById } from '../../../redux/adsRedux';
import styles from './Ad.module.scss';

const Ad = () => {
  
  const { id } = useParams();
  const dispatch = useDispatch();
  const ad = useSelector(state => getAdById(state, id));

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  return (
    <div className={styles.adContainer}>
      <div className={styles.adImage}>

      </div>
      <div className={styles.adInfo}>
        <div>
          <p className={styles.adDate}>Posted on {ad.date}</p>
          <h2 className={styles.adTitle}>{ad.title}</h2>
          <p className={styles.adContent}>{ad.content}</p>
        </div>
        <div>
          <p className={styles.adPrice}>{ad.price} zł</p>
          <p className={styles.adSeller}>Seller: {ad.seller}</p>
        </div>
      </div>
    </div>
  );
};

export default Ad;
