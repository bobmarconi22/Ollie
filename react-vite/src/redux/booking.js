import { thunkAuthenticate } from "./session";

export const newRequestThunk = (formData) => async (dispatch) => {
  const res = await fetch('/api/booking/request/create', {
    method: "POST",
    body: formData,
  });

  if (res.ok) {
    const message = await res.json();
    dispatch(thunkAuthenticate());
    return message;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const acceptBookingThunk = (formData, requestId) => async (dispatch) => {
  const res = await fetch('/api/booking/create', {
    method: "POST",
    body: formData,
  });

  if (res.ok) {
    const message = await res.json();
    dispatch(thunkAuthenticate());
    console.log('=========>',requestId)
    dispatch(deleteRequestThunk(requestId))
    return message;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const editAddressThunk = (formData, addressId) => async(dispatch) => {
  const res = await fetch(`/api/address/${addressId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

  if (res.ok) {
      const address = await res.json();
      dispatch(thunkAuthenticate());
      return address;
  }else{
      const errors = await res.json()
      return errors;
  }
}

export const deleteRequestThunk = (requestId) => async(dispatch) =>{
    const res = await fetch(`/api/booking/request/${requestId}/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        const message = await res.json();
        dispatch(thunkAuthenticate());
        return message
      } else {
        const errors = await res.json()
        return errors
      }
    }


const initialState = {}

function bookingReducer(state = initialState, action){
    switch (action.type) {
        default:
            return state
    }
}

export default bookingReducer
