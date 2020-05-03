export const products = [
    {
        id: 1, 
        name: "Smart Hub",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1497091071254-cc9b2ba7c48a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=800"
    },
    {
        id: 2, 
        name: "Motion Sensor",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1508767466362-881e33ec7458?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=800"
    },
    {
        id: 3, 
        name: "Wireless Camera",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1554672408-6cd46d466df6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=800"
    },
    {
        id: 4, 
        name: "Smoke Sensor",
        price: 19.99,
        image: "https://images.unsplash.com/photo-1533191772753-b8a11390a4fa?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=800"
    },
    {
        id: 5, 
        name: "Water Leak Sensor",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1542321888-8a6abb3ec824?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=800"
    },
];

export const promocodes = [
    {
        id: 1,
        code: "20EUROFF",
        description: "20 EUR off final cost can be used in conjunction with other codes",
        amount: 20,
        type: "amount",
        combination: true,
    },
    {
        id: 2,
        code: "5%OFF",
        description: "5% off final cost can be used in conjunction with other codes",
        amount: 5,
        type: "percentage",
        combination: true,
    },
    {
        id: 3,
        code: "20%OFF",
        description: "20% off final cost cannot be used in conjunction with other codes",
        amount: 20,
        type: "percentage",
        combination: false,
    }
];

export const orders = [
    {
        id: 1,
        paymentDetails: {
            email: "",
            nameOnCard: "",
            address: "",
            city: "",
            country: "",
            cardNumber: "",
            cardExpirationMonth: "",
            cardExpirationYear: "",
            cvv: "",
        },
        cartItems: [{
            id: "",
            name: "",
            quantity: "",
            price: ""
        }],
        costDetails: {
            subtotal: "",
            promocodeDiscounts: [],
            grandTotal: "",
        }
    }
]