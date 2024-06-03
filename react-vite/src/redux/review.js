import { thunkAuthenticate } from "./session";

const GET_REVIEWS_BY_PET_ID = 'GET_REVIEWS_BY_PET_ID'

const getReviewsByPetId = (reviews) => ({
  type: GET_REVIEWS_BY_PET_ID,
  payload: reviews
})

export const getReviewsByPetThunk = (petId) => async(dispatch) => {
  const res = await fetch(`/api/review/pet/${petId}`)
  if (res.ok) {
      const reviews = await res.json();
      dispatch(getReviewsByPetId(reviews));
      return reviews;
  }else{
      const errors = await res.json()
      return errors;
  }
}

export const newReviewThunk = (formData) => async (dispatch) => {
  const res = await fetch('/api/review/create', {
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

export const editReviewThunk = (formData, reviewId) => async(dispatch) => {
  const res = await fetch(`/api/review/${reviewId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

  if (res.ok) {
      const review = await res.json();
      dispatch(thunkAuthenticate());
      return review;
  }else{
      const errors = await res.json()
      return errors;
  }
}

export const deleteReviewThunk = (reviewId) => async(dispatch) =>{
    const res = await fetch(`/api/review/${reviewId}/delete`, {
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

function reviewReducer(state = initialState, action){
    switch (action.type) {
        case GET_REVIEWS_BY_PET_ID: {
          return { ...state, pet_reviews: action.payload }
        }
        default:
            return state
    }
}

export default reviewReducer
