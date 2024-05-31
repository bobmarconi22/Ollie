const NEW_PET = 'NEW_PET'


const newPet = (pet) => ({
    type: NEW_PET,
    payload: pet
})

export const newPetThunk = (formData) => async(dispatch) => {
    const res = await fetch("/api/pet/create", {
        method: "POST",
        body: formData
      });

    if (res.ok) {
        const pet = await res.json();
        dispatch(newPet(pet));
        return pet;
    }else{
        const errors = await res.json()
        return errors;
    }
}

const initialState = {}

function petReducer(state = initialState, action) {
    switch (action.type) {
        case NEW_PET:
            const newState = { ...state, [action.payload.id]: action.payload };
            return newState;
        default:
            return state;
    }
}

export default petReducer
