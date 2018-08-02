
export const ADD_TO_BASKET = "ADD_TO_BASKET"

// Action creators

export const addToBasket = (item) => {
  return dispatch => dispatch({
    type: ADD_TO_BASKET,
    payload: item
  })
}
