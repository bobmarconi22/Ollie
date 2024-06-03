import { thunkAuthenticate } from "./session";

const GET_PETS = 'GET_PETS'
const NEW_PET = 'NEW_PET'
const GET_PET_BY_ID = 'GET_PET_BY_ID'

const getPets = (pets) => ({
    type: GET_PETS,
    payload: pets
})

const newPet = (pet) => ({
    type: NEW_PET,
    payload: pet
})

const getPetById = (pet) => ({
    type: GET_PET_BY_ID,
    payload: pet
})

export const getPetsThunk = () => async(dispatch) => {
    const res = await fetch('/api/pet/all')
    if (res.ok) {
        const pets = await res.json();
        dispatch(getPets(pets));
        return pets;
    }else{
        const errors = await res.json()
        return errors;
    }
}

export const getPetByIdThunk = (petId) => async(dispatch) => {
    const res = await fetch(`/api/pet/${petId}`)
    if (res.ok) {
        const pet = await res.json();
        dispatch(getPetById(pet));
        return pet;
    }else{
        const errors = await res.json()
        return errors;
    }
}


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

export const editPetThunk = (formData, petId) => async(dispatch) => {
    const res = await fetch(`/api/pet/${petId}/update`, {
        method: "POST",
        body: formData
      });

    if (res.ok) {
        const pet = await res.json();
        dispatch(thunkAuthenticate());
        return pet;
    }else{
        const errors = await res.json()
        return errors;
    }
}

export const deletePetThunk = (petId) => async(dispatch) =>{
    const res = await fetch(`/api/pet/${petId}/delete`, {
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

const initialState = { all: {}}

function petReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PETS:
            return { ...state, all: action.payload };
        case NEW_PET:
            return { ...state, [action.payload.id]: action.payload };
        case GET_PET_BY_ID:
            return { ...state, selected: action.payload};
        default:
            return state;
    }
}

export default petReducer
