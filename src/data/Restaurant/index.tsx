export const restaurantData = [
  {
    id: 1,
    photoSrc: "../assets/images/restaurant/1.jpg",
    name: "Food Way",
    location: "Sydney, Australia",
    type: "chinese",
    phone: "+304-921-8122",
    email: "KevinAMillett@jourrapide.com",
  },
  {
    id: 2,
    photoSrc: "../assets/images/restaurant/2.jpg",
    name: "Table Talk",
    location: "Auckland, New Zealand",
    type: "chinese",
    phone: "+304-921-8122",
    email: "KevinAMillett@jourrapide.com",
  },
  {
    id: 3,
    photoSrc: "../assets/images/restaurant/3.jpg",
    name: "Blue Valley",
    location: "Brunswick Heads, Australia",
    type: "chinese",
    phone: "+304-921-8122",
    email: "KevinAMillett@jourrapide.com",
  },
  {
    id: 4,
    photoSrc: "../assets/images/restaurant/4.jpg",
    name: "Desi Eatey",
    location: "Rio de Janeiro, Brazil",
    type: "indian",
    phone: "+304-921-8122",
    email: "KevinAMillett@jourrapide.com",
  },
  {
    id: 5,
    photoSrc: "../assets/images/restaurant/5.jpg",
    name: "Eat Bite",
    location: "Bogotá, Colombia",
    type: "indian",
    phone: "+304-921-8122",
    email: "KevinAMillett@jourrapide.com",
  },
  {
    id: 6,
    photoSrc: "../assets/images/restaurant/6.jpg",
    name: "Chez Bruce",
    location: "Santiago, Chile",
    type: "indian",
    phone: "+304-921-8122",
    email: "KevinAMillett@jourrapide.com",
  },
  {
    id: 7,
    photoSrc: "../assets/images/restaurant/7.jpg",
    name: "Seven Park Place",
    location: "Rio de Janeiro, Brazil",
    type: "indian",
    phone: "+304-921-8122",
    email: "KevinAMillett@jourrapide.com",
  },
  {
    id: 8,
    photoSrc: "../assets/images/restaurant/8.jpg",
    name: "The Waterside",
    location: "Montevideo, Uruguay",
    type: "indian",
    phone: "+304-921-8122",
    email: "KevinAMillett@jourrapide.com",
  },
  {
    id: 9,
    photoSrc: "../assets/images/restaurant/9.jpg",
    name: "Peppers",
    location: "Tabasco, Mexico",
    type: "Italian",
    phone: "+304-921-8122",
    email: "KevinAMillett@jourrapide.com",
  },
  {
    id: 10,
    photoSrc: "../assets/images/restaurant/10.jpg",
    name: "Benu",
    location: "Soufrière, Saint Lucia",
    type: "Italian",
    phone: "+304-921-8122",
    email: "KevinAMillett@jourrapide.com",
  },
  {
    id: 11,
    photoSrc: "../assets/images/restaurant/11.jpg",
    name: "Wild Thyme",
    location: "Illinois, United States",
    type: "Italian",
    phone: "+304-921-8122",
    email: "KevinAMillett@jourrapide.com",
  },
];


export const orderLinks = [
  {
    label: "bestseller",
    href: "#bestseller",
  },
  {
    label: "quick bites",
    href: "#bites",
    sublinks: [
      {
        label: "potato chips",
        href: "#chips",
      },
      {
        label: "salad",
        href: "#salad",
      },
      {
        label: "fries",
        href: "#fries",
      },
      {
        label: "cheese sticks",
        href: "#sticks",
      },
      {
        label: "garlic bread",
        href: "#bread",
      },
    ],
  },
  {
    label: "sandwich",
    href: "#sandwich",
  },
  {
    label: "pizza",
    href: "#pizza",
  },
  {
    label: "combo",
    href: "#combo",
  },
  {
    label: "deserts",
    href: "#deserts",
    sublinks: [
      {
        label: "cheesecakes",
        href: "#cheesecakes",
      },
      {
        label: "lime pie",
        href: "#lime",
      },
      {
        label: "cream dream",
        href: "#cream",
      },
      {
        label: "rice pudding",
        href: "#pudding",
      },
    ],
  },
];

