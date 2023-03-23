/* SELECTORS */
export const getSeats = ({ seats }) => seats.data;
export const getRequests = ({ seats }) => seats.requests;

/* ACTIONS */

/* ACTION NAME CREATOR */
const reducerName = 'ads';
const createActionName = name => `app/${reducerName}/${name}`;

/* THUNKS */


/* INITIAL STATE */

const initialState = {
  data: [],
  requests: {},
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {

    default:
      return statePart;
  }
}