/* SELECTORS */
export const getUser = state => state.user;

/* ACTIONS */
const createActionName = actionName => `app/users/${actionName}`;
const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');

/* ACTION CREATORS */
export const logIn = payload => ({
  type: LOG_IN,
  payload
})

export const logOut = () => ({
  type: LOG_OUT
});

const usersReducer = (statePart = null, action) => {
  switch (action.type) {
    case LOG_IN:
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(action.payload));
      return action.payload
    case LOG_OUT:
      localStorage.removeItem('user');
      return null;
    default:
      // Retrieve user from localStorage
      const savedState = localStorage.getItem('user');
      return savedState ? JSON.parse(savedState) : statePart;
  }
};

export default usersReducer;