export const QuickBitesItems = {
  potatoItems: [
    {
      name: "Veg Cheese Quesadillas",
      label: "veg",
      description: "Mexican quesadillas overloaded with exotic vegetables, layered with house special salsa sauce and lots of cheese.",
      price: 10.0,
      customized: false,
    },
    {
      name: "Barbarossa Pasta",
      label: "non-veg",
      description: "Spinach ravioli with combination sauce, broccoli, zucchini.",
      price: 10.0,
      customized: false,
    },
  ],
  saladItems: [
    {
      name: "Veg Cheese Quesadillas",
      label: "non-veg",
      description: "Mexican quesadillas overloaded with exotic vegetables, layered with house special salsa sauce and lots of cheese.",
      price: 10.0,
      customized: false,
    },
    {
      name: "Barbaresca Pasta",
      label: "non-veg",
      description: "Spinach ravioli with combination sauce, broccoli, zucchini.",
      price: 10.0,
      customized: false,
    },
  ],
  fries: [
    {
      name: "Veg Cheese Quesadillas",
      label: "veg",
      description: "Mexican quesadillas overloaded with exotic vegetables, layered with house special salsa sauce and lots of cheese.",
      price: 10.0,
      customized: false,
    },
    {
      name: "Barbaresca Pasta",
      label: "non-veg",
      description: "Spinach ravioli with combination sauce, broccoli, zucchini.",
      price: 10.0,
      customized: false,
    },
  ],
  cheeseSticks: [
    {
      name: "Veg Cheese Quesadillas",
      label: "veg",
      description: "Mexican quesadillas overloaded with exotic vegetables, layered with house special salsa sauce and lots of cheese.",
      price: 10.0,
      customized: false,
    },
  ],
  garlicBread: [
    {
      name: "Barbaresca Pasta",
      label: "non-veg",
      description: "Spinach ravioli with combination sauce, broccoli, zucchini.",
      price: 10.0,
      customized: false,
    },
  ],
};

export const desertItems = {
  cheesecake: [
    {
      name: "Vanilla cheesecake",
      label: "veg",
      description: "Spinach ravioli with combination sauce, broccoli, zucchini.",
      price: 400.0,
      customized: false,
    },
    {
      name: "pineapple cheesecake",
      label: "veg",
      description: "Spinach ravioli with combination sauce, broccoli, zucchini.",
      price: 500.0,
      customized: false,
    },
  ],
  limePie: [
    {
      name: "chocolate limePie",
      label: "veg",
      description: "Spinach ravioli with combination sauce, broccoli, zucchini.",
      price: 400.0,
      customized: false,
    },
  ],
  creamDream: [
    {
      name: "Vanilla cream cake",
      label: "veg",
      description: "milky and soft cake",
      price: 100.0,
      customized: false,
    },
    {
      name: "blue-berry cream cake",
      label: "veg",
      description: "Spinach ravioli with combination sauce, broccoli, zucchini.",
      price: 100.0,
      customized: false,
    },
  ],
  ricePudding: [
    {
      name: "Veg Cheese Quesadillas",
      label: "veg",
      description: "milky and soft cake",
      price: 100.0,
      customized: false,
    },
    {
      name: "Barbaresca Pasta",
      label: "veg",
      description: "Spinach ravioli with combination sauce, broccoli, zucchini.",
      price: 100.0,
      customized: false,
    },
  ],
};

export const sandwichItem = [
  {
    name: "Veg chees Sandwich",
    label: "veg",
    description: "Spinach ravioli with combination sauce, broccoli, zucchini.",
    price: 100.0,
    customized: false,
  },
  {
    name: "non Veg Sandwich",
    label: "non-veg",
    description: "Spinach ravioli with combination sauce, broccoli, zucchini.",
    price: 100.0,
    customized: false,
  },
];

