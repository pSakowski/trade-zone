import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAds, getAds } from '../../../redux/adsRedux';
import AdBox from '../../features/AdBox/AdBox';

const Home = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const ads = useSelector(getAds);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  const filteredAds = ads.filter(ad =>
    ad.title.toLowerCase().includes(searchPhrase.toLowerCase())
  );

  return (
    <div className='row'>
      <div className='col-12 d-flex justify-content-center my-3'>
        <div className='input-group search-box' style={{ maxWidth: '360px' }}>
          <input type='text' className='form-control' placeholder='Search ads..' value={searchPhrase} onChange={e => setSearchPhrase(e.target.value)} />
        </div>
      </div>
      {Array.isArray(filteredAds) &&
        filteredAds.map(ad => (
          <div key={ad._id} className='col-12 col-md-6 col-lg-4'>
            <AdBox {...ad} />
          </div>
        ))}
    </div>
  );
};

export default Home;
