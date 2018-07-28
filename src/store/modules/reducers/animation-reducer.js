import {TOGGLE_BOTTOM_DRAWER} from '../actions/animation-actions'

const initialState = {
  bottomDrawer: false
}

export default (state=initialState, action) => {
  switch(action.type){
    case TOGGLE_BOTTOM_DRAWER: {
      return {
        ...state,
        bottomDrawer: !state.bottomDrawer
      }
    }
    default: return state
  }
}
