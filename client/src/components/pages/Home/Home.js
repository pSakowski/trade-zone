import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAds, getAds } from '../../../redux/adsRedux';
import AdBox from '../../features/AdBox/AdBox';

const Home = () => {
  const ads = useSelector(getAds);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  return (
    <div className='row my-4'>
      {Array.isArray(ads) && ads.map(ad => (
        <div key={ad._id} className='col-12 col-md-6 col-lg-4'>
          <AdBox {...ad} />
        </div>
      ))}
    </div>
  );
};

export default Home;