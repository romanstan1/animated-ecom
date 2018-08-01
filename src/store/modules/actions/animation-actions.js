// Action types

export const TOGGLE_BOTTOM_DRAWER = 'TOGGLE_BOTTOM_DRAWER'
export const OPEN_BOTTOM_DRAWER = 'OPEN_BOTTOM_DRAWER'
export const CLOSE_BOTTOM_DRAWER = 'CLOSE_BOTTOM_DRAWER'

export const OPEN_TOP_DRAWER = 'OPEN_TOP_DRAWER'
export const CLOSE_TOP_DRAWER = 'CLOSE_TOP_DRAWER'

export const FOCUS_ON_CARD = "FOCUS_ON_CARD"

// Action creators

export const toggleBottomDrawer = () => {
  return dispatch => dispatch({
    type: TOGGLE_BOTTOM_DRAWER
  })
}

export const openBottomDrawer = () => {
  return dispatch => dispatch({
    type: OPEN_BOTTOM_DRAWER
  })
}

export const closeBottomDrawer = () => {
  return dispatch => dispatch({
    type: CLOSE_BOTTOM_DRAWER
  })
}

export const openTopDrawer = () => {
  return dispatch => dispatch({
    type: OPEN_TOP_DRAWER
  })
}

export const closeTopDrawer = () => {
  return dispatch => dispatch({
    type: CLOSE_TOP_DRAWER
  })
}

export const focusOnCard = (id) => {
  return dispatch => dispatch({
    type: FOCUS_ON_CARD,
    payload: id
  })
}
