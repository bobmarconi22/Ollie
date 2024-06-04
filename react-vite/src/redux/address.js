import { thunkAuthenticate } from "./session";

export const newAddressThunk = (formData) => async (dispatch) => {
  const res = await fetch('/api/address/create', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
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

export const deleteAddressThunk = (addressId) => async(dispatch) =>{
    const res = await fetch(`/api/address/${addressId}/delete`, {
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

function addressReducer(state = initialState, action){
    switch (action.type) {
        default:
            return state
    }
}

export default addressReducer
