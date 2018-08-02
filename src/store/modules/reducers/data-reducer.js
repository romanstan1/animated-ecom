
import {
  ADD_TO_BASKET
} from '../actions/data-actions'

const initialState = {
  basket: []
}

export default (state=initialState, action) => {
  switch(action.type){
    case ADD_TO_BASKET: {
      return {
        ...state,
        basket: [...state.basket, action.payload]
      }
    }
    default: return state
  }
}
