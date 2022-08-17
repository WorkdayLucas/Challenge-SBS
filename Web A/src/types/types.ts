

export interface Product {
    _id: String,
    key: Number,
    name: String,
    description: String,
    price: Number,
    img: String,
}

export interface DataProducts {
    products: [Product]
}

export interface ProductInput {
    name: String
    limit: Number
    skip: Number
} 