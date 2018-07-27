import {RECEIVE_POSTS, SUCCESSFUL_LOGIN, SUCCESSFUL_LOGOUT, FAILED_LOGIN} from './actions'

const initialState = {
  posts: [],
  user: null,
  loggedIn: false,
  errorMessage: null
}

export default (state=initialState, action) => {
  switch(action.type){
    case RECEIVE_POSTS: {
      return {
        ...state,
        posts: action.payload
      }
    }
    case SUCCESSFUL_LOGIN: {
      return {
        ...state,
        error: false,
        errorMessage: null,
        loggedIn: true,
        user: action.payload
      }
    }
    case SUCCESSFUL_LOGOUT: {
      return {
        ...state,
        loggedIn: false,
        user: null
      }
    }
    case FAILED_LOGIN: {
      return {
        ...state,
        error: true,
        errorMessage: 'Failed log in- Your details are incorrect',
      }
    }
    default: return state
  }
}
