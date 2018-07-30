import {TOGGLE_BOTTOM_DRAWER, OPEN_BOTTOM_DRAWER, CLOSE_BOTTOM_DRAWER} from '../actions/animation-actions'

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
    case OPEN_BOTTOM_DRAWER: {
      return {
        ...state,
        bottomDrawer: true
      }
    }
    case CLOSE_BOTTOM_DRAWER: {
      return {
        ...state,
        bottomDrawer: false
      }
    }
    default: return state
  }
}
