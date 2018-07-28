// Action types

export const TOGGLE_BOTTOM_DRAWER = 'TOGGLE_BOTTOM_DRAWER'

// Action creators

export const toggleBottomDrawer = () => {
  return dispatch => dispatch({
    type: TOGGLE_BOTTOM_DRAWER
  })
}
