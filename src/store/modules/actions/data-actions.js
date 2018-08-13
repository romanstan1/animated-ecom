import uuidv1 from 'uuid/v1'

export const ADD_TO_BASKET = "ADD_TO_BASKET"
export const DELETE_BASKET_ITEM = "DELETE_BASKET_ITEM"

// Action creators

export const addToBasket = (item) => {
  return dispatch => dispatch({
    type: ADD_TO_BASKET,
    payload: { ...item, uuid: uuidv1() }
  })
}

export const deleteBasketItem = (item) => {
  return dispatch => dispatch({
    type: DELETE_BASKET_ITEM,
    payload: item
  })
}