export const pizzaItem = [
  {
    name: "Veg chees Pizza",
    label: "veg",
    description: "Spinach ravioli with combination sauce, broccoli, zucchini.",
    price: 200.0,
    customized: false,
  },
  {
    name: "non Veg pizza",
    label: "non-veg",
    description: "Spinach ravioli with combination sauce, broccoli, zucchini.",
    price: 100.0,
    customized: false,
  },
];

export const comboItem = [
  {
    name: "Fast food combo",
    label: "veg",
    description: "Pizza with fries and sandwich",
    price: 250.0,
    customized: true,
  },
  {
    name: "Fast food combo",
    label: "non-veg",
    description: "Pizza with fries and sandwich",
    price: 500.0,
    customized: true,
  },
];

export const bannerImageData = [
  {
    id: 1,
    img: "/assets/images/restaurant/environment/1.jpg",
  },
  {
    id: 2,
    img: "/assets/images/restaurant/environment/3.jpg",
  },
  {
    id: 3,
    img: "/assets/images/restaurant/environment/4.jpg",
  },
  {
    id: 4,
    img: "/assets/images/restaurant/environment/5.jpg",
  },
  {
    id: 5,
    img: "/assets/images/restaurant/environment/6.jpg",
  },
  {
    id: 6,
    img: "/assets/images/restaurant/environment/1.jpg",
  },
];

export const   addRestaurantData =[
  {children:["Wi-Fi","Free secure parking","Drying room/outside clothesline.","Laundry facilities"]},
  {children:["The Coffee & Tea Service system","Dinner service","Children menu","Room Service"]},
]

export const menuItems = [
  {
    id: 1,
    photoSrc: "../assets/images/menu-food/1.jpg",
    itemName: "Classic comfort food",
    itemType: "Chinese",
    itemPrice: "$20",
  },
  {
    id: 2,
    photoSrc: "../assets/images/menu-food/2.jpg",
    itemName: "Local ingredients",
    itemType: "Chinese",
    itemPrice: "$30",
  },
  {
    id: 3,
    photoSrc: "../assets/images/menu-food/3.jpg",
    itemName: "Gourmet versions of classics",
    itemType: "Chinese",
    itemPrice: "$25",
  },
  {
    id: 4,
    photoSrc: "../assets/images/menu-food/4.jpg",
    itemName: "Healthy kids' menus",
    itemType: "Indian",
    itemPrice: "$50",
  },
  {
    id: 5,
    photoSrc: "../assets/images/menu-food/5.jpg",
    itemName: "Vegetable-centric dishes",
    itemType: "Indian",
    itemPrice: "$35",
  },
  {
    id: 6,
    photoSrc: "../assets/images/menu-food/6.jpg",
    itemName: "Lemon Garlic Penne",
    itemType: "Indian",
    itemPrice: "$25",
  },
  {
    id: 7,
    photoSrc: "../assets/images/menu-food/7.jpg",
    itemName: "Buttered popcorn",
    itemType: "American",
    itemPrice: "$50",
  },
  {
    id: 8,
    photoSrc: "../assets/images/menu-food/8.jpg",
    itemName: "Masala dosa",
    itemType: "Indian",
    itemPrice: "$10",
  },
  {
    id: 9,
    photoSrc: "../assets/images/menu-food/9.jpg",
    itemName: "Seafood paella",
    itemType: "Spanish",
    itemPrice: "$25",
  },
  {
    id: 10,
    photoSrc: "../assets/images/menu-food/10.jpg",
    itemName: "Som tam",
    itemType: "Thai",
    itemPrice: "$45",
  },
  {
    id: 11,
    photoSrc: "../assets/images/menu-food/11.jpg",
    itemName: "Poutine",
    itemType: "Canadian",
    itemPrice: "$25",
  },
  // Add more items here...
];
