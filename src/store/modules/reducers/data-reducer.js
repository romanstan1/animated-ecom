
import {
  ADD_TO_BASKET,
  DELETE_BASKET_ITEM
} from '../actions/data-actions'

const initialState = {
  basket: [],
  products: [
    {
      sku: 1234,
      title: 'Duck',
      description: 'Duck description here',
      price: 69,
      url: 'Duck/glTF/Duck.gltf',
      image: 'Duck/duck.jpg'
    },
    {
      sku: 2345,
      title: 'Helmet',
      description: 'Helmet description here',
      price: 59,
      url: 'DamagedHelmet/glTF/DamagedHelmet.gltf',
      image: 'DamagedHelmet/helmet.jpg'
    }
  ]
}

export default (state=initialState, action) => {
  switch(action.type){
    case ADD_TO_BASKET: {
      return {
        ...state,
        basket: [...state.basket, action.payload]
      }
    }
    case DELETE_BASKET_ITEM: {
      return {
        ...state,
        basket: state.basket.filter(items => items.uuid !== action.payload.uuid)
      }
    }
    default: return state
  }
}
