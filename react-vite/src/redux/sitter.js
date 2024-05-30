const GET_SITTERS = 'GET_SITTERS'


const getSitters = (sitters) => ({
    type: GET_SITTERS,
    payload: sitters
})

export const getSittersThunk = () => async(dispatch) => {
    const res = await fetch('/api/sitter/all')
    if (res.ok) {
        const sitters = await res.json();
        dispatch(getSitters(sitters));
        return sitters;
    }else{
        const errors = await res.json()
        return errors;
    }
}

const initialState = { all: null, selected: null }

function sitterReducer(state = initialState, action){
    switch (action.type) {
        case GET_SITTERS:
            return { ...state, all: action.payload }
        default:
            return state
    }
}

export default sitterReducer
