const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

export const thunkAuthenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/");
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const thunkLogin = (credentials) => async dispatch => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};
export const thunkSignup = (formData) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: formData
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again", response: response }
  }
};

export const thunkLogout = () => async (dispatch) => {
  await fetch("/api/auth/logout");
  dispatch(removeUser());
};

export const editUserThunk = (formData, userId) => async(dispatch) => {
  const res = await fetch(`/api/auth/${userId}`, {
      method: "POST",
      body: formData
    });

  if (res.ok) {
      const user = await res.json();
      dispatch(thunkAuthenticate());
      return user;
  }else{
      const errors = await res.json()
      return errors;
  }
}

export const deleteUserThunk = (userId) => async(dispatch) =>{
  const res = await fetch(`/api/auth/delete/${userId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      const message = await res.json();
      dispatch(removeUser());
      return message
    } else {
      const errors = await res.json()
      return errors
    }
  }

const initialState = { user: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}

export default sessionReducer;
