const GET_SITTERS = "GET_SITTERS";
const SEARCH_SITTERS = "SEARCH_SITTERS";
const GET_SITTER_BY_ID = "GET_SITTER_BY_ID";

const getSitters = (sitters) => ({
  type: GET_SITTERS,
  payload: sitters,
});

const searchSitters = (sitters) => ({
  type: SEARCH_SITTERS,
  payload: sitters,
});

const getSitterById = (sitter) => ({
  type: GET_SITTER_BY_ID,
  payload: sitter,
});

export const searchThunk = (search, rating) => async (dispatch) => {
    const query = new URLSearchParams();
    if (search) query.set('filter', search);
    if (rating > 0) query.set('rating', rating);

    const res = await fetch(`/api/sitter/?${query.toString()}`);
    if (res.ok) {
      const data = await res.json();
      dispatch(searchSitters(data.sitters || []));
      return data.sitters;
    }

    throw new Error("Search Failed");
  };

export const getSittersThunk = () => async (dispatch) => {
  const res = await fetch("/api/sitter/all");
  if (res.ok) {
    const sitters = await res.json();
    dispatch(getSitters(sitters));
    return sitters;
  } else {
    const errors = await res.json();
    return errors;
  };
};

export const getSitterByIdThunk = (sitterId) => async (dispatch) => {
  const res = await fetch(`/api/sitter/${sitterId}`);
  if (res.ok) {
    const sitter = await res.json();
    dispatch(getSitterById(sitter));
    return sitter;
  } else {
    const errors = await res.json();
    return errors;
  };
};

const initialState = { all: null, selected: null };

function sitterReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SITTERS:
      return { ...state, all: action.payload };
    case SEARCH_SITTERS:
      return { ...state, search: action.payload };
    case GET_SITTER_BY_ID:
      return { ...state, selected: action.payload };
    default:
      return state;
  };
};

export default sitterReducer;
