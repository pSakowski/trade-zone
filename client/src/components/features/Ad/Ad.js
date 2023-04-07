import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAdById } from '../../../redux/adsRedux';
import styles from './Ad.module.scss';
import { IMGS_URL } from '../../../config';

const Ad = () => {
  const { id } = useParams();
  const ad = useSelector(state => getAdById(state, id));

  return (
    <div className={styles.adContainer}>
      <div className={styles.adDetails}>
        <img className={styles.adPhoto} src={IMGS_URL + ad.photo} alt={ad.title} />
        <div className={styles.adInfo}>
          <h2 className={styles.adTitle}>{ad.title}</h2>
          <p className={styles.adContent}>{ad.content}</p>
          <p className={styles.adPrice}><span className={styles.price}>{ad.price} zł</span></p>
          <p className={styles.adDate}><i className="fa fa-calendar"></i> {ad.location}, {ad.date}</p>
        </div>
      </div>
      <div className={styles.sellerDetails}>
        <img className={styles.sellerAvatar} src={IMGS_URL + ad.seller.avatar} alt={ad.seller.avatar} />
        <div className={styles.sellerInfo}>
          <p className={styles.sellerLogin}><i className="fa fa-user"></i> {ad.seller.login}</p>
          <p className={styles.sellerPhone}><i className="fa fa-phone"></i> {ad.seller.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default Ad;
