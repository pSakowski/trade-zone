
import axios from 'axios';
import { API_URL } from '../config';

/* SELECTORS */
export const getAds = state => state.ads;
export const getAdById = (state, id) => state.ads.find(ad => ad._id === id);

/* ACTIONS */
const createActionName = name => `app/ads/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

export const ADD_AD = createActionName('ADD_AD');
export const LOAD_ADS_SUCCESS = createActionName('LOAD_ADS_SUCCESS');
export const LOAD_ADS_FAILURE = createActionName('LOAD_ADS_FAILURE');
export const EDIT_AD = createActionName('EDIT_AD');

/* ACTION CREATORS */
export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });

export const addAd = payload => ({ payload, type: ADD_AD });
export const loadAdsSuccess = payload => ({ payload, type: LOAD_ADS_SUCCESS });
export const loadAdsFailure = payload => ({ payload, type: LOAD_ADS_FAILURE });
export const editAd = payload => ({ payload, type: EDIT_AD });

export const fetchAds = () => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}/api/ads`);
      dispatch(loadAdsSuccess(res.data));
      dispatch(endRequest());
    } catch (error) {
      dispatch(loadAdsFailure(error.message));
    }
  };
};

/* REDUCER */
const adsReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_ADS_SUCCESS:
      // Store ads in localStorage
      if (Array.isArray(action.payload)) {
        localStorage.setItem('ads', JSON.stringify(action.payload));
        return action.payload;
      } else if (typeof action.payload === 'object') {
        const newState = [...state, action.payload];
        localStorage.setItem('ads', JSON.stringify(newState));
        return newState;
      }
      return state;
    case LOAD_ADS_FAILURE:
      console.log(action.payload);
      return state;
    default:
      // Retrieve ads from localStorage
      const storedAds = localStorage.getItem('ads');
      return storedAds ? JSON.parse(storedAds) : state;
  }
};

export default adsReducer;
