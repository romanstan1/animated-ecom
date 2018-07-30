// Action types

export const TOGGLE_BOTTOM_DRAWER = 'TOGGLE_BOTTOM_DRAWER'
export const OPEN_BOTTOM_DRAWER = 'OPEN_BOTTOM_DRAWER'
export const CLOSE_BOTTOM_DRAWER = 'CLOSE_BOTTOM_DRAWER'

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
