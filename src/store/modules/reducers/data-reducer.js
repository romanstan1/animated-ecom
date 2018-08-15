
import {
  ADD_TO_BASKET,
  DELETE_BASKET_ITEM
} from '../actions/data-actions'

const productData = [
  {
    sku: 25389906,
    brand: 'Specsavers',
    title: 'Conan',
    description: 'This on-trend rectangular frame has been enjoying a strong revival and these Conan glasses add a fresh twist to this design. This metal frame with its bold brow line design effectively frames the eyes, drawing attention and contrasting to the slimmer bottom half. A contemporary nod to retro style, this design will upgrade your eyewear collection with the flexi hinges providing a practical touch.',
    price: 89,
    url: 'Duck/glTF/Duck.gltf',
    image: 'assets/25389906.jpg'
  },
  {
    sku: 25390032,
    brand: 'Specsavers',
    title: 'Denzil',
    description: 'Inject some vintage cool into your eyewear collection with these pilot-inspired glasses. The large curved shape is wider at the bottom than the traditional Aviator design, with an ultra-slim frame, gunmetal grey finish and durable metal construction. The double bridge, with classic top-bar, conjures up images of aerial aces of the past for the perfect dose of nostalgia. This adaptation of a popular style is quirky yet tempered by the subdued colour palette for a sleek look. These glasses expertly blend form and function, ensuring you’ll look suave both in the office and at a family picnic.',
    price: 25,
    url: 'Duck/glTF/Duck.gltf',
    image: 'assets/25390032.jpg'
  },
  {
    sku: 25390025,
    brand: 'Specsavers',
    title: 'Aubrey',
    description: 'Channel your inner pilot with these statement glasses in a classic shape. The popular Aviator-inspired style features slender eye wires in a gold metal finish. With a double bridge and retro-inspired top bar, these frames are a stylish 21st century reimagining of a traditional design. Tortoiseshell temple tips gel perfectly with the slim metal sides, enhancing comfort while adding to the overall vintage aesthetic. The wider than average frames create a masculine air, whilst still retaining a sense of adventure – perfect for any occasion, from after-work drinks to Sunday lunch.',
    price: 25,
    url: 'Duck/glTF/Duck.gltf',
    image: 'assets/25390025.jpg'
  },
  {
    sku: 25390186,
    brand: 'Specsavers',
    title: 'Abraham',
    description: 'Work a California cool look with these glasses – a style that easily crosses from the city to the beach. The front of the on-trend rectangular frame is made from semi-translucent acetate plastic, allowing the streamlined silver-coloured hinges to form part of the design detailing. The broad sides are made from two contrasting materials: the outer section has a wood effect matt finish while the inlay reflects the transparent sheen of the front of the frames. Flexi hinges make the frame robust and comfortable for all-day wear.',
    price: 89,
    url: 'Duck/glTF/Duck.gltf',
    image: 'assets/25390186.jpg'
  },
  {
    sku: 25241235,
    brand: 'Specsavers',
    title: 'Hester',
    description: "Dazzle with charm in these feminine frames. The brown tortoiseshell finish keeps the look neutral and timeless, while the soft curves of the oval rims keep you looking sophisticated when you're discussing timelines with your team. The frames are made from plastic, making them suitable for everyday use, while the wide hinges create a bold statement. A gold bar with silver crystals on the sides add a touch of flair to these frames, with temples that taper softly towards the tips to keep the style in check.",
    price: 89,
    url: 'Duck/glTF/Duck.gltf',
    image: 'assets/25241235.jpg'
  },
  {
    sku: 25381641,
    brand: 'Specsavers',
    title: 'Byron',
    description: "Bag some all-American style with these preppy Byron frames. In a distinctive nautical navy blue hue, these chunky glasses are sure to make your look pop. The deep rectangular plastic frames are finished off with a white candy stripe bordering the rims both inside and out for added freshness and a sharp appearance. Two white lines run in tandem over the hinges to add further interest, while sturdy acetate sides taper behind the ears for comfort. Team with a simple pastel polo shirt for the signature Americana aesthetic.",
    price: 69,
    url: 'Duck/glTF/Duck.gltf',
    image: 'assets/25381641.jpg'
  },
  {
    sku: 25390148,
    brand: 'Specsavers',
    title: 'Emile',
    description: "Simple black glasses with a futuristic edge – the sharp, square frame in shiny acetate plastic is offset by an electric blue interior, and silver metal detail on the sides.",
    price: 89,
    url: 'Duck/glTF/Duck.gltf',
    image: 'assets/25390148.jpg'
  },
  {
    sku: 25390070,
    brand: 'Specsavers',
    title: 'Digby',
    description: "Make an impression with these futuristic frames. These elegant men’s Digby glasses make use of razor-sharp lines and a rectangular shape, for a look that’s bound to stand out in the boardroom or the bar. The gunmetal grey tone projects an image of polished professionalism, and are versatile enough to be easily matched to both business and casual wear. The durable metal construction balances performance and aesthetics. The thin eyewire design contrasts with the bold sides and dipped bridge, for a style that’s refined and modern.",
    price: 45,
    url: 'Duck/glTF/Duck.gltf',
    image: 'assets/25390070.jpg'
  },
  {
    sku: 25381658,
    brand: 'Specsavers',
    title: 'Bronwen',
    description: "Fed up of office greys and sombre suits? Bring a burst of colour to the boardroom and show them who's boss with these distinctive burgundy Bronwen glasses. The rounded upper rim of the metal frames defines the arch of the brow line perfectly, and blends effortlessly with the slimline lower section. The coloured front is emphasised by the contrasting black plastic sides, which are thick to ensure durability and comfort, whether you're crunching numbers at your desk or cycling home in the evening. For added professionalism, the frames have an elegant satin finish.",
    price: 69,
    url: 'Duck/glTF/Duck.gltf',
    image: 'assets/25381658.jpg'
  }
]


const initialState = {
  basket: [],
  // products: productData
  products: [
    {
      sku: 1234,
      brand: 'Duck',
      title: 'Mallard',
      description: 'Duck description here',
      price: 69,
      url: 'Duck/glTF/Duck.gltf',
      image: 'Duck/duck.jpg'
    },
    {
      sku: 2345,
      brand: 'Helmet',
      title: 'Razor',
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
