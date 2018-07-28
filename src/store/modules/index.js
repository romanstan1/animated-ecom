import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {data, animation} from './reducers'

export default combineReducers({
  routing: routerReducer,
  data,
  animation
})
