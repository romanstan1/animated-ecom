
import {
  ADD_TO_BASKET,
  DELETE_BASKET_ITEM
} from '../actions/data-actions'

const productData = [
  {
    sku: 25390001,
    brand: "Spectacle's Direct",
    title: 'Fraser',
    description: 'Get down to business with these no-fuss Fraser frames, perfect for those who prefer a minimalist look.',
    price: 25,
    url: '25390001/SKU25390001.gltf',
    image: 'assets/25390001.jpg'
  },
  {
    sku: 25262087,
    brand: "Spectacle's Direct",
    title: 'Conan',
    description: 'This on-trend rectangular frame has been enjoying a strong revival.',
    price: 89,
    url: '25262087/SKU25262087.gltf',
    image: 'assets/25262087.jpg'
  },
  {
    sku: 25390032,
    brand: "Spectacle's Direct",
    title: 'Denzil',
    description: 'Inject some vintage cool into your eyewear collection with these pilot-inspired glasses.',
    price: 25,
    url: '25390001/SKU25390001.gltf',
    image: 'assets/25390032.jpg'
  },
  {
    sku: 25390025,
    brand: "Spectacle's Direct",
    title: 'Aubrey',
    description: 'Channel your inner pilot with these statement glasses in a classic shape.',
    price: 25,
    url: '25390001/SKU25390001.gltf',
    image: 'assets/25390025.jpg'
  },
  {
    sku: 25390186,
    brand: "Spectacle's Direct",
    title: 'Abraham',
    description: 'Work a California cool look with these glasses – a style that easily crosses from the city to the beach.',
    price: 89,
    url: '25390001/SKU25390001.gltf',
    image: 'assets/25390186.jpg'
  },
  {
    sku: 25241235,
    brand: "Spectacle's Direct",
    title: 'Hester',
    description: "Dazzle with charm in these feminine frames.",
    price: 89,
    url: '25390001/SKU25390001.gltf',
    image: 'assets/25241235.jpg'
  },
  {
    sku: 25381641,
    brand: "Spectacle's Direct",
    title: 'Byron',
    description: "Bag some all-American style with these preppy Byron frames.",
    price: 69,
    url: '25390001/SKU25390001.gltf',
    image: 'assets/25381641.jpg'
  },
  {
    sku: 25390148,
    brand: "Spectacle's Direct",
    title: 'Emile',
    description: "Simple black glasses with a futuristic edge.",
    price: 89,
    url: '25390001/SKU25390001.gltf',
    image: 'assets/25390148.jpg'
  },
  {
    sku: 25390070,
    brand: "Spectacle's Direct",
    title: 'Digby',
    description: "Make an impression with these futuristic frames.",
    price: 45,
    url: '25390001/SKU25390001.gltf',
    image: 'assets/25390070.jpg'
  },
  {
    sku: 25381658,
    brand: "Spectacle's Direct",
    title: 'Bronwen',
    description: "Bring a burst of colour to the boardroom and show them who's boss with these distinctive burgundy Bronwen glasses.",
    price: 69,
    url: '25390001/SKU25390001.gltf',
    image: 'assets/25381658.jpg'
  }
]


const initialState = {
  basket: [],
  products: productData
  // products: [
  //   {
  //     sku: 1234,
  //     brand: 'Duck',
  //     title: 'Mallard',
  //     description: 'Duck description here',
  //     price: 69,
  //     url: 'Duck/glTF/Duck.gltf',
  //     image: 'Duck/duck.jpg'
  //   },
  //   {
  //     sku: 2345,
  //     brand: 'Helmet',
  //     title: 'Razor',
  //     description: 'Helmet description here',
  //     price: 59,
  //     url: 'DamagedHelmet/glTF/DamagedHelmet.gltf',
  //     image: 'DamagedHelmet/helmet.jpg'
  //   }
  // ]
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
