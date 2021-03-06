export const GOOGLE_MAP_API_KEY = 'Your_Google_Map_API_Key';

export const pizzaSizes = [
  {
    name: 12,
    price: 0
  },
  {
    name: 14,
    price: 2.5
  },
  {
    name: 16,
    price: 4.25
  },
  {
    name: 18,
    price: 5.75
  },
]

export const pizzaTypes = [
  {
    name: 'Ultimate Peperoni',
    image: require('./assets/ultimate_peperoni.jpg'),
    basePrice: 6.0
  },
  {
    name: 'Grandma\'s chicken',
    image: require('./assets/grandma_chiken.jpg'),
    basePrice: 6.0
  },
  {
    name: 'Hawaiian Volcano',
    image: require('./assets/hawaii.jpg'),
    basePrice: 7.0
  },
  {
    name: 'Pacific Veggie',
    image: require('./assets/pacific_vegie.jpg'),
    basePrice: 6.0
  },
  {
    name: 'Casino Royal',
    image: require('./assets/sasino_royal.jpg'),
    basePrice: 8.0
  },
  {
    name: 'Seven Cheeses',
    image: require('./assets/seven_types_of_cheese.jpg'),
    basePrice: 6.5
  },
  {
    name: 'Three Pigs Beacon',
    image: require('./assets/three_pigs_beacon.jpg'),
    basePrice: 7.0
  }
]

export const drivers = [
  {
    name: 'Dinesh',
    avatar: require('./assets/dinesh.jpeg'),
    voice: {
      onMayWay: require('./assets/dinesh-onmyway.mp3'),
      delivered: require('./assets/dinesh-delivered.mp3')
    }
  },
  {
    name: 'Gilfoyle',
    avatar: require('./assets/gilfoyle.jpg'),
    voice: {
      onMayWay: require('./assets/gilfoyle-onmyway.mp3'),
      delivered: require('./assets/gilfoyle-delivered.mp3')
    }
  }
]
