import {
  TOGGLE_BOTTOM_DRAWER,
  OPEN_BOTTOM_DRAWER,
  CLOSE_BOTTOM_DRAWER,
  OPEN_TOP_DRAWER,
  CLOSE_TOP_DRAWER,
  FOCUS_ON_CARD,
  UNFOCUS_CARDS
} from '../actions/animation-actions'

const initialState = {
  bottomDrawer: false,
  topDrawer: false,
  focusedCard: null,
}

export default (state=initialState, action) => {
  switch(action.type){
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
    case OPEN_TOP_DRAWER: {
      return {
        ...state,
        topDrawer: true
      }
    }
    case CLOSE_TOP_DRAWER: {
      return {
        ...state,
        topDrawer: false
      }
    }
    case FOCUS_ON_CARD: {
      return {
        ...state,
        focusedCard: action.payload
      }
    }
    case UNFOCUS_CARDS: {
      return {
        ...state,
        focusedCard: null
      }
    }
    default: return state
  }
}
